const mongoose = require("mongoose");
let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Placed",
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDB };
