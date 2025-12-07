# app/core/chat.py

import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

# --------------------------
# Load LLM
# --------------------------
model = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

# --------------------------
# Load embeddings + FAISS DB
# --------------------------
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

vector_store = FAISS.load_local(
    "core/faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}
)

# --------------------------
# Prompt Template
# --------------------------
prompt = PromptTemplate(
    template="""
You are a helpful legal assistant for Nepal. Use  the retrieved context for reply users.
Greet the user for hi hello message .
Also act as helpful and supportive person .
If information is missing, reply: "Insufficient information in the context."

Chat History:
{history}

Context:
{context}

User Question:
{question}

Give a clear, accurate response.
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

    # Retrieve context from vector DB
    docs = retriever.invoke(question)
    context = "\n\n".join([d.page_content for d in docs])

    # Prepare history text
    history_text = get_history_text(session_id)

    # Build final prompt
    final_prompt = prompt.invoke({
        "history": history_text,
        "context": context,
        "question": question
    })

    # Call LLM
    answer = model.invoke(final_prompt).content

    # Save conversation
    chat_sessions[session_id].append({"role": "user", "message": question})
    chat_sessions[session_id].append({"role": "ai", "message": answer})

    return answer
