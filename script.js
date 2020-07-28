let myLibrary = [];

let data = getData('library');
if(data){
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    myLibrary.push(element);
  }
  render(myLibrary);
}

function getData(key) {
  if (isStorageAvailable() && isStoragePopulated(key)) {
    let rawValue = window.localStorage.getItem(key);
    let parsedValue = JSON.parse(rawValue);
    return parsedValue;
  }else{
    return false;
  }
}

function setData(key,value) {
  let valueString = JSON.stringify(value);
  if (isStorageAvailable()) {
    window.localStorage.setItem(key,valueString);
  }
}


function isStorageAvailable() {
  try {
    let storage = window.localStorage;
    let test = 'storage_test';
    storage.setItem(test,test);
    storage.removeItem(test);
    return true;
  }
  catch(error) {
    let storage = window.localStorage;
    return error instanceof DOMException && (
    error.code === 22 ||
    error.code === 1014 ||
    error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    (storage && storage.length !== 0);
  }
}

function isStoragePopulated(key) {
  if (window.localStorage.getItem(key) !== null && !undefined){return true}
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  setData('library',myLibrary);
}

function removeFromLibrary(index){
  myLibrary.splice(index,1);
  setData('library',myLibrary);
}


function render(library) {
  let divContainer = document.querySelector('#library-container');
  divContainer.innerHTML = null;

  library.forEach(element => {
    let index = myLibrary.findIndex(x => x.title === element.title);
    let card = document.createElement("div");
    card.innerHTML =`<div id=card>
              ${element.title},
              ${element.author},
              ${element.pages}
              <button class='removeBtnn' id='btn-read-${index}' >${element.read? "Read" : "Not read"}</button>
              <button class='removeBtn' id='btn-remove-${index}' >Remove</button>
              </div>`
  divContainer.appendChild(card);

  const btnRead = document.querySelector(`#btn-read-${index}`);
  btnRead.addEventListener('click', () => {
    element.read = !element.read;
    render(myLibrary);
  });

  const btnRemove = document.querySelector(`#btn-remove-${index}`);
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
const submitBook = document.querySelector('#btn-add'); 


function clearFields() {
  authorText.value = '';
  titleText.value = '';
  pagesText.value = '';
  readText.checked = false;
}

function toggleFunction() {
  var inputForm = document.querySelector("#input-form");
  inputForm.classList.toggle('block')  
}

document.querySelector('#btn-form').addEventListener('click', () =>{
  toggleFunction();
});

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
