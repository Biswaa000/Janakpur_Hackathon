# backend_fastapi/core/classify.py

import os
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

def get_model():
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    try:
        return ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key)
    except Exception:
        return None

valid_labels = [
    "harassment",
    "domestic_violence",
    "sexual_violence",
    "cyber_violence",
    "stalking_and_threats",
    "gender_discrimination"
]

classification_prompt = PromptTemplate(
    template="""
You are a Nepali legal classifier.  
Classify the text into exactly ONE of the following categories:

harassment
domestic_violence
sexual_violence
cyber_violence
stalking_and_threats
gender_discrimination

Rules:
- Return ONLY the category name.
- No explanation. No extra text.
- Output must be lowercase.

Text: "{text}"

Your classification:
""",
    input_variables=["text"]
)

def classify_single_label(text: str) -> str:
    """Classify text into one legal category"""
    model = get_model()
    if model is None:
        text_lower = text.lower()
        if "domestic" in text_lower or "husband" in text_lower or "wife" in text_lower:
            return "domestic_violence"
        if "sexual" in text_lower or "assault" in text_lower or "rape" in text_lower:
            return "sexual_violence"
        if "cyber" in text_lower or "online" in text_lower or "internet" in text_lower or "social media" in text_lower:
            return "cyber_violence"
        if "stalk" in text_lower or "threat" in text_lower or "follow" in text_lower:
            return "stalking_and_threats"
        if "discrimination" in text_lower or "gender" in text_lower:
            return "gender_discrimination"
        return "harassment"

    try:
        prompt = classification_prompt.format(text=text)
        result = model.invoke(prompt).content.strip().lower()

        # sanitize model output
        if result not in valid_labels:
            # fallback category (or choose best match logic)
            result = "harassment"

        return result
    except Exception as e:
        print(f"Classification error: {e}")
        return "harassment"
