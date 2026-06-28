# Traffic Flow Prediction — End-to-End ML Pipeline

An end-to-end machine learning pipeline for predicting urban traffic flow. Covers data collection, preprocessing, feature engineering, model training, and comparison — with a web-based visualization dashboard.

---

## Results

| Model | MAE | Notes |
|---|---|---|
| SVR | Best | 18% lower MAE vs baseline |
| KNN | Good | Sensitive to feature scaling |
| Decision Tree | Moderate | Prone to overfitting |
| Multiple Regression | Baseline | Linear assumption limits accuracy |

Best model: **SVR (Support Vector Regression)**

---

## Pipeline

```
Raw Data
  → Preprocessing (missing values, normalization)
  → Feature Engineering (time of day, day of week, weather, holidays)
  → Model Training (4 models compared)
  → Evaluation (MAE, RMSE, R²)
  → Web Dashboard (interactive visualization)
```

---

## Files

| File | Description |
|---|---|
| `traficflow.ipynb` | Full ML pipeline — EDA, feature engineering, model training and evaluation |
| `dataset.csv` | Traffic flow dataset |
| `index.html` | Web dashboard frontend |
| `style.css` | Dashboard styles |
| `scripts.js` | Dashboard interactivity |
| `traffic-city.svg` | Visual asset |
| `RAPPORT DE IA.docx` | Full project report |

---

## Features Used

- **Time features**: hour of day, day of week, weekend flag
- **Calendar features**: public holidays
- **Traffic history**: lagged flow values
- **External factors**: weather conditions

---

## Setup

```bash
git clone https://github.com/MERYEMELOSMANI/Mini_project-TrafficFlowPrediction-.git
cd Mini_project-TrafficFlowPrediction-
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
jupyter notebook traficflow.ipynb
```

---

## Tech Stack

- **Python** — Pandas, NumPy, Scikit-Learn
- **Models** — SVR, KNN, Decision Tree, Multiple Regression
- **Visualization** — Matplotlib, Seaborn
- **Frontend** — HTML, CSS, JavaScript

---

## Author

**MERYEM EL OSMANI**
