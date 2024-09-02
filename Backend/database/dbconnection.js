import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose
        .connect(process.env.MONOGO_URI, {
            dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
        })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log(`Error connecting database: ${err}`);
        });
};
