import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            dbName: "test",  // Ensure correct DB name
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectDB;
