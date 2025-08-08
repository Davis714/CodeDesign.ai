# CodeDesign.ai
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

1. **Clone the repository**
   ```bash
   git clone https://github.com/Davis714/CodeDesign.ai.git
   cd CodeDesign.ai
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
   node index.js
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

---

## API Endpoints

### **Add an Activity**
```
POST /activity
```
**Request Body (JSON):**
```json
{
  "member": "64e6f1e8b1c5e4a123456789",
  "type": "Development",
  "hours": 5,
  "date": "2025-08-01",
  "tags": ["backend", "nodejs"]
}
```

---

### **Company Report**
```
GET /report/company/:companyId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns:
- Teams in the company
- Total hours worked
- Activity breakdown
- Unique tags
- Global activity summary

---

### **Team Report**
```
GET /report/team/:teamId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns:
- Members in the team
- Activity details for each member
- Hours summary

---

### **Member Report**
```
GET /report/member/:memberId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns:
- Daily breakdown of activities
- Total hours worked

---

### **Overview Report**
```
GET /report/overview?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns:
- Total companies, teams, members, activities
- Total hours
- Top activity types

---

## Project Structure
```
project/
│
├── models/              # Mongoose models
├── routes/              # Express route handlers
├── seed.js               # Script to populate the database with sample data
├── index.js              # Entry point
└── package.json
```

---

## Notes
- This app uses a **local MongoDB instance** by default:
  ```
  mongodb://localhost:27017/companydb
  ```
  Update this in `index.js` or `seed.js` if you want to connect to another database.
- Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the endpoints.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

