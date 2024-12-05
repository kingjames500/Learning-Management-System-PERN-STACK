import { PrismaClient } from "../../../imports/imports.js";

const prisma = new PrismaClient();

// I want to fetch all students of a particular instructor
export const getStudentsByInstructor = async (req, res) => {
  const userId = req.userId; // ID of the instructor
  console.log(userId, "userId for instructor postman");

  try {
    // Fetch courses, enrolled students, and payment details for the instructor
    const coursesWithStudents = await prisma.course.findMany({
      where: { instructorId: userId }, // Ensure you're querying by instructorId
      select: {
        id: true,
        title: true,
        students: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phoneNumber: true,
              },
            },
          },
        },
        payments: {
          select: {
            userId: true,
            amount: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    // Format the data to group students and payment info by course
    const instructorStudents = coursesWithStudents.map((course) => ({
      courseId: course.id,
      courseTitle: course.title,
      students: course.students.map((enrollment) => enrollment.user),
      payments: course.payments.map((payment) => ({
        userId: payment.userId,
        amount: payment.amount,
        status: payment.status,
        date: payment.createdAt,
      })),
    }));

    res.status(200).json({
      success: true,
      data: instructorStudents,
    });
  } catch (error) {
    console.error("Error fetching students with payments:", error);
    res.status(500).json({ message: "Could not fetch students and payments" });
  }
};
