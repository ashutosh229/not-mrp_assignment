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
