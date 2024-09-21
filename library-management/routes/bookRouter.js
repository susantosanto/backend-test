import express from "express";
import { getBook } from "../controllers/bookController.js";

const bookRouter = express.Router();

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Get all books
 *     description: Retrieve the list of all books available in the library.
 *     responses:
 *       200:
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Book's unique ID
 *                     example: "6149f97b2245b13d7b4a7b3e"
 *                   code:
 *                     type: string
 *                     description: Book's unique code
 *                     example: "BK001"
 *                   title:
 *                     type: string
 *                     description: Title of the book
 *                     example: "The Catcher in the Rye"
 *                   author:
 *                     type: string
 *                     description: Author of the book
 *                     example: "J.D. Salinger"
 *                   stock:
 *                     type: number
 *                     description: Number of available copies in the library
 *                     example: 5
 *       500:
 *         description: Internal server error
 */
bookRouter.get('/', getBook);

export default bookRouter;