import mongoose from "mongoose";

export async function connect() {
  try {
    const connectionUrl = process.env.MONGODB_URL;
    if (!connectionUrl) {
      throw new Error("Please add mongodb connection url in .env file");
    }
    mongoose.connect(connectionUrl);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
