const form = document.getElementById("bookForm");
const list = document.getElementById("bookList");
const stats = document.getElementById("globalStats");

// Load all books
function loadBooks() {
  fetch("/books")
    .then(res => res.json())
    .then(books => {
      list.innerHTML = "";
      let totalPages = 0;
      let totalRead = 0;

      books.forEach(book => {
        totalPages += book.number_of_pages;
        totalRead += book.pages_read;

        const percent = ((book.pages_read / book.number_of_pages) * 100).toFixed(1);

        const li = document.createElement("li");
        li.className = "bg-white p-4 shadow rounded";

        li.innerHTML = `
          <h2 class="text-xl font-bold">${book.title}</h2>
          <p>${book.author} — ${book.format}</p>
          <p>Status: <b>${book.status}</b></p>
          <p>Progress: ${book.pages_read} / ${book.number_of_pages} (${percent}%)</p>
          <button onclick="deleteBook('${book._id}')" class="bg-red-500 text-white px-3 py-1 rounded mt-2">Delete</button>
        `;

        list.appendChild(li);
      });

      stats.innerHTML = `
        Total pages read: <b>${totalRead}</b><br>
        Total pages: <b>${totalPages}</b>
      `;
    });
}

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: title.value,
    author: author.value,
    number_of_pages: Number(number_of_pages.value),
    pages_read: Number(pages_read.value),
    price: Number(price.value),
    status: status.value,
    format: format.value,
    suggested_by: suggested_by.value
  };

  fetch("/books", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(() => {
    form.reset();
    loadBooks();
  });
});

// Delete book
function deleteBook(id) {
  fetch(`/books/${id}`, { method: "DELETE" })
    .then(() => loadBooks());
}

loadBooks();
