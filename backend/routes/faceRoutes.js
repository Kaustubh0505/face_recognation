import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    const { userId, descriptor } = req.body;

    const existingFace = await prisma.faceEmbedding.findFirst({
      where: { userId },
    });

    if (existingFace) {
      return res.status(400).json({ msg: "User already registered" });
    }

    await prisma.faceEmbedding.create({
      data: {
        userId,
        embedding: JSON.stringify(descriptor),
      },
    });
    res.json({ msg: "Face saved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/check/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const face = await prisma.faceEmbedding.findFirst({
      where: { userId },
    });

    if (face) {
      return res.json({ registered: true });
    } else {
      return res.json({ registered: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const faces = await prisma.faceEmbedding.findMany();
    res.json(faces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;