let headLine,inputBox,sumbitButton,booksContainer;
let booksList = [];
let id=1;

class Book{
  constructor(name,author,year,id){
    
    this.id=id;
    this.container=MyCreateElement('container','div');
    this.name=MyCreateElement('feild','div');
    this.name.textContent="name: "+name;
    this.author=MyCreateElement('feild','div');
    this.author.textContent="author: "+author;
    this.year=MyCreateElement('feild','div');
    this.year.textContent="year: "+year;
    this.isAvialble=true;
    this.isAvialbleT=MyCreateElement('feild','div');
    this.isAvialbleT.textContent="is avialble: "+this.isAvialble;

    this.delete = MyCreateElement('delete','div');
    this.delete.textContent="delete";
    this.delete.addEventListener('click',(event) => {
      delete2(this);
    });

    this.borrow = MyCreateElement('borrow','div');
    this.borrow.textContent="borrow";
    this.borrow.addEventListener('click',(event) => {
      borrow(this);
    });
    
  }
}

function MyCreateElement(id,tpye){
  element = document.createElement(tpye);
  element.id=id;
  return element;
}

function printBook(book){

  book.container.appendChild(book.name);
  book.container.appendChild(book.author);
  book.container.appendChild(book.year);
  book.container.appendChild(book.isAvialbleT);
  book.container.appendChild(book.delete);
  book.container.appendChild(book.borrow);
  booksContainer.appendChild(book.container);

}

function sumbit(){
  const boxName=document.getElementById('inputBoxName').value;
  const boxAuthor=document.getElementById('inputBoxAuthor').value;
  const boxYear=document.getElementById('inputBoxYear').value;
  const newBook = new Book(boxName,boxAuthor,boxYear,id);
  id++;
  booksList.push(newBook);
  printBook(newBook);
}
function borrow(book){
  if(book.isAvialble){
    book.isAvialble=false;
    book.borrow.textContent="return";
  }
  else{
    book.isAvialble=true;
    book.borrow.textContent="borrow";
  }
  book.isAvialbleT.textContent="is avialble: "+book.isAvialble;
}
function delete2(book){
  booksList = booksList.filter((arrBook) => arrBook.id !== book.id);
  booksContainer.removeChild(book.container);
}
function search(){
  booksContainer.innerHTML = "";
  const name=document.getElementById('search').value;
  const author=document.getElementById('search2').value;
  
  const books = booksList.filter((arrBook) => arrBook.name.textContent.substring(5).includes(name) &&
                                              arrBook.author.textContent.substring(7).includes(author) );
  console.log(books.length);
  return books;
}

inputBoxName = MyCreateElement("inputBoxName",'input');
inputBoxName.placeholder="Enter book name";
inputBoxAuthor = MyCreateElement("inputBoxAuthor",'input');
inputBoxAuthor.placeholder="Enter book author";
inputBoxYear = MyCreateElement("inputBoxYear",'input');
inputBoxYear.placeholder="Enter book year";
document.body.appendChild(inputBoxName);
document.body.appendChild(inputBoxAuthor);
document.body.appendChild(inputBoxYear);
sumbitButton = MyCreateElement("sumbitButton",'div');
sumbitButton.textContent = "sumbit";
sumbitButton.addEventListener('click',function (event){
  sumbit();
});
document.body.appendChild(sumbitButton);

inputSearch = MyCreateElement("search",'input');
inputSearch.placeholder="Enter book name";
inputSearchA = MyCreateElement("search2",'input');
inputSearchA.placeholder="Enter author name";
document.body.appendChild(inputSearch);
document.body.appendChild(inputSearchA);
searchButton = MyCreateElement("searchButton",'div');
searchButton.textContent = "search";
searchButton.addEventListener('click',function (event){
  
  search().forEach((book)=>{
    printBook(book);
  });
});
document.body.appendChild(searchButton);

booksContainer=MyCreateElement("booksContainer",'div');
document.body.appendChild(booksContainer);

