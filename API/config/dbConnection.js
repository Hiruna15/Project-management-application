import mongoose from "mongoose";

const connectDB = async (URI) => {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
  await mongoose.connect(URI, clientOptions);
};

export default connectDB;
