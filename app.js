//ES5 js
//Book constructor
function Book(tittle, author, isbn) {
  (this.tittle = tittle), (this.author = author), (this.isbn = isbn);
}

// UI constructor
function UI() {}

UI.prototype.addBookTolist = function (book) {
  const list = document.getElementById('book-list');
  //Create tr element
  const row = document.createElement('tr');
  //insert colums
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>
  `;

  list.appendChild(row);
};

//show alert

UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement('div');

  //addclasses
  div.className = `alert ${className}`;

  //add text
  div.appendChild(document.createTextNode(message));

  //get parent
  const container = document.querySelector('.container');

  //get form
  const form = document.querySelector('#book-form');

  //insert alert
  container.insertBefore(div, form);

  //timeout for disappear
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event Listeners
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

    //show success alert
    ui.showAlert('Book Added', 'success');

    //clear fields after input
    ui.clearFields();
  }

  e.preventDefault();
});
