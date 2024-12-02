import apiUrl from "@/lib/apiUrl";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Function to format the date to a readable format
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

function InstructorStudent() {
  const [instructorStudent, setInstructorStudent] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/instructor/students`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      if (data && data?.success) {
        setInstructorStudent(data?.data);
      }
    },
  });

  console.log(instructorStudent, "instructorStudent");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error.message}</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Instructor Students
      </h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="p-4">Course Title</TableHead>
              <TableHead className="p-4">Student Name</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="p-4">Phone Number</TableHead>
              <TableHead className="p-4">Payment Status</TableHead>
              <TableHead className="p-4">Payment Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructorStudent?.map((course) =>
              course.students.map((student) => {
                const latestPayment = course.payments
                  .filter((payment) => payment.userId === student.id)
                  .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

                return (
                  <TableRow key={student.id} className="hover:bg-gray-100">
                    <TableCell className="p-4 border-b border-gray-200">
                      {course.courseTitle}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-200">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-200">
                      {student.email}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-200">
                      {student.phoneNumber}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-200">
                      {latestPayment && (
                        <Badge
                          className={`mr-2 ${
                            latestPayment.status === "paid"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {latestPayment.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-200">
                      {latestPayment && (
                        <div>
                          {latestPayment.date && formatDate(latestPayment.date)}{" "}
                          - ${latestPayment.amount}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InstructorStudent;
