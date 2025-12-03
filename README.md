# 🎁 Student Gifts Marketplace

A full-stack web application that allows students to browse, filter, and claim gifts.  
Built with **Angular**, **Node.js (Express)**, and **MySQL**, this project demonstrates user authentication, dynamic UI rendering, API communication, and database interaction.

---

## ⭐ Overview

The **Student Gifts Marketplace** is designed as a simple yet complete full-stack system.  
Students can log in, view available gifts, apply filters, search by title, and claim gifts as long as they are in stock.

This project showcases:

- **Secure login & authentication**
- **RESTful API design**
- **Frontend-to-backend communication**
- **Filtering, searching, and dynamic UI updates**
- **A clean Angular Material interface**

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login  
- User info displayed dynamically in the UI  
- Token stored locally and attached to protected requests  

### 🎁 Gift Listing
- Loads gifts from the backend  
- Displays **title, image, category, description, and quantity**  
- Responsive grid layout  
- Built using **Angular Material cards**  

### 🔎 Search & Filtering
- Search gifts by **title**  
- Filter by category (**Food, Education, Technology, Games**)  
- Real-time filtering on the frontend  

### 🛒 Claiming Gifts
- Students can claim gifts if **quantity > 0**  
- Backend updates stock  
- UI updates automatically to reflect remaining quantity  

---

## 🏗️ Tech Stack

### Frontend
- Angular (Standalone Components)
- TypeScript
- Angular Material

### Backend
- Node.js
- Express
- JWT authentication
- MySQL database

## ⚙️ How It Works

1. **User logs in**  
   Backend verifies credentials and returns a JWT token.

2. **Token stored in browser**  
   Used for authenticated requests (e.g., claiming gifts).

3. **Gifts loaded**  
   Frontend requests the available gifts from `/gifts`.

4. **Search & filtering**  
   Performed on the frontend for instant UI updates.

5. **Claiming a gift**  
   Frontend calls `/gifts/claim/:id` → backend checks stock → deducts quantity → returns updated data.

---

## 📚 Purpose of the Project

This project was built as part of an academic assignment to practice:

- Full-stack development  
- REST API creation  
- Angular application structure  
- Secure login flows  
- Database-driven content  
- UI/UX fundamentals  

It demonstrates a complete working system from backend API to frontend UI.
