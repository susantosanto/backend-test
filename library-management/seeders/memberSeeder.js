import mongoose from "mongoose";
import Member from "../models/member.model.js";
import connectDB from "../config/db.js";

const members = [
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
];

const seedMember = async () => {
    await connectDB();
    try {
        await Member.deleteMany();
        await Member.insertMany(members);
        console.log('Member seeded successfully');
        process.exit(1);
    } catch (error) {
        console.error('Error seeding member', error);
        process.exit(1);
    }
};

seedMember();