# # app/core/chat.py

# import os
# from dotenv import load_dotenv

# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_core.prompts import PromptTemplate

# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS

# load_dotenv()

# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# # Load LLM
# model = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

# # Load embeddings
# embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# # Load FAISS index
# loaded_vector_store = FAISS.load_local(
#     "core/faiss_index",
#     embeddings,
#     allow_dangerous_deserialization=True
# )

# retriever = loaded_vector_store.as_retriever(
#     search_type="similarity",
#     search_kwargs={"k": 4}
# )

# # Prompt Template
# prompt = PromptTemplate(
#     template="""
# You are a helpful AI assistant acting strictly as a legal advocate for matters related only to Nepal.
# Use ONLY the information provided in the context. Do not rely on outside knowledge.

# Your tasks:
# - Answer the question based solely on the context.
# - Identify applicable actions, charges, penalties, or fines under Nepali law ONLY if they are present in the context.
# - If the context does not contain enough information, respond briefly with: "Insufficient information in the context."

# Context:
# {context}

# Question:
# {question}

# Provide a clear, concise, and context-grounded answer.
# """,
#     input_variables=["context", "question"]
# )


# def ask_legal_ai(question: str) -> str:
#     """Handles RAG search + LLM response"""
    
#     retrieved_docs = retriever.invoke(question)
#     context_text = "\n\n".join(doc.page_content for doc in retrieved_docs)

#     final_prompt = prompt.invoke({"context": context_text, "question": question})
#     answer = model.invoke(final_prompt)

#     return answer.content
