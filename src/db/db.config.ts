import mongoose from "mongoose";

export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("mongodb connect successfully!");
        });

        connection.on("disconnected", () => {
            console.log("mongodb disconnected!");
        });

        connection.on("error", (error: Error) => {
            console.log("mongodb connection error!", error);
            process.exit(1);
        });

    } catch (error) {
        console.log("mongoDB connection failed :", error);
        process.exit(1);
    }
};