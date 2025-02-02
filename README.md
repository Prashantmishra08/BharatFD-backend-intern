**NOTE:** 🚀 Check it out! 🚀

I’ve built a backend, but I didn’t stop there—I also created a frontend to make testing smoother and more interactive. Go ahead, run the frontend, explore, and see the backend in action. I’d love to hear your feedback! 🌟

# FAQ Management System (BharatFD-backend-intern)

This is a **Full-Stack FAQ Management System** where users can submit frequently asked questions (FAQs), and an admin can manage them. The project includes:
- A **frontend** built with React and Material-UI.
- A **backend** using Node.js, Express.js, and MongoDB.
- A **database** (MongoDB) to store FAQs.
- **Multilingual support** for FAQs.
- **Jest testing** for backend API.

---

## Features

✅ Users can submit questions and answers.
✅ Admin can view and delete FAQs.
✅ FAQs are stored in MongoDB.
✅ Multilingual support for FAQs.
✅ Fully responsive UI using Material-UI.
✅ Jest tests for API reliability.

---

## Installation

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Atlas Cloud Database)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Prashantmishra08/BharatFD-backend-intern.git
cd BharatFD-backend-intern
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Start the Backend Server
```bash
node App.js
```
Your backend will run at **http://localhost:8000**.

### 4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 5. Start the Frontend
```bash
npm start
```
Your frontend will be available at **http://localhost:3000**.

---

## API Endpoints

### Post a New FAQ
```http
POST http://localhost:8000/api
```
#### Request Body (JSON)
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
  "username": "User"
}
```
### Get FAQs for Admin
```http
GET http://localhost:8000/admin
```
- Fetches all FAQs to display for Admin Panel.

### Get All FAQs
```http
PUT http://localhost:8000/admin/:id
```
- Edit an FAQ.


### Delete an FAQ
```http
DELETE http://localhost:8000/admin/:id
```
- Deletes an FAQ by ID.


### Get All FAQs

#### Fetch FAQs in English (default)
```http
GET http://localhost:8000/api/faqs/
```
#### Fetch FAQs in Hindi
```http
GET http://localhost:8000/api/faqs/?lang=hi
```

#### Fetch FAQs in Bengali
```http
GET http://localhost:8000/api/faqs/?lang=bn
```

- Fetches all FAQs, with optional language translation support.


---

## Running Tests

We use **Jest** for testing backend API endpoints.

### Run Tests
```bash
npm test
```
- This will execute all test cases defined in the `__tests__` folder.
- Ensure your MongoDB instance is running before running tests.

---

## Folder Structure
```
faq-management/
├── backend/         # Node.js & Express API
│   ├── Db/      # Database Configuration
|   |   ├── connection.db.js # Establishing DB connection
│   ├── Models/      # Mongoose Models
|   |   ├── Faq.schema.js  # FAQ Schema
│   ├── __tests__/     # Jest Test Cases
|   |   ├── faq.test.js # Test File
│   ├── App.js    # Main Backend File
|   ├── jest.config.js
├── frontend/        # React Application
│   ├── src/
│   │   ├── components/ # UI Components
|   |   |   ├── AdminPanel.js  # Admin Panel
|   |   |   ├──FAQPage.js    # FAQ to Display
|   |   |   ├── QuestionAnswerForm.js  # Questions an Anwers to Post
│   │   ├── App.js       # Main React App
│   │   ├── index.js     # Entry Point
|   |   ├── styles.css   # For Styling
├── .gitignore       # Git Ignore File
├── README.md        # Project Documentation
```

---

## Contribution Guidelines

💡 Want to contribute? Follow these steps:

1. **Fork the repository**
2. **Create a new branch** (`feature-branch`)
3. **Make your changes** and commit (`git commit -m 'Added a new feature'`)
4. **Push to your branch** (`git push origin feature-branch`)
5. **Create a Pull Request**

---

## Contact
📩 **Email:** mishra08prashant@gmail.com.com  
📌 **GitHub:** Prashantmishra08(https://github.com/Prashantmishra08)


