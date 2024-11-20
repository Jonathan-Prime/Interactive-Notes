import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect("URI", {
    // mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    //  autoIndex: false ,
    // useCreateIndex: true,
    // useUnfiedTopology: true,
    // useFindAndModified:true
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
