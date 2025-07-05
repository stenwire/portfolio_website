# AutoGO: Car Booking API Documentation 

<img src="../icons8-github-48.png" alt="" align="center">[Link to Project](https://github.com/stenwire/AutoGo)

## Introduction  

AutoGO is a **car booking API** that allows users to search, book, and manage car rentals effortlessly. Whether you're integrating it into a travel app, a car rental service, or any other platform, AutoGO provides a seamless experience for managing vehicle bookings.  

This documentation is designed for **both technical and non-technical users**, explaining how to set up, test, and use AutoGO effectively.  

---

## 🛠 Tools & Technologies Used  

- **Python & Django** – Powers the backend logic.  
- **Postman** – Used for testing API endpoints.  
- **Swagger** – Provides interactive API documentation.  
- **Pipenv** – Manages project dependencies.  
- **Treblle** – Monitors API performance and analytics.  

---

## 🚀 Getting Started  

### Prerequisites  
Before setting up AutoGO, ensure you have:  
- **Python** installed (recommended: Python 3.8+).  
- **Git** for cloning the repository.  

### Step 1: Clone the Repository  
First, download the AutoGO project using Git:  

```shell
git clone https://github.com/stenwire/AutoGo.git
```  

Then, navigate into the project folder:  

```shell
cd :\\path\\to\\AutoGO
```  

### Step 2: Set Up a Virtual Environment  
AutoGO uses **Pipenv** to manage dependencies. Install it if you don’t have it:  

```shell
pip install pipenv
```  

Activate the virtual environment:  

```shell
pipenv shell
```  

### Step 3: Install Dependencies  
Install all required libraries:  

```shell
pipenv install
```  

### Step 4: Configure Environment Variables  
1. Locate the `.env.example` file in the project.  
2. Create a copy and rename it to `.env`.  
3. Fill in the required details (e.g., Treblle API keys from the [Treblle Dashboard](https://treblle.com/)).  

### Step 5: Create an Admin User  
To access the admin dashboard, create a superuser account:  

1. Open the Python shell:  
   ```shell
   python manage.py shell
   ```  

2. Run the following commands:  
   ```python
   from authme.models import CustomUser
   CustomUser.objects.create_user(
       email="youremail@example.com",
       username="johnDoe707",
       password="strongpassword",
       is_staff=True,
       is_superuser=True
   )
   ```  

Now you can log in to the admin panel with these credentials.  

---

## 📡 Testing the API  

### Option 1: Postman Documentation  
For a user-friendly way to explore API endpoints, check the **[Postman Docs](https://documenter.getpostman.com/view/16596786/2s93zFXKTM)**.  

### Option 2: Swagger UI  
AutoGO also supports **Swagger**, an interactive API documentation tool. After running the server, visit:  

```
http://localhost:8000/swagger/
```  

### Generating Datetime for Bookings  
When testing bookings, you may need to provide dates. Use this Python snippet to generate the correct format:  

```python
from datetime import datetime

pickup_time = datetime(year=2023, month=10, day=15, hour=10, minute=30)
dropoff_time = datetime(year=2023, month=10, day=17, hour=14, minute=45)
duration = dropoff_time - pickup_time

print("Pickup:", pickup_time)
print("Dropoff:", dropoff_time)
print("Duration:", duration)
```  

---

## 🔍 Key Features  

✅ **User Authentication** – Secure signup/login for customers and admins.  
✅ **Car Listings** – Browse available vehicles with filters.  
✅ **Booking Management** – Reserve, modify, or cancel rentals.  
✅ **Admin Dashboard** – Manage users, cars, and bookings easily.  

---

## 📌 Need Help?  
If you encounter issues, feel free to:  
- Open a **[GitHub Issue](https://github.com/stenwire/AutoGo/issues)**.  
- Check the **[Postman Docs](https://documenter.getpostman.com/view/16596786/2s93zFXKTM)** for endpoint details.  

---

AutoGO makes car rentals simple and efficient. Happy booking! �💨