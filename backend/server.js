
const express = require("express");
const cors = require("cors");
const {DBconnection} = require("./database/connection.js")
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const FAQ = require('./models/faq');  // Adjust the path based on where your FAQ model is located


DBconnection();

const faqRoutes = require("./routes/faqRoute");

const app = express();
const PORT = process.env.PORT || 8000;

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [
    {
      resource: FAQ,
      options: {
        listProperties: ['translations', 'answer', 'createdAt', 'updatedAt'], // Fields to display in the list
        editProperties: ['translations', 'answer'], // Fields to allow editing
        showProperties: ['translations', 'answer'], // Fields to show in detail view
      },
    },
  ],
  rootPath: "/admin",
});

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (email === "admin" && password === "admin") {
        return Promise.resolve({ email: "admin" });
      }
      return null;
    },
    cookieName: process.env.ADMIN_COOKIE_NAME,
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
  });

app.use(adminBro.options.rootPath, adminRouter);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/faqs", faqRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
