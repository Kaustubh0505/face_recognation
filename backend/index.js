import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import faceRoutes from "./routes/faceRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();


app.use(cors({
  origin: [
    "https://face-recognation-omega.vercel.app",
    "http://20.189.75.255:3000",
    "http://localhost:3001"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/face", faceRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Backend + Prisma is connected!");
});

// Signup Route

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPass,
      },
    });

    return res.status(201).json({ message: "User created successfully!" });

  } catch (err) {
    console.error("Signup error:", err); // 🔍 Add this
    return res.status(500).json({ message: "Server error!" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    console.log("Request Body:", req.body);


    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Compare Result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET_KEY ? "Loaded" : "Missing");
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    console.log("check 5 ")
    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "312Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
