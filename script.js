const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Book.info = function () {
//   console.log();
// };

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render(library) {
  // body...
}

const titleText = document.querySelector('#inputTitle');
const authorText = document.querySelector('#inputAuthor');
const pagesText = document.querySelector('#inputPages');
const readText = document.querySelector('#inputRead');
const submitBook = document.querySelector('#submit-book');

function clearFields() {
  authorText.value = '';
  titleText.value = '';
  pagesText.value = '';
  readText.checked = false;
}

submitBook.addEventListener('click', (e) => {
  const title = titleText.value;
  const author = authorText.value;
  const pages = pagesText.value;
  const read = readText.checked;

  for (i = 0; i < myLibrary.length; i++) {
    if (title == myLibrary[i].title) {
      alert('The Book you entered already exist!');
      break;
    }
  }

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  render(myLibrary);
  clearFields();
});

// console.log(myLibrary)

// book.info();
