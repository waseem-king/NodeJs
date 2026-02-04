Create a library system that manages books, members, and borrowing/returning operations using Object-Oriented Programming principles.
Requirements
1. Core Classes
Book
Properties: isbn, title, author, genre, totalCopies, availableCopies
Methods: isAvailable(), borrowCopy(), returnCopy()Member
Properties: id, name, email, membershipDate, borrowedBooks[]
Methods: borrow(book), return(book), getBorrowedBooks(), hasBorrowed(book)Constraint: Maximum 3 books at a timeTransaction
Properties: id, member, book, borrowDate, dueDate, returnDate, status
Methods: isOverdue(), getDaysOverdue(), calculateFine()Fine: RS: 100 per day overdue

2. Library Class (Main Controller)
3. Search Functionality
The searchBooks() method should support filtering by:
title (partial match, case-insensitive)author (partial match, case-insensitive)genre (exact match)available (boolean — only books with copies available)Multiple filters should work together (AND logic).
4. Custom Errors
Create and throw these custom error classes:
BookNotFoundErrorMemberNotFoundErrorBookNotAvailableErrorBorrowLimitExceededErrorBookNotBorrowedError (when returning a book not borrowed)Constraints
Use ES6 classes with proper inheritance
Use encapsulation where appropriate
Due date is 14 days from borrow date
Member cannot borrow the same book twice simultaneouslyGenerate unique transaction IDs automatically.

// this is solution
class Book{
    constructor(isbn, title, author, genre, totalCopies){
        let _isbn = isbn;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.totalCopies = totalCopies;
        this.availableCopies = totalCopies;
    }
    isAvailable(){
        if(this.availableCopies>0){
            return true;
        }else{
            return false;
        }
    } 
    borrowCopy(){
        if(this.availableCopies>0){
            this.availableCopies--;
            return `Book has been borrowed`;
        }else{
            return `Book is not Available`;
        }
    } 
    returnCopy(){
        this.totalCopies++;
        return `Book is returned back successfully`;
    }
}


//////////////////////////////////////////
class Member{
    constructor(id, name, email, membershipDate){
        this.id = id;
        this.name = name;
        this.email = email;
        this.membershipDate = membershipDate;
        this.borrowedBooks = [];
    }
    borrow(book){
        this.borrowedBooks.push(book);
        return true;
    }
    returned(book){
        const index = this.borrowedBooks.findIndex(b=>b.isbn===book.isbn)
        if(index!==-1){
            this.borrowedBooks.splice(index, 1)
             return true;
        }else{
            return false;
        }
       
    }
    getBorrowedBooks(){
        return this.borrowedBooks;
    }
    hasBorrowed(book){
        return this.borrowedBooks.some((b)=> b.id===book.id)
    }
}

////////////////////////////////////////////
class Transaction{
    static uniqueId = 0;
    constructor(member, book,){
        this.id = Transaction.uniqueId++;
        this.member = member;
        this.book = book;
        this.borrowDate = new Date();
        this.dueDate = this.borrowDate.getTime() * 14 * 24 * 60 * 60 * 1000;
        this.returnDate = null;
        this.statuss = "Borrowed"; 
    }
    // the time when book is returned
    returnBookDate(){
        this.statuss = "Returned";
        return this.returnDate = new Date();
    }
    isOverdue(){
        return  this.returnDate > this.dueDate;
    } 
    getDaysOverdue(){
        const diff = this.returnDate - this.dueDate;
        if(diff<0) return 0
        return Math.ceil(diff/(1000 * 60 * 60 * 24))
    }
    calculateFine(){
        return this.getDaysOverdue() * 100;
    }
}

/////////////////////////////////////////////////
class BookNotFoundError extends Error{
    
}
class MemberNotFoundError extends Error{
    
}
class BookNotAvailableError extends Error{
    
}
class BorrowLimitExceededError extends Error{
    
}
class BookNotBorrowedError extends Error{
    
}

/////////////////////////////////////////
class Library{
    constructor(books, members, transactions){
        this.books = books;
        this.members = members;
        this.transactions =transactions ;
        this.limit = 0;
    }
    searchBooks(query){
        if(!query) return;
        return this.books.some(
            (b)=>
           b.title.toLowerCase() === query.toLowerCase() || 
            b.isbn === query
            )
    }
    findBook(isbn){
         const book = this.books.find((b)=>b.isbn === isbn);
        if(!book){
            throw new BookNotFoundError("Book not found")
        } else{
            return book;
        }
    }
    addBook(book){
        this.books.push(book)
    }
    addMember(member){
        this.members.push(member)
    }
    findMember(memId){
            const member = this.members.find((m)=>(m.id === memId));
        if(!member){
            throw new MemberNotFoundError("Member not found")
        } else{
            return member;
        }
    }
    borrowLimit(){
        if(this.limit<=3 && this.limit>0){
            return true;
        }else{
            return false;
        }
    }
    borrowBook(memId, isbn) {
    const m = this.findMember(memId);
    const b = this.findBook(isbn);

    // Check if book is actually available
    if (!b.isAvailable()) {
        throw new BookNotAvailableError("No copies left");
    }

    // Check member's personal limit (usually members can't have > 3 books)
    if (m.borrowedBooks.length >= 3) {
        throw new BorrowLimitExceededError("Exceed the limit of 3 books");
    }

    // Create the transaction object here
    const transaction = new Transaction(m, b);
    this.transactions.push(transaction);
    
    // Update the objects
    m.borrow(b);
    b.borrowCopy();
}
    returnBorrowBook(memId, isbn) {
    const member = this.findMember(memId);
    const book = this.findBook(isbn);

    if (!member.hasBorrowed(book)) {
        throw new BookNotBorrowedError("This member does not have this book");
    }

    // Find the specific transaction for this member and book
    const transaction = this.transactions.find(t => 
        t.member.id === memId && t.book.isbn === isbn && t.statuss === "Borrowed"
    );

    if (transaction) {
        transaction.returnBookDate(); // Sets the return date
        if (transaction.isOverdue()) {
            const fine = transaction.calculateFine();
            console.log(`Overdue! Fine to pay: ${fine}`);
        }
    }

    // Update status
    book.availableCopies++; // Use the method you wrote in Book class
    member.returned(book);
}

}

// create some books
const physics = new Book("123p", "Physics", "Newton", "Science", 4);
const english = new Book("123e", "English", "Waseem", "English Litrature", 3);
const urdu = new Book("123u", "Urdu", "Galib", "Poetry", 2);

console.log(`${physics.isAvailable()} yes book is available`)
console.log(`${physics.borrowCopy()}`)
console.log(`${ physics.returnCopy()}`)

// create some members
const waseem = new Member("123w", "waseem", "waseem@gmail.com", new Date("15 feb 2023"));
const tahir = new Member("123t", "Tahir", "tahir@gmail.com", new Date("11 march 2018"));
const ali = new Member("123a", "Ali", "ali@gmail.com", new Date("10 june 2003"));
console.log(`${waseem.borrow(urdu)}Book is borrowed successfully`)
console.log(`${waseem.borrow(physics)} Book is borrowed successfully`)
console.log(`${waseem.borrow(physics)} Book is borrowed successfully`)
console.log(`${waseem.borrow(physics)} Book is borrowed successfully`)
console.log(`${waseem.returned(physics)} Book is returned back successfully`)
console.log(`${waseem.returned(english)} Book does not exist user record`)
waseem.getBorrowedBooks().forEach((i)=>console.log(i))
// waseem.getBorrowedBooks()
console.log(`${waseem.hasBorrowed(physics)} yes user has borrowed this book`)
// waseem.hasBorrowed(physics)


////// now we will make some transactions
const t1 = new Transaction(waseem , english);
const t2 = new Transaction(waseem , physics);
console.log(`${t1.returnBookDate()} book is returned back at this date`)
console.log(`${t1.isOverdue()} book is not over dued`);
console.log(`${t1.getDaysOverdue()} days the book is given late`);
console.log(`${t1.calculateFine()} RS ruppes fine you have to pay.`);

// now i need to test library class
const okaraLibrary = new Library([physics, english , urdu], [ waseem, tahir, ali], [t1, t2])
console.log(`${okaraLibrary.searchBooks("Physics")} yes book present in the library`)
console.log(`${okaraLibrary.searchBooks("123p")} yes book present in the library`)

okaraLibrary.borrowBook('123w', '123e');
okaraLibrary.returnBorrowBook();
