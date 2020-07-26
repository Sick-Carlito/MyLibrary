const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeFromLibrary(element){
  let index = myLibrary.findIndex(x => x.title === element.title);
  myLibrary.splice(index,1);
  console.log(index);
}

function render(library) {
  let divContainer = document.querySelector('#library-container');
  divContainer.innerHTML = null;

  library.forEach(element => {
    let card = document.createElement("div");
    card.innerHTML =`<div id=card>
              ${element.title},
              ${element.author},
              ${element.pages},
              ${element.read},
              <button class='removeBtn'id='${element.title}Remove' >Remove</button>
              </div>`
  divContainer.appendChild(card);

  btnRemove = document.querySelector(`#${element.title}Remove`);
  btnRemove.addEventListener('click', () => {
    removeFromLibrary(element);
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
  const read = readText.checked? "Read" : "Not read";

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
