export default class Book {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.number_of_pages = data.number_of_pages;
    this.pages_read = data.pages_read;
    this.status = data.status;
    this.price = data.price;
    this.format = data.format;
    this.suggested_by = data.suggested_by;

    // règle automatique
    this.finished = this.pages_read >= this.number_of_pages ? 1 : 0;
  }

  currentlyAt() {
    return this.pages_read;
  }

  deleteBook() {
    return "Book deleted";
  }
}
