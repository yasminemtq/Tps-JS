import express from "express";
import BookModel from "../models/BookModel.js";
import Book from "../modules/Book.js";

const router = express.Router();

// Add new book
router.post("/", async (req, res) => {
  const bookClass = new Book(req.body); // apply rules
  const newBook = new BookModel(bookClass);
  await newBook.save();
  res.json({ message: "Book added" });
});

// Get list
router.get("/", async (req, res) => {
  const books = await BookModel.find();
  res.json(books);
});

// Update pages_read
router.put("/:id", async (req, res) => {
  const data = req.body;
  if (data.pages_read && data.number_of_pages) {
    data.finished = data.pages_read >= data.number_of_pages ? 1 : 0;
  }
  await BookModel.findByIdAndUpdate(req.params.id, data);
  res.json({ message: "Book updated" });
});

// Delete
router.delete("/:id", async (req, res) => {
  await BookModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

export default router;
