import express from "express";
import { borrowBook, getMember, returnBook } from "../controllers/memberController.js";

const memberRouter = express.Router();

/**
 * @swagger
 * /member/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Borrow a book by providing the member ID and book ID. Maximum 2 books can be borrowed at a time.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: ID of the member borrowing the book
 *                 example: "6149f97b2245b13d7b4a7b3e"
 *               bookId:
 *                 type: string
 *                 description: ID of the book being borrowed
 *                 example: "6149f97b2245b13d7b4a7b3f"
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successfully:
 *                   type: string
 *                   example: "Book borrowed successfully"
 *       400:
 *         description: Bad request, for example, if the member has borrowed the maximum number of books or if the book is unavailable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Max 2 books can be borrowed"
 *       404:
 *         description: Member or Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Member not found"
 */
memberRouter.post('/borrow', borrowBook);

/**
 * @swagger
 * /member/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a member to return a borrowed book. If the book is returned late, the member will receive a penalty.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: ID of the member returning the book
 *                 example: "6149f97b2245b13d7b4a7b3e"
 *               bookId:
 *                 type: string
 *                 description: ID of the book being returned
 *                 example: "6149f97b2245b13d7b4a7b3f"
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Date the book is returned
 *                 example: "2024-09-15"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "Book returned successfully"
 *       400:
 *         description: Bad request, if the book was not borrowed by the member or is already returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Book was not borrowed by this member"
 *       404:
 *         description: Member or Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Member not found"
 */
memberRouter.post('/return', returnBook);

/**
 * @swagger
 * /member:
 *   get:
 *     summary: Get all members
 *     description: Retrieve the list of all library members, including the books they have borrowed.
 *     responses:
 *       200:
 *         description: A list of members with their borrowed books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Member's unique ID
 *                     example: "6149f97b2245b13d7b4a7b3e"
 *                   code:
 *                     type: string
 *                     description: Member's unique code
 *                     example: "MB001"
 *                   name:
 *                     type: string
 *                     description: Member's name
 *                     example: "John Doe"
 *                   borrowedBooks:
 *                     type: array
 *                     description: List of books borrowed by the member
 *                     items:
 *                       $ref: '#/components/schemas/Book'
 *                   penaltyEndDate:
 *                     type: string
 *                     format: date
 *                     description: End date for penalty (if applicable)
 *                     example: "2024-09-20"
 *       500:
 *         description: Internal server error
 */
memberRouter.get('/', getMember);

export default memberRouter;