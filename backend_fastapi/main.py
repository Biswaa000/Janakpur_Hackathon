# backend_fastapi/main.py

from fastapi import FastAPI
from routers.home import router as home_router   # ✅ correct import
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Nepal Legal Chatbot API")


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods including OPTIONS
    allow_headers=["*"],  # Allow all headers
)


# include router
app.include_router(home_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Chatbot running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)

