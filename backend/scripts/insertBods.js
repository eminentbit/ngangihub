import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
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
    password: "hashedPassword456",
    role: "bod",
    joinDate: new Date("2022-02-15"),
  },
  {
    name: "Michael Chen",
    email: "m.chen@example.com",
    password: "hashedPassword789",
    role: "bod",
    joinDate: new Date("2022-03-10"),
  },
  {
    name: "Emily Rodriguez",
    email: "e.rodriguez@example.com",
    password: "hashedPasswordABC",
    role: "bod",
    joinDate: new Date("2022-04-20"),
  },
  {
    name: "David Kim",
    email: "d.kim@example.com",
    password: "hashedPasswordDEF",
    role: "bod",
    joinDate: new Date("2022-05-05"),
  },
  {
    name: "Lisa Wong",
    email: "l.wong@example.com",
    password: "hashedPasswordGHI",
    role: "bod",
    joinDate: new Date("2022-06-15"),
  },
];

// Hash passwords and insert users
async function insertUsersWithHashedPasswords() {
  const saltRounds = 10;

  // Hash passwords for all users
  const usersWithHashedPasswords = await Promise.all(
    bodUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, saltRounds),
    }))
  );

  // Connect and insert users
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    await User.insertMany(usersWithHashedPasswords);
    console.log("Successfully inserted 5 BOD users");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the insertion
insertUsersWithHashedPasswords();
