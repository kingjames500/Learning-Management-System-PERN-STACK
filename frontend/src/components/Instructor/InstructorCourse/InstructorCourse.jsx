import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { InstructorContext } from "@/components/Context/Instructor/InstructorContext";
import apiUrl from "@/lib/apiUrl";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";

const ITEMS_PER_PAGE = 3;

function InstructorCourse({ listOfCourses = [] }) {
  const {
    setCurrentEditedCourseId,
    setCourseCurriculumFormData,
    setCourseLandingFormData,
  } = useContext(InstructorContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Deleting a course mutation
  const queryClient = useQueryClient();
  const deleteCourse = useMutation({
    mutationFn: async (courseId) => {
      const response = await fetch(`${apiUrl}/delete-course/${courseId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("courses");
      toast.success("Course deleted successfully", { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  const navigate = useNavigate();

  // Handlers for navigation
  const handleRedirectToUpdateCourse = (courseId) => {
    if (courseId) {
      navigate(`/instructor/course/edit/${courseId}`);
    }
  };

  const handleRedirectToCreateNewCourse = () => {
    setCurrentEditedCourseId(null);
    setCourseLandingFormData(courseLandingInitialFormData);
    setCourseCurriculumFormData(courseCurriculumInitialFormData);
    setTimeout(() => {
      navigate("/instructor/courses/new");
    }, 500);
  };

  // Pagination logic
  const totalPages = Math.ceil(listOfCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = listOfCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(paginatedCourses, "paginatedCourses");
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-center p-4">
        <CardTitle className="text-2xl font-bold">All Courses</CardTitle>
        <Button
          className="mt-4 md:mt-0 p-3"
          onClick={handleRedirectToCreateNewCourse}
        >
          Create new Course
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <Table className="table-auto w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-4 text-left font-semibold">
                  Course Name
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  students enrolled
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  Revenue
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  Level
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <TableRow className="border-b" key={course?.id}>
                    <TableCell className="p-4 font-medium">
                      {course?.title}
                    </TableCell>
                    <TableCell className="p-4">
                      {course?.students?.length || 0}
                    </TableCell>
                    <TableCell className="p-4">{course?.pricing}</TableCell>
                    <TableCell className="p-4">{course?.level}</TableCell>
                    <TableCell className="p-4 flex space-x-3">
                      <Button
                        className="p-3 bg-green-500"
                        onClick={() => handleRedirectToUpdateCourse(course?.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="p-2 bg-red-600"
                        onClick={() => deleteCourse.mutate(course?.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center p-4 font-medium"
                  >
                    No courses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination className="mt-4 flex justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  className={currentPage === index + 1 ? "font-bold" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}

export default InstructorCourse;
