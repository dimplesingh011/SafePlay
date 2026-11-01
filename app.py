from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Sample Data Store (In-Memory Database for Demo)
cases_db = [
    {
        "id": "SP-2026-8921",
        "category": "Verbal Abuse & Harassment",
        "date": "2026-10-24",
        "status": "In Review",
        "progress": 65,
        "investigator": "IC Officer A. Sharma (Neutral Panel)",
        "details": "Unprofessional language and severe intimidation reported during evening training session.",
        "timeline": [
            {"title": "Report Submitted", "date": "2026-10-24", "status": "done"},
            {"title": "IC Reviewer Assigned", "date": "2026-10-25", "status": "done"},
            {"title": "Witness Testimony Verification", "date": "In Progress", "status": "current"},
            {"title": "Final Decision & Action", "date": "Pending", "status": "pending"}
        ]
    },
    {
        "id": "SP-2026-4012",
        "category": "Unsafe Training Environment",
        "date": "2026-10-15",
        "status": "Resolved",
        "progress": 100,
        "investigator": "Committee B. Patel",
        "details": "Defective gymnasium safety equipment reported. Equipment replaced and safety verified.",
        "timeline": [
            {"title": "Report Submitted", "date": "2026-10-15", "status": "done"},
            {"title": "IC Reviewer Assigned", "date": "2026-10-16", "status": "done"},
            {"title": "Equipment Inspection", "date": "2026-10-18", "status": "done"},
            {"title": "Resolved & Facility Certified", "date": "2026-10-20", "status": "done"}
        ]
    }
]

coaches_db = [
    {
        "id": 1,
        "name": "Rajesh Kumar",
        "sport": "Athletics",
        "location": "Delhi NCR",
        "experience": "12 Yrs Exp",
        "rating": "4.9★",
        "verified": True,
        "certification": "SAI Certified Senior Coach",
        "availability": "Immediate Transfer Available"
    },
    {
        "id": 2,
        "name": "Ananya Sen",
        "sport": "Badminton",
        "location": "Bengaluru",
        "experience": "8 Yrs Exp",
        "rating": "4.8★",
        "verified": True,
        "certification": "BWF Certified Level 2",
        "availability": "Available Next Week"
    },
    {
        "id": 3,
        "name": "Vikram Singh",
        "sport": "Boxing",
        "location": "Patiala",
        "experience": "15 Yrs Exp",
        "rating": "5.0★",
        "verified": True,
        "certification": "NIS Gold Medalist Coach",
        "availability": "Immediate Transfer Available"
    },
    {
        "id": 4,
        "name": "Meera Joshi",
        "sport": "Swimming",
        "location": "Mumbai",
        "experience": "9 Yrs Exp",
        "rating": "4.7★",
        "verified": True,
        "certification": "FINA Certified Trainer",
        "availability": "Limited Slots"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/coaches', methods=['GET'])
def get_coaches():
    sport = request.args.get('sport', '').lower()
    if sport and sport != 'all':
        filtered = [c for c in coaches_db if c['sport'].lower() == sport]
        return jsonify(filtered)
    return jsonify(coaches_db)

@app.route('/api/cases', methods=['GET'])
def get_cases():
    return jsonify(cases_db)

@app.route('/api/report', methods=['POST'])
def submit_report():
    data = request.json
    case_id = f"SP-2026-{random.randint(1000, 9999)}"
    
    new_case = {
        "id": case_id,
        "category": data.get("category", "General Concern"),
        "date": "2026-11-01",
        "status": "Submitted",
        "progress": 25,
        "investigator": "Pending Assignment (IC Panel)",
        "details": data.get("details", ""),
        "timeline": [
            {"title": "Report Submitted Encrypted", "date": "2026-11-01", "status": "done"},
            {"title": "Assigning IC Investigator", "date": "In Progress", "status": "current"},
            {"title": "Fair Hearing & Evidence Review", "date": "Pending", "status": "pending"},
            {"title": "Career Continuity Action Plan", "date": "Pending", "status": "pending"}
        ]
    }
    
    cases_db.insert(0, new_case)
    return jsonify({"success": True, "case_id": case_id})

if __name__ == '__main__':
    app.run(debug=True, port=5000)