# app.py  (replace your current ml_service/app.py with this)
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# --- load the model and the Training.csv (features) ---
MODEL_PATH = "model.pkl"
CSV_PATH = "Training.csv"

if not os.path.exists(MODEL_PATH) or not os.path.exists(CSV_PATH):
    raise FileNotFoundError("Make sure model.pkl and Training.csv are in the ml_service folder")

# load the trained model
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

# load training CSV to get symptom column order (the same order used to train)
data = pd.read_csv(CSV_PATH)
symptom_columns = list(data.columns[:-1])  # all columns except the target 'prognosis'

# --- disease info mapping (precautions + suggested doctor) ---
# This mapping uses the exact disease names from your CSV.
# You can expand/modify any of the values below later if you want.
disease_info = {
    "(vertigo) Paroymsal  Positional Vertigo": {
        "doctor": "Neurologist",
        "precautions": ["Rest in a quiet, well-lit room", "Avoid sudden head movements", "See a neurologist if severe or persistent"]
    },
    "AIDS": {
        "doctor": "Infectious Disease Specialist",
        "precautions": ["Seek specialized care immediately", "Follow prescribed treatment plan", "Avoid exposure to infections"]
    },
    "Acne": {
        "doctor": "Dermatologist",
        "precautions": ["Keep skin clean", "Avoid squeezing pimples", "See a dermatologist for prescribed treatment"]
    },
    "Alcoholic hepatitis": {
        "doctor": "Gastroenterologist",
        "precautions": ["Stop alcohol intake", "Stay hydrated", "See a specialist for evaluation"]
    },
    "Allergy": {
        "doctor": "Allergist / Immunologist",
        "precautions": ["Avoid known triggers", "Use antihistamines if recommended", "Seek urgent care for breathing difficulty"]
    },
    "Arthritis": {
        "doctor": "Orthopedist / Rheumatologist",
        "precautions": ["Avoid heavy lifting", "Do gentle low-impact exercise", "See a specialist for long-term management"]
    },
    "Bronchial Asthma": {
        "doctor": "Pulmonologist",
        "precautions": ["Avoid smoke and triggers", "Keep inhaler accessible if prescribed", "See a pulmonologist if breathing is difficult"]
    },
    "Cervical spondylosis": {
        "doctor": "Orthopedist",
        "precautions": ["Avoid heavy neck strain", "Practice gentle neck mobility", "See orthopedist/physiotherapist for exercises"]
    },
    "Chicken pox": {
        "doctor": "Dermatologist / General Physician",
        "precautions": ["Keep rash clean and avoid scratching", "Isolate to prevent spread", "See a physician for symptomatic care"]
    },
    "Chronic cholestasis": {
        "doctor": "Gastroenterologist",
        "precautions": ["Avoid alcohol and hepatotoxins", "Follow up with liver specialist", "Maintain hydration and nutrition"]
    },
    "Common Cold": {
        "doctor": "General Physician",
        "precautions": ["Rest and stay hydrated", "Use symptomatic remedies", "See a doctor if high fever or breathing difficulty"]
    },
    "Dengue": {
        "doctor": "General Physician / Infectious Disease Specialist",
        "precautions": ["Stay hydrated and rest", "Avoid NSAIDs unless advised by doctor", "Seek immediate care for severe symptoms"]
    },
    "Diabetes ": {  # note trailing space — matches Training.csv
        "doctor": "Endocrinologist",
        "precautions": ["Monitor blood sugar regularly", "Follow diet and medication plan", "See an endocrinologist for long-term care"]
    },
    "Dimorphic hemmorhoids(piles)": {
        "doctor": "General Surgeon / Proctologist",
        "precautions": ["Avoid straining during bowel movements", "Increase fiber and fluids", "See a specialist for persistent bleeding or pain"]
    },
    "Drug Reaction": {
        "doctor": "Allergist / Immunologist",
        "precautions": ["Stop the suspected drug and seek immediate care", "Seek urgent medical attention for severe reactions", "Consult an allergist for testing"]
    },
    "Fungal infection": {
        "doctor": "Dermatologist",
        "precautions": ["Keep affected area clean and dry", "Avoid sharing towels or clothing", "See dermatologist for antifungal therapy"]
    },
    "GERD": {
        "doctor": "Gastroenterologist",
        "precautions": ["Avoid spicy/fatty meals", "Eat small frequent meals", "See a gastroenterologist if persistent"]
    },
    "Gastroenteritis": {
        "doctor": "General Physician / Gastroenterologist",
        "precautions": ["Stay hydrated (oral rehydration)", "Avoid solid foods until tolerated", "See doctor if dehydration or high fever"]
    },
    "Heart attack": {
        "doctor": "Cardiologist (Emergency)",
        "precautions": ["Seek emergency care immediately for chest pain", "Do not drive yourself to hospital", "Follow emergency medical advice"]
    },
    "Hepatitis B": {
        "doctor": "Gastroenterologist / Hepatologist",
        "precautions": ["Avoid alcohol", "Follow specialist advice", "Get appropriate tests and monitoring"]
    },
    "Hepatitis C": {
        "doctor": "Gastroenterologist / Hepatologist",
        "precautions": ["Avoid alcohol and hepatotoxins", "Follow specialist evaluation and treatment", "Ensure regular monitoring"]
    },
    "Hepatitis D": {
        "doctor": "Gastroenterologist / Hepatologist",
        "precautions": ["Follow specialist advice", "Avoid alcohol", "Seek hepatology care"]
    },
    "Hepatitis E": {
        "doctor": "Gastroenterologist / Hepatologist",
        "precautions": ["Ensure hydration", "Avoid alcohol", "Seek medical evaluation"]
    },
    "Hypertension ": {  # note trailing space
        "doctor": "Cardiologist",
        "precautions": ["Reduce salt intake", "Monitor blood pressure", "Follow prescribed medication and lifestyle changes"]
    },
    "Hyperthyroidism": {
        "doctor": "Endocrinologist",
        "precautions": ["Seek specialist evaluation", "Avoid self-medication", "Follow treatment and monitoring plan"]
    },
    "Hypoglycemia": {
        "doctor": "Endocrinologist / General Physician",
        "precautions": ["Consume quick sugar (juice/glucose) if conscious", "Monitor blood sugar", "See doctor to adjust treatment"]
    },
    "Hypothyroidism": {
        "doctor": "Endocrinologist",
        "precautions": ["Follow thyroid replacement therapy if prescribed", "Regularly monitor thyroid levels", "Consult an endocrinologist"]
    },
    "Impetigo": {
        "doctor": "Dermatologist",
        "precautions": ["Keep lesions clean", "Avoid close contact until treated", "See dermatologist for topical/oral antibiotics"]
    },
    "Jaundice": {
        "doctor": "Gastroenterologist / Hepatologist",
        "precautions": ["Avoid alcohol", "Seek medical evaluation", "Maintain hydration and nutrition"]
    },
    "Malaria": {
        "doctor": "General Physician / Infectious Disease Specialist",
        "precautions": ["Seek prompt medical care", "Stay hydrated", "Avoid self-medication"]
    },
    "Migraine": {
        "doctor": "Neurologist",
        "precautions": ["Rest in a quiet, dark room", "Avoid known triggers", "See a neurologist if frequent or severe"]
    },
    "Osteoarthristis": {
        "doctor": "Orthopedist",
        "precautions": ["Maintain gentle exercise", "Avoid heavy impact activities", "Consult orthopedist for pain management"]
    },
    "Paralysis (brain hemorrhage)": {
        "doctor": "Neurologist / Neurosurgeon",
        "precautions": ["Seek emergency care immediately", "Follow specialist rehabilitation plan", "Avoid delay in treatment"]
    },
    "Peptic ulcer diseae": {
        "doctor": "Gastroenterologist",
        "precautions": ["Avoid NSAIDs and irritant foods", "Eat smaller meals", "See gastroenterologist for diagnosis and treatment"]
    },
    "Pneumonia": {
        "doctor": "Pulmonologist",
        "precautions": ["Seek medical evaluation if breathless", "Rest and stay hydrated", "Follow prescribed antibiotics if indicated"]
    },
    "Psoriasis": {
        "doctor": "Dermatologist",
        "precautions": ["Avoid scratching", "Keep skin moisturized", "See dermatologist for tailored therapy"]
    },
    "Tuberculosis": {
        "doctor": "General Physician / Infectious Disease Specialist",
        "precautions": ["Seek prompt medical care", "Avoid close contact before treatment", "Complete full course of prescribed therapy"]
    },
    "Typhoid": {
        "doctor": "General Physician / Infectious Disease Specialist",
        "precautions": ["Seek medical treatment", "Stay hydrated", "Avoid self-medication"]
    },
    "Urinary tract infection": {
        "doctor": "Urologist / General Physician",
        "precautions": ["Drink plenty of water", "Maintain hygiene", "See a doctor for antibiotics if needed"]
    },
    "Varicose veins": {
        "doctor": "Vascular Surgeon / General Surgeon",
        "precautions": ["Avoid prolonged standing", "Elevate legs when possible", "See specialist for management options"]
    },
    "hepatitis A": {
        "doctor": "Gastroenterologist / Hepatologist",
        "precautions": ["Ensure hydration", "Avoid alcohol", "Seek medical evaluation"]
    }
}

# --- Predict route: convert symptoms -> 0/1 vector, predict, return info ---
@app.route("/predict", methods=["POST"])
def predict():
    try:
        body = request.json or {}
        symptoms = body.get("symptoms", [])
        if not isinstance(symptoms, list):
            # ensure symptoms is list (frontend should send a list)
            return jsonify({"error": "Expected list of symptoms"}), 400

        # build the input vector (exact order of symptom_columns)
        x = [1 if sym in symptoms else 0 for sym in symptom_columns]
        x_arr = np.array([x])

        # model predicts the disease label (string)
        predicted = model.predict(x_arr)[0]

        # lookup precautions + suggested doctor
        info = disease_info.get(predicted, {"doctor": "General Physician", "precautions": ["Rest, stay hydrated", "Seek medical attention if symptoms worsen"]})

        return jsonify({
            "disease": str(predicted),
            "doctor": info["doctor"],
            "precautions": info["precautions"]
        })
    except Exception as e:
        # return error message so frontend can show useful debug info
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
