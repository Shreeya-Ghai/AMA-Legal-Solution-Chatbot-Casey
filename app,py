from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for development; restrict in production

# Ensure the CSV file exists
CSV_FILE_PATH = os.path.join(os.getcwd(), 'user_data.csv')
if not os.path.exists(CSV_FILE_PATH):
    with open(CSV_FILE_PATH, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Name', 'Phone', 'Email', 'Query'])  # Add headers

@app.route('/')
def home():
    # Ensure the 'templates' folder exists and contains 'check.html'
    return render_template('check.html')

@app.route('/submit_info', methods=['POST'])
def submit_info():
    try:
        data = request.get_json()
        print(data)

        # Validate input data
        required_fields = ['name', 'phone', 'email', 'query']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({"error": f"'{field}' is required"}), 400

        name = data['name'].strip()
        phone = data['phone'].strip()
        email = data['email'].strip()
        query = data['query'].strip()

        # Append data to CSV
        with open(CSV_FILE_PATH, mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow([name, phone, email, query])

        return jsonify({"message": "Information received"}), 200

    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode for development; disable in production

    
