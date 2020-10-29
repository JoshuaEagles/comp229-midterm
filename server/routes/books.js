// books.js - Joshua Eagles - 301078033 - COMP229-F2020-Midterm-301078033
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
	res.render('books/details', {title:"Add a Book", books: {}});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
	let newBook = book({
		Title: req.body.title,
		Price: req.body.price,
		Author: req.body.author,
		Genre: req.body.genre,
	});

	book.create(newBook);

	res.redirect('/books');
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
	let id = req.params.id;

	book.findById(id, (err, targetBook) => {
		res.render('books/details', {title:"Edit a Book", books: targetBook});
	});
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
	let id = req.params.id;

	let editedBook = book({
		_id: id,
		Title: req.body.title,
		Price: req.body.price,
		Author: req.body.author,
		Genre: req.body.genre,
	});

	book.update({_id: id}, editedBook, (err) => {
		res.redirect('/books');
	});
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
	let id = req.params.id;

	book.deleteOne({_id: id}, (err) => {
		res.redirect('/books');
	});
});


module.exports = router;
