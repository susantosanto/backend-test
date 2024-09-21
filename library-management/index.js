import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter.js";
import connectDB from "./config/db.js";
import memberRouter from "./routes/memberRouter.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/book', bookRouter);
app.use('/member', memberRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(process.env.PORT, () => console.log(`Server running at port 3001`));