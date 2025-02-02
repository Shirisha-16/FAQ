     
This project is a multilingual FAQ system that allows users to retrieve frequently asked questions in different languages. It includes:

-> React-Vite for frontend

->Node.js & Express for backend

->MongoDB as main database & Redis for Caching

->A Flask-based translation service using GoogleTrans

->Admin Panel using AdminBro

->Code quality checks using PEP8 (Python), ESLint (JavaScript)

->Unit tests using Mocha/Chai (JS) & Pytest (Python)

 Installation & Setup:
 1. Clone the Repository
    
   git clone https://github.com/Shirisha-16/FAQ.git

   cd FAQ
   
 2. Install Backend Dependencies
 
    cd backend
    
    npm install
    
 3. Install Frontend Dependencies

    cd ../frontend

    npm install
    
 4. Set Up the Python Translation Service

    cd ../translation_service

     pip install -r requirements.txt
    
 5. Set Up Environment Variables

    Create a .env file in the backend folder:

    PORT=8000
    
    MONGO_URI=mongodb://localhost:27017/faq_db
    
    REDIS_URL=redis://localhost:6379
    
    ADMIN_COOKIE_NAME=admin-cookie
    
    ADMIN_COOKIE_PASSWORD=supersecret
    
    TRANSLATE_API_URL=http://localhost:8000/translate
    
6. Start Services
  
   Start Backend (Express.js & MongoDB)
   
   cd backend
   
   npm start
   
7. Start Frontend (React-Vite)

   cd ../frontend
   
   npm run dev
   
8. Start Translation Service (Flask & Google Translate)

   cd ../translation_service
   
   python translate_service.py
   
9. Start Redis Server (if not running)
    
    redis-server

    API Usage
    
 1. Get All FAQs (with translation)

    GET /api/faqs?lang=fr
    
 2. Get Single FAQ
    
    GET /api/faqs/64df7d2aef3b4c001c9e321a?lang=hi
    
 3. Add New FAQ
  
    POST /api/faqs
    
 4. Admin Panel Access
    
    Go to: http://localhost:8000/admin

 Code Quality & Testing:
 
 1.Run PEP8 Checks (Python Linting)
 
   cd translation_service
   
   flake8 .
   
 2.Run Mocha/Chai Tests (Backend API & Models)
 
   cd backend
   
   npm run check
   
 3.Run Pytest (Flask API & Translation Service)
 
   cd translation_service
   
   pytest

  Contribution Guidelines:
  
 1.Fork the repository & create a new branch:
 
   git checkout -b feature-name
   
 2.Make changes & commit:
 
   git commit -m "Added feature"
   
 3.Push to your fork:
 
   git push origin feature-name
   
 4.Create pull request
  
