# CodeDesign.ai
# **Clone the repository**
   ```bash
   git clone https://github.com/Davis714/CodeDesign.ai.git
   ```
# Frontend
1. **For the frontend part**
   ```bash
   cd CodeDesign.ai/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the server**
   ```bash
   npm start
   ```
   The server will start at:
   ```
   http://localhost:3000
   ```
---
# Company Activity Reporting API

A Node.js + Express + MongoDB backend for managing company activities, teams, members, and generating detailed activity reports with date filtering.

## Features
- Add activity records for members
- Generate company-level, team-level, and member-level reports
- Overview report with total counts and top activity types
- Date range filtering via query params (`?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`)
- Built with **Express**, **MongoDB** (Mongoose), and **Joi** for validation

---

## Prerequisites
Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally

---

## Installation

1. **For the backend part**
   ```bash
   cd CodeDesign.ai/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB locally**
   ```bash
   # Make sure MongoDB is running on default port 27017
   mongod
   ```

4. **Run the server**
   ```bash
   nodemon app.js
   ```
   The server will start at:
   ```
   http://localhost:3000
   ```

---

## Seeding the Database
This project includes a `seed.js` script to populate MongoDB with sample data for quick testing.

**Steps to seed the database:**
1. Make sure MongoDB is running.
2. Run the seeding script:

   ```bash
   node seed.js
   ```
3. The script will:
   - Clear existing collections
   - Add from company.js:
     - 1 Company 
     - 2 Teams
     - 3 Members
     - 4 Activities with various types, hours, and dates
After running the seed, you can directly test the API endpoints.
4. Postman working can be viewed in 
    ```
    Postman Working.mp4
    ```

---

## API Endpoints
---
### **Returns a daily activity log for a member**
```
GET /report/member/:memberId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns(Sample):
```
{
    "memberId": "6895823408869e73b6a3e7dc",
    "memberName": "Alice",
    "totalHours": 18,
    "dailyBreakDown": [
        {
            "date": "2024-03-01",
            "activities": [
                "coding"
            ],
            "hours": 5
        },
        {
            "date": "2024-03-02",
            "activities": [
                "meeting"
            ],
            "hours": 2
        },
        {
            "date": "2024-03-03",
            "activities": [
                "review"
            ],
            "hours": 1
        },
        {
            "date": "2025-08-01",
            "activities": [
                "Development",
                "Development"
            ],
            "hours": 10
        }
    ]
}
```


---

### **Returns a summary report across all companies**
```
GET /report/overview?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns(Sample):
```
{
    "totalCompanies": 2,
    "totalTeams": 3,
    "totalMembers": 5,
    "totalActivities": 13,
    "totalHours": 44,
    "topActivityTypes": [
        {
            "type": "coding",
            "totalHours": 11
        },
        {
            "type": "Development",
            "totalHours": 10
        },
        {
            "type": "meeting",
            "totalHours": 9
        },
        {
            "type": "content",
            "totalHours": 7
        },
        {
            "type": "design",
            "totalHours": 4
        },
        {
            "type": "seo",
            "totalHours": 2
        },
        {
            "type": "review",
            "totalHours": 1
        }
    ]
}
```

---

### **Returns analytics grouped by team**
```
GET /report/company/:companyId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns:(Sample)
```
{
    "companyId": "6895823408869e73b6a3e7d7",
    "companyName": "Alpha Inc",
    "teams": [
        {
            "teamId": "6895823408869e73b6a3e7da",
            "teamName": "Engineering",
            "totalMembers": 2,
            "totalHours": 27,
            "activityBreakdown": [
                {
                    "type": "coding",
                    "totalHours": 11
                },
                {
                    "type": "Development",
                    "totalHours": 10
                },
                {
                    "type": "meeting",
                    "totalHours": 5
                },
                {
                    "type": "review",
                    "totalHours": 1
                }
            ],
            "uniqueTags": [
                "feature",
                "frontend",
                "planning",
                "code",
                "bugfix",
                "sync",
                "backend",
                "nodejs"
            ]
        },
        {
            "teamId": "6895823408869e73b6a3e7e7",
            "teamName": "Design",
            "totalMembers": 1,
            "totalHours": 6,
            "activityBreakdown": [
                {
                    "type": "design",
                    "totalHours": 4
                },
                {
                    "type": "meeting",
                    "totalHours": 2
                }
            ],
            "uniqueTags": [
                "ui",
                "figma",
                "handoff"
            ]
        }
    ],
    "activitySummaryByType": {
        "coding": {
            "totalHours": 11,
            "members": 2
        },
        "meeting": {
            "totalHours": 7,
            "members": 3
        },
        "review": {
            "totalHours": 1,
            "members": 1
        },
        "Development": {
            "totalHours": 10,
            "members": 1
        },
        "design": {
            "totalHours": 4,
            "members": 1
        }
    }
}
```
### **Add an Activity**
```
POST /activity
```
**Request Body (JSON):**
```json
{
  "member": "6895823408869e73b6a3e7dc",
  "type": "Development",
  "hours": 5,
  "date": "2025-08-01",
  "tags": ["backend", "nodejs"]
}
```
---

## Project Structure
```
backend/
│
├── models/              # Mongoose models
├── data/  
├── routes/              # Express route handlers
├── seed.js               # Script to populate the database with sample data
├── app.js              # Entry point
└── package.json
```

---

## Notes
- This app uses a **local MongoDB instance** by default:
  ```
  mongodb://localhost:27017/companydb
  ```
  Update this in `app.js` or `seed.js` if you want to connect to another database.
- Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the endpoints.

---
# Frontend
To view frontend you can go to 
```
cd frontend
index.html
```


