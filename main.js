/* eslint-disable no-use-before-define */
const LOCAL_STORAGE_BOOK_KEY = 'book.library';

let bookArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BOOK_KEY)) || [];
const library = document.getElementById('library');
// const library = document.createElement('div');
// library.setAttribute('id', 'library');
// main.append(library);
const inputTitle = document.querySelector('[data-input-book-title]');
const inputAuthor = document.querySelector('[data-input-book-author]');
const inputPages = document.querySelector('[data-input-book-pages]');
const inputRead = document.querySelector('[data-input-book-read]');
const addBookBtn = document.getElementById('addBookBtn');
const bookTemplate = document.getElementById('book-template');
const form = document.querySelector('[data-form]');
const counter = document.getElementById('counter');

function createBook(title, author, pages) {
  return {
    title, author, pages, id: Math.random() * Date.now(), complete: Boolean(true || false),
  };
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_BOOK_KEY, JSON.stringify(bookArray));
}

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const complete = inputRead.toString();
  const books = createBook(title, author, pages, complete);
  bookArray.push(books);
  form.reset();
  clearElement(library);
  saveAndRender();
});

function render() {
  clearElement(library);
  bookArray.forEach((book) => {
    const bookElement = document.importNode(bookTemplate.content, true);
    const checkbox = bookElement.querySelector('input');
    const label = bookElement.querySelector('label');
    checkbox.id = book.id;
    checkbox.checked = book.complete;
    const titleDiv = bookElement.querySelector('.title');
    const authorDiv = bookElement.querySelectorAll('div')[2];
    const pagesDiv = bookElement.querySelectorAll('div')[3];
    label.htmlFor = book.id;
    titleDiv.append(`Title: ${book.title}`);
    authorDiv.append(`Author: ${book.author}`);
    pagesDiv.append(`${book.pages} pages`);
    if (book.complete === true) {
      label.textContent = 'Read';
    } else {
      label.textContent = 'Not Read';
    }
    library.append(bookElement);
  });
}

library.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    // eslint-disable-next-line eqeqeq
    const targetBook = bookArray.find((book) => book.id == e.target.id);
    targetBook.complete = e.target.checked;
    saveAndRender();
  }
});

function saveAndRender() {
  render();
  save();
  bookCounter();
}
function bookCounter() {
  const booksRead = document.createElement('div');
  clearElement(counter);
  let notReadCounter = bookArray.filter((book) => !book.complete);
  booksRead.textContent = `You have read ${bookArray.length - notReadCounter.length}
  books in your library and ${notReadCounter.length} books haven't been read`;
  counter.append(booksRead);
}
saveAndRender();
