# HELP STUDY ABROAD – Frontend Technical Assessment

This project is built as part of the Help Study Abroad Frontend Technical Assessment.  
The application demonstrates authentication, state management, API integration, routing, pagination, search, filters, and clean UI using **Next.js**, **Zustand**, and **Material UI (MUI)**.

---

## 🚀 Tech Stack

### **Frontend**
- Next.js 14 (App Router disabled – using Pages Router)
- React 19
- Material UI (MUI 5)
- Zustand (State Management)
- Axios (for API calls)

### **Backend (Public API)**
All backend data is fetched from:  
🔗 https://dummyjson.com/

---

# 📌 Project Features (All Requirements Covered)

## ✅ 1. Authentication (DummyJSON Auth API)
- Admin login page (MUI-based)
- DummyJSON POST API integration:  
  `POST https://dummyjson.com/auth/login`
- Token stored using **Zustand**  
- Protected routes using a custom `<PrivateRoute />`
- Redirects unauthenticated users to login page

---
<img width="1580" height="826" alt="Screenshot_1" src="https://github.com/user-attachments/assets/ebcd954e-f374-414f-966c-f58ffbc0c1cf" />

<img width="1820" height="839" alt="Screenshot_2" src="https://github.com/user-attachments/assets/e4a122a1-71b7-4dcc-ba5c-29be28e3f31c" />


<img width="1845" height="846" alt="Screenshot_3" src="https://github.com/user-attachments/assets/2577812e-f210-4696-98e5-cdc9f7bf6157" />
<img width="1887" height="868" alt="Screenshot_4" src="https://github.com/user-attachments/assets/9d9788a6-2393-4457-b8e2-be428be1bd3c" />



## ✅ 2. Users Module
### **Users List Page**
- API: `GET https://dummyjson.com/users?limit=10&skip=0`
- Search: `GET https://dummyjson.com/users/search?q=...`
- MUI Table layout
- Features:
  ✔ Pagination  
  ✔ Search  
  ✔ Responsive UI  
  ✔ Shows name, email, phone, gender, company  

### **Single User Page**
- API: `GET https://dummyjson.com/users/{id}`
- Full user details in a clean MUI design

---

## ✅ 3. Products Module
### **Products List Page**
- API:  
  - All products: `GET https://dummyjson.com/products?limit=10&skip=0`
  - Search: `GET https://dummyjson.com/products/search?q=...`
  - Category filter: `GET https://dummyjson.com/products/category/{category}`
- MUI Grid Cards
- Features:
  ✔ Pagination  
  ✔ Search  
  ✔ Category filter dropdown  
  ✔ Shows image, title, price, rating  

### **Single Product Page**
- API: `GET https://dummyjson.com/products/{id}`
- Full product detail page with images slider, description, specs

---
Installation & Setup
git clone <your-repo-url>
cd HELP-STUDY-PORTFOLIO
npm install
npm run dev
