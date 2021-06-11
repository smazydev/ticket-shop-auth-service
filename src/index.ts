import {app} from "./app";
import mongoose from "mongoose";

const startConnection = async () => {

  //Checking if secret JWT_KEY exists or not
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined")
  }
  //Establish Database Connection
  try {
    await mongoose.connect("mongodb://auth-mongo-service:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected")
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000!!!!!!!!!!");
  });
};

startConnection();