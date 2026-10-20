# app/core/chat.py

import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_model():
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    try:
        return ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key, max_retries=0)
    except Exception as e:
        print(f"Error initializing ChatGoogleGenerativeAI: {e}")
        return None

# --------------------------
# Load embeddings + FAISS DB
# --------------------------
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

index_path = os.path.join(BASE_DIR, "faiss_index")
vector_store = FAISS.load_local(
    index_path,
    embeddings,
    allow_dangerous_deserialization=True
)

retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 2}
)

# --------------------------
# Prompt Template
from langchain_core.prompts import PromptTemplate

prompt = PromptTemplate(
    template="""
You are a friendly, supportive, and knowledgeable legal assistant for Nepal.

Follow these rules carefully:

1. If the user greets you with hi, hello, namaste, etc., respond with a warm and simple greeting.
2. Use the retrieved context to answer legal questions. If the context is empty or incomplete, answer using your own understanding of Nepali law and common practices.
3. Always keep the conversation relevant to Nepal: Nepali laws, culture, and situations.
4. Keep your tone supportive, respectful, and helpful.
5. If the user's message seems emotional, acknowledge their feelings before giving legal guidance.
6. Do not use markdown, bold text, or special formatting.
7. Do not use line breaks such as \n or \n\n. Respond in normal plain English sentences.
8. Keep answers short and clear unless the question requires detail.

Conversation Data:

Chat History: {history}
Retrieved Context: {context}
User Message: {question}

Give a clear, empathetic, and accurate answer in normal English.
""",
    input_variables=["history", "context", "question"]
)


# --------------------------
# In-memory Chat History
# You can replace this with DB later
# --------------------------
chat_sessions = {}     # {session_id: [{"role": "user/ai", "message": ""}]}


def get_history_text(session_id: str):
    """Convert history list into prompt text."""
    history = chat_sessions.get(session_id, [])
    return "\n".join([f"{h['role']}: {h['message']}" for h in history])


def ask_chatbot(session_id: str, question: str) -> str:
    """Main Chat Function With Memory"""

    # Create session if not exists
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    model = get_model()
    if model is None:
        answer = "Namaste! The Nepal Legal Assistant chatbot is running. To enable AI responses, please configure GOOGLE_API_KEY in backend_fastapi/.env."
        chat_sessions[session_id].append({"role": "user", "message": question})
        chat_sessions[session_id].append({"role": "ai", "message": answer})
        return answer

    # Retrieve context from vector DB
    try:
        docs = retriever.invoke(question)
        context = "\n\n".join([d.page_content for d in docs])
    except Exception as e:
        context = ""

    # Prepare history text
    history_text = get_history_text(session_id)

    # Build final prompt
    final_prompt = prompt.invoke({
        "history": history_text,
        "context": context,
        "question": question
    })

    # Call LLM
    try:
        answer = model.invoke(final_prompt).content
    except Exception as e:
        answer = f"Error generating response: {e}"

    # Save conversation
    chat_sessions[session_id].append({"role": "user", "message": question})
    chat_sessions[session_id].append({"role": "ai", "message": answer})

    return answer
