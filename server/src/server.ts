import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

const connectDB = async () => {
    // await mongoose.connect('mongodb://localhost:27017/noter', {
    await mongoose.connect(process.env.MONGO_URI, {
    });

    console.log('MongoDB connected')
};

connectDB();


const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));