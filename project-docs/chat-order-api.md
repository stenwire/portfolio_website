# **A Real-Time Chat System for Order Management**  

<img src="icons8-github-48.png" alt="" align="center">[Link to Project](https://github.com/stenwire/chat-based-order-management-API)

<p align="center">  
  <a href="" target="blank"><img src="https://pixhive.s3.us-east-2.amazonaws.com/images/live-chat.png" width="120" alt="Chat API Logo" /></a>  
</p>  

---  

## **Overview**  
This API enables **real-time communication** between customers and admins for order management. It includes:  
- **Order tracking**  
- **Live chat support**  
- **Automated chat room creation** per order  
- **WebSocket-based messaging** (via Socket.IO)  

Built with **NestJS**, it ensures fast and scalable interactions.  

---

## **🛠 Tools & Technologies**  
- **NestJS** – Backend framework for efficient API development.  
- **PostgreSQL/SQLite** – Database for storing orders and chats.  
- **Docker** – Simplifies setup with containerized environments.  
- **Socket.IO** – Powers real-time chat functionality.  
- **Swagger** – Interactive API documentation.  

---  

## **🚀 Getting Started**  

### **Prerequisites**  
- **Node.js & npm** (Recommended: Node 16+)  
- **Docker** (Optional but recommended)  

### **Setup Instructions**  

#### **1. Clone the Repository**  
```bash  
git clone <repo_link>  
```  
```bash  
cd into_project_directory  
```  

#### **2. Configure Environment Variables**  
- Copy `.env.example` to `.env`.  
- Update database and other settings as needed.  

---  

## **⚡ Running the App**  

### **Option 1: Using Docker (Recommended)**  
Docker ensures a consistent environment. Run:  
```bash  
make docker-build   # Builds the Docker container  
make install       # Installs dependencies  
make docker-up     # Starts the app in Docker  
```  

### **Option 2: Manual Setup (Without Docker)**  
1. **Set Up a Database**  
   - Use **PostgreSQL** (update `.env` with credentials).  
   - Or follow [this guide](https://docs.nestjs.com/recipes/prisma) for **SQLite**.  

2. **Install & Run**  
```bash  
npm install  
npm run start:dev  
```  

---  

## **📡 Accessing the API**  

### **API Documentation (Swagger UI)**  
After starting the app, visit:  
🔗 **[http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)**  

### **WebSocket Chat (Socket.IO)**  
🔗 **[http://localhost:3000/api/v1/chat](http://localhost:3000/api/v1/chat)**  

---  

## **💬 Testing the Chat Feature**  

### **Steps to Simulate a Conversation**  
1. **Create Accounts**  
   - One **admin** and one **user** account.  
2. **Place an Order**  
   - This automatically generates a **chat room**.  
3. **Join the Chat**  
   - **User Session:**  
     ```  
     http://localhost:3000/api/v1/chat?uid=<user_id>&oid=<order_id>  
     ```  
   - **Admin Session:**  
     ```  
     http://localhost:3000/api/v1/chat?uid=<admin_id>&oid=<order_id>  
     ```  

### **Alternative: Use the Provided HTML File**  
For easier testing, open `chat.html` in your browser (and in an incognito window for multiple sessions).  

![Chat Interface Preview](https://pixhive.s3.us-east-2.amazonaws.com/images/Screenshot%202024-12-31%20202151.png)  

---  

## **🧪 Running Tests**  
```bash  
make run-test      # Unit tests  
make run-e2e-test  # End-to-end tests  
```  
*(Check the `Makefile` for more commands.)*  

---  

## **🔍 Why Docker & Makefile?**  
✅ **Consistent Environment** – No "works on my machine" issues.  
✅ **Simplified Commands** – `make docker-up` instead of long Docker commands.  
✅ **Automation** – Easily build, run, and test with single commands.  

📌 **Learn More:**  
- [Docker Docs](https://docs.docker.com/)  
- [Makefile Guide](https://www.gnu.org/software/make/manual/make.html)  

---  

## **📩 Stay Connected**  
For questions or feedback, connect with me on:  
🔗 **[LinkedIn](https://www.linkedin.com/in/stephen-nwankwo-9876b4196/)**  

---  

**Happy Coding!** 🚀💬