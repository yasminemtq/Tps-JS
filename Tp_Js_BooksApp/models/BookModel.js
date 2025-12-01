import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  number_of_pages: Number,
  pages_read: Number,
  price: Number,
  status: {
    type: String,
    enum: ["Read", "Re-read", "DNF", "Currently reading", "Returned Unread", "Want to read"]
  },
  format: {
    type: String,
    enum: ["Print", "PDF", "Ebook", "Audiobook"]
  },
  suggested_by: String,
  finished: Boolean
});

export default mongoose.model("Book", BookSchema);
