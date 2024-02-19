const db = require("../../db/db");

const createBook = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        result: "Not found title",
      });
    }

    if (!req.body.subtitle) {
      return res.status(400).json({
        result: "Not found subtitle",
      });
    }

    let title = req.body.title;
    let subtitle = req.body.subtitle;

    const result = await db.query(
      "INSERT INTO books.books (title, subtitle, created_at) VALUES ($1, $2, $3) RETURNING *",
      [title, subtitle, "now()"]
    );
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ result: `Book added with ID: ${result.rows[0].book_id}` });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw error;
  }
};

const getBooks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books.books");
    if (result.rowCount > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw error;
  }
};

const getBookById = async (req, res) => {
  try {
    let id = req.params.id;

    const result = await db.query(
      "select * from books.books where book_id=$1",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        result: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw error;
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).send(``);
    }

    let id = req.params.id;

    const result = await db.query(
      `DELETE FROM books.books
        WHERE book_id=$1`,
      [id]
    );
    if (result.rowCount > 0) {
      return res.status(200).json({ result: `Book id: ${id} deleted success` });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw error;
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  deleteBook,
};
