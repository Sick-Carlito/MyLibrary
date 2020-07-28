let myLibrary = [];
let storageAvailable = isStorageAvailable();
let storagePopulated = isStoragePopulated();

let data = getData('library');
if(data){
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    myLibrary.push(element);
  }
  console.log(myLibrary,'getdata library');
  render(myLibrary);
}else{
  console.log('no data');
}

function getData(key) {
  if (isStorageAvailable() && isStoragePopulated(key)) {
    let rawValue = window.localStorage.getItem(key);
    console.log(rawValue,"rawValue")
    let parsedValue = JSON.parse(rawValue);
    console.log(parsedValue,"parsedValue")
    return parsedValue;
  }else{
    console.log('local storage not utilized')
    return false;
  };
};

function setData(key,value) {
  let valueString = JSON.stringify(value);
  if (storageAvailable) {
    window.localStorage.setItem(key,valueString);
    console.log(key, valueString,'Item set');
  };
  console.log(value, valueString);
};


function isStorageAvailable() {
  try {
    let storage = window.localStorage;
    let test = 'storage_test';
    storage.setItem(test,test);
    storage.removeItem(test);
    return true;
  }
  catch(error) {
    return error instanceof DOMException && (
    error.code === 22 ||
    error.code === 1014 ||
    error.name === 'QuotaExceededError' ||
    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    (storage && storage.length !== 0);
  }
};

function isStoragePopulated(key) {
  if (window.localStorage.getItem(key) !== null && !undefined){return true}
};

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

function addBookToLibrary(book) {
  myLibrary.push(book);
  setData('library',myLibrary);
}

function removeFromLibrary(index){
  myLibrary.splice(index,1);
  console.log(useLocalStorage, myLibrary);
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
  console.log(myLibrary);

  const btnRead = document.querySelector(`#btn-read-${index}`);
  btnRead.addEventListener('click', () => {
    element.readToggle();
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
