class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
}

class UI {
  addBookTolist(book) {
    const list = document.getElementById('book-list');

    //Create tr element
    const row = document.createElement('tr');

    //Fill the row
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class='delete'>X</a></td>`;

    list.appendChild(row);
  }
  showAlert(message, className) {
    //Create alert div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
    //Insert alerts
    container.insertBefore(div, form);
    //Set disappear time
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local storage class to have persistent data
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();

      //add books to UI
      ui.addBookTolist(book);
    });
  }

  static addBook(newBook) {
    const books = Store.getBooks();

    books.push(newBook);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //insert form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //instantiate a new book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //validate inputs
  if (title === '' || author === '' || isbn === '') {
    //error alert
    ui.showAlert('Please fill in the fields', 'error');
  } else {
    //add book to list
    ui.addBookTolist(book);

    //ADD TO LOCAL STORAGE
    Store.addBook(book);

    //show success alert
    ui.showAlert('Book Added', 'success');

    //clear fields after input
    ui.clearFields();
  }

  e.preventDefault();
});

// event listener for delete from delete
document.getElementById('book-list').addEventListener('click', function (e) {
  //instantiate UI
  const ui = new UI();

  //delete book
  ui.deleteBook(e.target);

  //Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert('Book removed', 'success');
});
