import mongoose from "mongoose";

interface Opotions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDB {
  static async connect(options: Opotions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      return true;
    } catch (error) {
      console.log("Mongo Connection Error");
      throw error;
    }
  }
}
