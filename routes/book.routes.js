const express = require("express");
const router = express.Router();

var bookController = require("../controllers/book/book.controller");

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
