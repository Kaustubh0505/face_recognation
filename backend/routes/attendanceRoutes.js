import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/mark", async (req, res) => {
  try {
    const { userId, descriptor } = req.body;

    if (!userId || !descriptor) {
      return res.status(400).json({ msg: "UserId and Face Descriptor required" });
    }

    // 1. Check if user has a registered face
    const faceRecord = await prisma.faceEmbedding.findFirst({
      where: { userId },
    });
    
    if (!faceRecord) {
      return res.status(400).json({ msg: "Face not registered for this user" });
    }
    console.log("face",faceRecord)
    
    // 2. Verify Face Match (Euclidean Distance)
    const storedDescriptor = JSON.parse(faceRecord.descriptor);
    console.log("check")
    const distance = euclideanDistance(descriptor, storedDescriptor);

    if (distance > 0.6) { // Threshold (0.6 is standard for face-api.js)
      return res.status(400).json({ msg: "Face mismatch — attendance not allowed" });
    }

    // 3. Prevent multiple attendance in same day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const alreadyMarked = await prisma.attendance.findFirst({
      where: {
        userId,
        timestamp: { gte: startOfDay },
      },
    });

    if (alreadyMarked) {
      return res.json({ msg: "Attendance already marked today!" });
    }

    await prisma.attendance.create({
      data: {
        userId,
        status: "Present"
      },
    });

    return res.json({ msg: "Attendance Marked" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get attendance history for a user
router.get("/history/:userId", async (req, res) => {

  try {
    const { userId } = req.params;

    const attendanceRecords = await prisma.attendance.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      select: {
        id: true,
        status: true,
        timestamp: true,
      },
    });

    return res.json(attendanceRecords);

  } catch (err) {

    console.error(err);


    res.status(500).json({ msg: "Server Error" });
  }
});

// Get attendance summary statistics for a user
router.get("/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const allRecords = await prisma.attendance.findMany({
      where: { userId },
    });

    const summary = {
      totalPresent: allRecords.filter(r => r.status === "Present").length,
      totalAbsent: allRecords.filter(r => r.status === "Absent").length,
      totalLate: allRecords.filter(r => r.status === "Late").length,
      totalDays: allRecords.length,
    };

    return res.json(summary);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

function euclideanDistance(arr1, arr2) {
  if (arr1.length !== arr2.length) return 1.0; // Mismatch length = max distance
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += (arr1[i] - arr2[i]) ** 2;
  }
  return Math.sqrt(sum);
}

export default router;
