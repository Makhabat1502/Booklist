class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

function UI() {}

UI.prototype.addBookToList = function(book) {
    const bookList = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    bookList.appendChild(row);
}

UI.prototype.showAlert = function(msg, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.deleteBook = function(el) {
    if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function () {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}


document.getElementById("book-form").addEventListener("submit", (e) => {

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value; 

    const book = new Book(title, author, isbn);
    const interface = new UI;

    if (title === "" || author === "" || isbn === "") {
        interface.showAlert("Please fill in all fields", "error");
    } else if (isNaN(isbn)) {
        interface.showAlert("Please, enter a number", "error");
    } else {
        interface.addBookToList(book);
        interface.showAlert("Book added", "success");
        interface.clearFields();
    }

    document.querySelector("#book-list").addEventListener("click", (el) => {
        interface.deleteBook(el.target);
    })

    e.preventDefault();
});