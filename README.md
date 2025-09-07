# 🛒 Inventory & Billing Backend (NOT@MRP)

This is the backend for the **Inventory & Billing Management System** built with **Node.js, Express, and MongoDB**.

---

## 🛠 Tech Stack

- **Backend Framework:** Node.js + Express.js  
- **Database:** MongoDB with Mongoose ORM  
- **Authentication:** JSON Web Tokens (JWT)  
- **Environment Management:** dotenv  
- **Dev Tools:** Nodemon, Postman  
- **Deployment:** (e.g., Render / Railway / Vercel / Heroku – update as per your deployment)

---

## 📡 API Endpoints

### 🔑 Auth
- **POST** `/api/auth/register` → Register a new user  
- **POST** `/api/auth/login` → Login & get JWT token  
- **GET** `/api/auth/logout` → Logout (revoke token)  

---

### 📦 Products (auth required)
- **GET** `/api/products` → List all products  
- **POST** `/api/products` → Create a new product  
- **PUT** `/api/products/:id` → Update product details  
- **DELETE** `/api/products/:id` → Delete a product  
- **PATCH** `/api/products/:id/stock` → Increase/decrease stock  

---

### 👥 Contacts (auth required)
- **GET** `/api/contacts` → List all contacts (customers/vendors)  
- **POST** `/api/contacts` → Create a new contact  
- **PUT** `/api/contacts/:id` → Update contact details  
- **DELETE** `/api/contacts/:id` → Delete a contact  

---

### 💰 Transactions (auth required)
- **GET** `/api/transactions` → List all transactions (filter by type/date)  
- **POST** `/api/transactions` → Create a sale or purchase transaction  
- **GET** `/api/transactions/reports/inventory` → Get current inventory stock report  
- **GET** `/api/transactions/reports/history/:contactId` → Get transaction history for a customer/vendor  

---

## 📂 Postman Collection
You can test all API endpoints using the Postman collection below:  

👉 [Download Postman Collection](https://example.com/postman-collection.json)

---

## 🌐 Deployment
The project is deployed at:  

👉 [Live Deployment](https://example-deployment-link.com)

---

## 🎥 Demo Video
Watch the demo here:  

👉 [Demo Video](https://example.com/demo-video)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ashutosh229/not-mrp_assignment.git
cd not-mrp_assignment  
``` 

### 2. Install the packages
```bash
npm install   
``` 

### 3. Copy the contents of .env.example to .env
```bash
cp .env.example .env   
```

### 4. Start the server
```bash
npm run dev --debug   
``` 

--- 

## 👨‍💻 Author

Developed by **Ashutosh Kumar Jha**  
📧 Email: ashutoshj@iitbhilai.ac.in 
🔗 GitHub: [your-github-username](https://github.com/ashutosh229)  
🔗 LinkedIn: [your-linkedin-profile](https://www.linkedin.com/in/ashutosh-kumar-jha-601098280)  


