import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import booksRouter from "./routes/books.js";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Tp_Js_BooksApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/books", booksRouter);

// Start server
app.listen(3000, () => {
  console.log("Server running on: http://localhost:3000");
});
