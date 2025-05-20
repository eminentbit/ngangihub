import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  joinDate: Date,
});

const User = mongoose.model("User", userSchema);

// Sample BOD user data
const bodUsers = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    password: "hashedPassword123",
    role: "bod",
    joinDate: new Date("2022-01-01"),
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    password: "hashedPassword123",
    role: "bod",
    joinDate: new Date("2022-01-02"),
  },
  {
    name: "Michael Brown",
    email: "michael.b@example.com",
    password: "hashedPassword123",
    role: "bod",
    joinDate: new Date("2022-01-03"),
  },
  {
    name: "Lisa Davis",
    email: "lisa.d@example.com",
    password: "hashedPassword123",
    role: "bod",
    joinDate: new Date("2022-01-04"),
  },
  {
    name: "Robert Wilson",
    email: "robert.w@example.com",
    password: "hashedPassword123",
    role: "bod",
    joinDate: new Date("2022-01-05"),
  },
];

// Connect to MongoDB and insert data
mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");
    try {
      await User.insertMany(bodUsers);
      console.log("Successfully inserted 5 BOD users");
    } catch (error) {
      console.error("Error inserting BOD users:", error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
