const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readToggle = function() {
  this.read = !this.read;
  render(myLibrary);
}

// Book.info = function () {
//   console.log();
// };

function addBookToLibrary(book) {
  myLibrary.push(book);
};

function removeFromLibrary(index){
  myLibrary.splice(index,1);
  console.log(index);
}


function render(library) {
  let divContainer = document.querySelector('#library-container');
  divContainer.innerHTML = null;

  library.forEach(element => {
    let index = myLibrary.findIndex(x => x.title === element.title);
    let card = document.createElement("div");
    card.innerHTML =`<div>
              ${element.title},
              ${element.author},
              ${element.pages},
              <button id='btn-read-${index}' >${element.read? "Read" : "Not read"}</button>,
              <button id='btn-remove-${index}' >Remove</button>
              </div>`
  divContainer.appendChild(card);
  console.log(myLibrary);

  btnRead = document.querySelector(`#btn-read-${index}`);
  btnRead.addEventListener('click', () => {
    element.readToggle();
  });

  btnRemove = document.querySelector(`#btn-remove-${index}`);
  btnRemove.addEventListener('click', () => {
    removeFromLibrary(index);
    render(library);
  });
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
  const author = authorText.value;
  const pages = pagesText.value;
  const read = readText.checked;

  for (let i = 0; i < myLibrary.length; i++) {
    if (title == myLibrary[i].title) {
      alert('The Book you entered already exists!');
     return;
    }
  }

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  render(myLibrary);
  clearFields();
});

// console.log(myLibrary)

// book.info();
