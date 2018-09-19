// again with classes
// class book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// manage all UI actions
class UI {
  addBookToList(book) {
    // Get the node where to inster the list of books
    const list = document.getElementById("book-list");
    // Create a row to insert a new book
    const row = document.createElement("tr");
    //insert row
    row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }

  // add Delete book
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      let erase = target.parentElement.parentElement.children;
      let terase = erase[2].innerText;
      Store.removeBook(terase);
      ui.showAlert("Book Removed", "success");
    }
  }

  clearField() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert(message, className) {
    //create DIV element
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.innerText = message;

    // get parent to insert alert node

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //delete alert after 3 secs
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// Event Handlers for all Events
// 1. submit
// 2. delete

//listener

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookISBN = document.getElementById("isbn").value;

  // Instatiate Book Object
  const book = new Book(bookTitle, bookAuthor, bookISBN);
  // Instantiate UI
  const ui = new UI();
  //validate empty values
  if (bookTitle === "" || bookAuthor === "" || bookISBN === "") {
    ui.showAlert("Fields should not be empty", "error");
  } else {
    // add book to html booklist
    ui.addBookToList(book);
    Store.addBook(book);

    // clear fields from form
    ui.clearField();
  }
}

//Create event Listener for delete book

document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();
  ui = new UI();
  ui.deleteBook(e.target);
});

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

Store.displayBooks();
