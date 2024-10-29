from flask import Flask, request, url_for, redirect, render_template
from flask import jsonify
import pickle
import pandas as pd
import numpy as np
app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    year = request.form.get('year')
    month = request.form.get('month')
    day = request.form.get('day')
    new_data = pd.DataFrame({'year': [year], 'month': [month], 'day': [day]})
    predictions = model.predict(X=new_data)
    return render_template('index.html', pred=predictions[0])

if __name__ == '__main__':
    app.run(debug=True)

