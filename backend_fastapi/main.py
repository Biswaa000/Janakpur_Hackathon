# backend_fastapi/main.py

from fastapi import FastAPI
from routers.home import router as home_router   # ✅ correct import

app = FastAPI(title="Nepal Legal Chatbot API")

# include router
app.include_router(home_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Chatbot running"}
