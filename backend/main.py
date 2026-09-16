# main.py
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np 
import pickle
from langdetect import detect
from deep_translator import GoogleTranslator

def translate_to_english(text):
    try:
        lang = detect(text)
        if lang == 'en':
            return text
        translated = GoogleTranslator(source='auto', target='en').translate(text)
        return translated
    except:
        return text

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
model = AutoModelForSequenceClassification.from_pretrained('./vera_model')
model.eval()

lr_model = pickle.load(open('lr_model.pkl', 'rb'))
tfidf = pickle.load(open('tfidf.pkl', 'rb'))

class NewsInput(BaseModel):
    text: str

@app.post("/predict")
def predict(news: NewsInput):
    text = translate_to_english(news.text)

    tokens = tokenizer(text, max_length=512, truncation=True, 
                      padding='max_length', return_tensors='pt')
    with torch.no_grad():
        outputs = model(**tokens)
        distilbert_probs = torch.softmax(outputs.logits, dim=1).numpy()[0]
    
    # Logistic Regression prediction
    tfidf_features = tfidf.transform([text])
    lr_probs = lr_model.predict_proba(tfidf_features)[0]
    
    avg_probs = (distilbert_probs + lr_probs) / 2
    
    prediction = np.argmax(avg_probs)
    confidence = avg_probs[prediction] * 100
    
    label = "Real" if prediction == 0 else "Fake"
    return {
        "prediction": label,
        "confidence": round(float(confidence), 2),
        "distilbert_confidence": round(float(distilbert_probs[prediction]*100), 2),
        "lr_confidence": round(float(lr_probs[prediction]*100), 2)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)