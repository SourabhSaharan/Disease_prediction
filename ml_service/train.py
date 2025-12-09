import pandas as pd
from sklearn.svm import SVC
import pickle

# Load your dataset
data = pd.read_csv("Training.csv")

X = data.drop("prognosis", axis=1)
y = data["prognosis"]

# Train the model
model = SVC(probability=True)
model.fit(X, y)

# Save with pickle
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model retrained and saved with pickle (compatible with app.py)")
