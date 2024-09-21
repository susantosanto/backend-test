import mongoose from "mongoose";
import Book from "../models/books.model.js";
import connectDB from "../config/db.js";

const books = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
];

const seedBooks = async () => {
    await connectDB();
    try {
        await Book.deleteMany();
        await Book.insertMany(books);
        console.log('Book seeded successfully');
        process.exit(1);
    } catch (error) {
        console.error('Error seeding Books', error);
        process.exit(1);
    }
};

seedBooks();