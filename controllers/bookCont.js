const Book = require('../models/books');
// ALESSA MOLA
function createBook(req, res) {
  console.log(req.body);
  const book = new Book({
    titulo: req.body.titulo,
    isbn: req.body.isbn,
    descripcion: req.body.descripcion,
    autor: req.body.autor,
    fechapublicacion: req.body.fechapublicacion,
    precio: req.body.precio,
    editorial: req.body.editorial,
  });

  book.save((err, savedbook) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });
    return res.status(200).send({ message: 'Libro guardado', savedbook });
  });
}

function getallBooks(req, res) {
  Book.find({}, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No hay libros' });

    return res.status(200).send(book);
  });
}

function getBookbyTitle(req, res) {
  Book.find({ titulo: req.params.titulo }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function getBookbyISBN(req, res) {
  Book.find({ isbn: req.params.isbn }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function getBookbyDescripcion(req, res) {
  Book.findOne({ descripcion: req.params.descripcion }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function getBookbyAutor(req, res) {
  Book.find({ autor: req.params.autor }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function getBookbyFechapubli(req, res) {
  Book.find({ fechapublicacion: req.params.fechapublicacion }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function getBookbyPrecio(req, res) {
  Book.find({ precio: req.params.precio }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function getBookbyEditorial(req, res) {
  Book.find({ editorial: req.params.editorial }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'No existe libro' });
    return res.status(200).send(book);
  });
}

function updateBook(req, res) {
  const update = req.body;

  Book.findOneAndUpdate({ titulo: req.params.titulo }, update, { new: true }, (err, bookUpdate) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!bookUpdate) return res.status(400).send({ message: 'no existe el libro' });
    return res.status(200).send({ message: 'Usario actualizado', bookUpdate });
  });
}

function deleteBookbyTitle(req, res) {
  Book.findOneAndDelete({ titulo: req.params.titulo }, (err, book) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!book) return res.status(404).send({ message: 'Libro no encontrado' });

    return res.status(200).send({ message: 'Libro borrado', book });
  });
}

module.exports = {
  createBook,
  getallBooks,
  getBookbyTitle,
  getBookbyISBN,
  getBookbyDescripcion,
  getBookbyAutor,
  getBookbyFechapubli,
  getBookbyPrecio,
  getBookbyEditorial,
  updateBook,
  deleteBookbyTitle,
};
