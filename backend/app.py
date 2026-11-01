from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)
# Load trained model and scaler
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(os.path.join(BASE_DIR, "ml", "parkinson_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "ml", "scaler.pkl"))


@app.route("/")
def home():
    return jsonify({
        "message": "Parkinson Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    features = np.array(data["features"]).reshape(1, -1)

    # Scale input
    scaled_features = scaler.transform(features)

    # Prediction
    prediction = model.predict(scaled_features)[0]

    # Probability
    probability = model.predict_proba(scaled_features)[0]

    return jsonify({
        "prediction": int(prediction),
        "class_0_probability": float(probability[0]),
        "class_1_probability": float(probability[1])
    })


if __name__ == "__main__":
    app.run(debug=True)