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
  let divContainer = document.querySelector('#library-container');
  divContainer.innerHTML = null;
  library.forEach(element => {
    let card = document.createElement("div");
    card.innerHTML =`<div>
              ${element.title},
              ${element.author},
              ${element.pages},
              ${element.read}
              </div>`
  divContainer.appendChild(card);
  });
}

const titleText = document.querySelector('#input-title');
const authorText = document.querySelector('#input-author');
const pagesText = document.querySelector('#input-pages');
const readText = document.querySelector('#input-read');
const submitBook = document.querySelector('#btn-add'); //Changed to consistant id naming

function clearFields() {
  authorText.value = '';
  titleText.value = '';
  pagesText.value = '';
  readText.checked = false;
}

submitBook.addEventListener('click', () => {
  const title = titleText.value;
  console.log(title);
  const author = authorText.value;
  const pages = pagesText.value;
  const read = readText.checked;

  for (let i = 0; i < myLibrary.length; i++) {
    if (title == myLibrary[i].title) {
      alert('The Book you entered already exists!');
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
