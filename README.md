# Parkinson Prediction System

A machine learning project that predicts whether a patient is likely to have Parkinson's disease using biomedical voice measurements. The project includes a Flask backend API, a static frontend form, and trained ML artifacts for real-time prediction.

## Project Overview

This system analyzes 22 clinically relevant speech-based features and uses a trained classification model to predict the probability of Parkinson's disease. The frontend collects patient data, sends it to the backend, and displays prediction results including probabilities for each class.

The project is designed for:
- educational ML implementation
- healthcare-related prototype demonstration
- Flask + JavaScript web app architecture
- deployment on Vercel + Render

## Features

- 22 voice measurement inputs for prediction
- Flask REST API for model inference
- frontend form built with HTML, CSS, and JavaScript
- trained model and scaler saved as pickle files
- probability output for both classes
- responsive UI for desktop and mobile
- deployment-ready architecture

## Tech Stack

### Backend
- Python
- Flask
- Flask-CORS
- NumPy
- scikit-learn
- joblib
- Gunicorn

### Frontend
- HTML5
- CSS3
- JavaScript

### Machine Learning
- StandardScaler
- trained classification model
- Parkinson's disease voice dataset

## Dataset

The project uses the Parkinson's disease dataset stored in:

- dataset/parkinsons.csv

This dataset contains voice-based biomedical attributes and a target label indicating whether the subject is healthy or has Parkinson's disease.

## Project Structure

```text
Parkinson-Prediction-System/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── ml/
│   ├── parkinson_model.pkl
│   └── scaler.pkl
├── dataset/
│   └── parkinsons.csv
├── notebooks/
│   └── 01_Dataset_Analysis.ipynb
├── README.md
├── .gitignore
├── docs/
├── presentation/
├── reports/
├── screenshots/
└── .venv/
```

## Model Workflow

1. Load the dataset from dataset/parkinsons.csv.
2. Drop unnecessary columns like the patient name field.
3. Split features and target label.
4. Scale the feature values using StandardScaler.
5. Train a classification model.
6. Save the trained model and scaler using joblib.
7. Load them in the Flask backend for inference.
8. Accept user input from the frontend and return the prediction.

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Parkinson-Prediction-System
```

### 2. Create a virtual environment

Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Linux/macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Run the Project Locally

### Start the backend

```bash
cd backend
python app.py
```

The API will run on:

```text
http://127.0.0.1:5000
```

### Start the frontend

Open the frontend folder and serve the static files:

```bash
cd frontend
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## API Endpoint

### POST /predict

Request body:

```json
{
  "features": [
    119.992,
    157.302,
    74.997,
    0.00784,
    0.00007,
    0.00370,
    0.00554,
    0.01109,
    0.04374,
    0.426,
    0.02182,
    0.03130,
    0.02971,
    0.06545,
    0.02211,
    21.033,
    0.414783,
    0.815285,
    -4.813031,
    0.266482,
    2.301442,
    0.284654
  ]
}
```

Response:

```json
{
  "prediction": 1,
  "class_0_probability": 0.12,
  "class_1_probability": 0.88
}
```

### Notes
- prediction value 1 usually indicates Parkinson's disease positive
- prediction value 0 usually indicates negative result
- the class probabilities indicate confidence for each class

## Frontend Behavior

The frontend form includes all required features and validates the inputs before sending the request to the backend. Once the API response is received, the page displays:

- prediction status
- class 0 probability
- class 1 probability
- loading spinner while processing

## Deployment Guide

### Option 1: Frontend on Vercel

- Push the project to GitHub
- Import the repo in Vercel
- Set the root folder to frontend
- Deploy the project as a static site

### Option 2: Backend on Render

- Push the repo to GitHub
- Create a new Render Web Service
- Set the root directory to backend
- Use Python runtime
- Build command:

```bash
pip install -r requirements.txt
```

- Start command:

```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

Then update the frontend request URL from localhost to the Render backend URL.

Example:

```javascript
fetch("https://your-render-app.onrender.com/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ features: features })
});
```

## Deployment Architecture Recommendation

A strong and free deployment setup is:

- Vercel for frontend hosting
- Render for Flask backend hosting

This separates UI and inference logic while keeping the project easy to maintain.

## Important Notes

- [backend/app.py](backend/app.py) loads both the trained model and scaler from the project folder.
- The project expects the model files to be included in the repository and available during deployment.
- Model files are binary artifacts and can be large, so they should be committed or uploaded correctly to the hosting service.
- CORS is enabled in the backend so the frontend can call the API from a different domain.

## Future Improvements

- Add better model comparison and evaluation dashboards
- add tests for backend endpoints
- improve error handling and input validation
- deploy with environment variables for API URL configuration
- add patient report generation
- add user authentication and database storage

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## License

This project is intended for educational and demonstration purposes.

## Author

Gautam Kumar
