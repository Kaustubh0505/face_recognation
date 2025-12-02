import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ===== STUDENT MANAGEMENT =====

// Get all students with optional pagination and search
router.get("/students", async (req, res) => {
    try {
        const { page = 1, limit = 100, search = "" } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = search
            ? {
                email: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : {};

        const [students, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    role: true,
                    faceData: {
                        select: {
                            id: true,
                            createdAt: true,
                        },
                    },
                },
                skip,
                take: parseInt(limit),
                orderBy: { email: "asc" },
            }),
            prisma.user.count({ where }),
        ]);

        // Transform data to include name from email and check if face is registered
        const transformedStudents = students.map(student => ({
            id: student.id,
            name: student.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            email: student.email,
            class: student.role || "Not Assigned",
            rollNo: `ROLL${student.id.slice(-6).toUpperCase()}`,
            hasFaceData: student.faceData && student.faceData.length > 0,
        }));

        res.json({
            students: transformedStudents,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
        });

    } catch (err) {
        console.error("Get students error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// Get single student details
router.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const student = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                faceData: {
                    select: {
                        id: true,
                        createdAt: true,
                    },
                },
                attendance: {
                    select: {
                        id: true,
                        status: true,
                        timestamp: true,
                    },
                    orderBy: { timestamp: "desc" },
                },
            },
        });

        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        const transformed = {
            id: student.id,
            name: student.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            email: student.email,
            class: student.role || "Not Assigned",
            rollNo: `ROLL${student.id.slice(-6).toUpperCase()}`,
            hasFaceData: student.faceData && student.faceData.length > 0,
            attendanceRecords: student.attendance,
        };

        res.json(transformed);

    } catch (err) {
        console.error("Get student error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});


router.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { email, role } = req.body;

        const updateData = {};
        if (email) updateData.email = email;
        if (role !== undefined) updateData.role = role;

        const updatedStudent = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        res.json({
            msg: "Student updated successfully",
            student: updatedStudent,
        });

    } catch (err) {
        console.error("Update student error:", err);
        if (err.code === 'P2025') {
            return res.status(404).json({ msg: "Student not found" });
        }
        if (err.code === 'P2002') {
            return res.status(400).json({ msg: "Email already exists" });
        }
        res.status(500).json({ msg: "Server error" });
    }
});

// Delete student and all related data
router.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Delete in transaction to ensure data integrity
        await prisma.$transaction(async (tx) => {
            // Delete face embeddings
            await tx.faceEmbedding.deleteMany({
                where: { userId: id },
            });

            // Delete attendance records
            await tx.attendance.deleteMany({
                where: { userId: id },
            });

            // Delete user
            await tx.user.delete({
                where: { id },
            });
        });

        res.json({ msg: "Student and all related records deleted successfully" });

    } catch (err) {
        console.error("Delete student error:", err);
        if (err.code === 'P2025') {
            return res.status(404).json({ msg: "Student not found" });
        }
        res.status(500).json({ msg: "Server error" });
    }
});

// Delete student's face data (for photo refresh)
router.delete("/students/:id/face", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.faceEmbedding.deleteMany({
            where: { userId: id },
        });

        res.json({ msg: "Face data removed. Student can now re-register." });

    } catch (err) {
        console.error("Delete face data error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// ===== ATTENDANCE MANAGEMENT =====

// Get all attendance records with filters
router.get('/attendance/all', async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      // Fetch attendance with user data
      let records = await prisma.attendance.findMany({
        include: { user: true },
        orderBy: { timestamp: "desc" },
      });
  
      // Remove orphaned records (deleted users)
      records = records.filter(r => r.user !== null);
  
      // Apply search filter
      if (search) {
        records = records.filter(r =>
          r.user.email.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      const total = records.length;
      const totalPages = Math.ceil(total / parseInt(limit));
  
      const paginated = records.slice(skip, skip + parseInt(limit));
  
      // Format for frontend compatibility
      const formatted = paginated.map(r => {
        const dateObj = new Date(r.timestamp);
        return {
          id: r.id,
          studentName: r.user.email.split("@")[0]
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, l => l.toUpperCase()),
          studentEmail: r.user.email,
          date: dateObj.toLocaleDateString("en-IN"),
          time: dateObj.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          status: r.status,
        };
      });
  
      return res.status(200).json({
        records: formatted,
        total,
        page: parseInt(page),
        totalPages,
      });
  
    } catch (err) {
      console.error("Admin attendance fetch error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
// Manually mark attendance (admin override)
router.post("/attendance/mark", async (req, res) => {
    try {
        const { userId, status, date } = req.body;

        if (!userId || !status) {
            return res.status(400).json({ msg: "userId and status are required" });
        }

        // Verify user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Create attendance record with specific date if provided
        const attendanceData = {
            userId,
            status,
        };

        if (date) {
            attendanceData.timestamp = new Date(date);
        }

        const attendance = await prisma.attendance.create({
            data: attendanceData,
        });

        res.json({
            msg: "Attendance marked successfully",
            attendance,
        });

    } catch (err) {
        console.error("Mark attendance error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// Update attendance record
router.put("/attendance/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ msg: "Status is required" });
        }

        const updatedAttendance = await prisma.attendance.update({
            where: { id },
            data: { status },
        });

        res.json({
            msg: "Attendance updated successfully",
            attendance: updatedAttendance,
        });

    } catch (err) {
        console.error("Update attendance error:", err);
        if (err.code === 'P2025') {
            return res.status(404).json({ msg: "Attendance record not found" });
        }
        res.status(500).json({ msg: "Server error" });
    }
});

// Delete attendance record
router.delete("/attendance/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.attendance.delete({
            where: { id },
        });

        res.json({ msg: "Attendance record deleted successfully" });

    } catch (err) {
        console.error("Delete attendance error:", err);
        if (err.code === 'P2025') {
            return res.status(404).json({ msg: "Attendance record not found" });
        }
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;
