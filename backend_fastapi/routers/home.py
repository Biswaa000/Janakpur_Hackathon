# # app/routers/home.py

# from fastapi import APIRouter
# from pydantic import BaseModel
# from core.chat import ask_legal_ai


# router = APIRouter()


# class QuestionRequest(BaseModel):
#     question: str


# @router.post("/ask")
# def ask_question(payload: QuestionRequest):
#     """API endpoint to ask legal questions"""
#     response = ask_legal_ai(payload.question)
#     return {"answer": response}


# app/routers/chat.py

from fastapi import APIRouter
from schemas.chat import ChatRequest, ChatResponse
from core.chat import ask_chatbot

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat_with_bot(payload: ChatRequest):
    answer = ask_chatbot(payload.session_id, payload.message)
    return ChatResponse(reply=answer)
