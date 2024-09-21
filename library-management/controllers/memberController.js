import Member from "../models/member.model.js";
import Book from "../models/books.model.js";

export const borrowBook = async (req, res) => {
    const { memberId, bookId } = req.body;
    try {
        const member = await Member.findById(memberId);
        const book = await Book.findById(bookId);
        if (!member) return res.status(404).json({ error: 'Member not found ..' });
        if (!book) return res.status(404).json({ error: 'Book not found ..' });
        if (member.borrowedBooks.length > 2) return res.status(400).json({ error: 'Max 2 books can be borrowed' });
        if (book.stock === 0) return res.status(400).json({ error: 'Book not available' });
        if (member.penaltyEndDate && member.penaltyEndDate > new Date()) return res.status(400).json({ error: 'member is penalized' });
        book.stock--;
        member.borrowedBooks.push(book);
        await member.save();
        await book.save();
        res.status(200).json({ successfully: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const returnBook = async (req, res) => {
    const { memberId, bookId, returnDate } = req.body;
    try {
        const member = await Member.findById(memberId).populate('borrowedBooks');
        const book = await Book.findById(bookId);
        const borrowedBook = member.borrowedBooks.find(b => b.code === bookId);
        if (!borrowedBook) return res.status(400).json({ error: 'Book was not borrowed by this member' });
        const borrowDate = new Date(borrowedBook.borrowedDate);
        if ((new Date(returnDate) - borrowDate) / (1000 * 60 * 60 * 24) > 7) {
            member.penaltyEndDate = new Date(new Date().setDate(new Date().getDate() + 3));
        }

        member.borrowedBooks = member.borrowedBooks.filter(b => b.code !== bookId);
        book.stock++;
        await book.save();
        await member.save();
        res.status(200).json({ success: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMember = async (req, res) => {
    try {
        const member = await Member.find().populate('borrowedBooks');
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};