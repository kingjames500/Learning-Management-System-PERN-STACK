import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import apiUrl from "@/lib/apiUrl";
import { Watch } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function StudentCourses() {
  const redirect = useNavigate();
  const {
    studentEnrolledCourses,
    setStudentEnrolledCourses,
    isLoading,
    setIsLoading,
  } = useContext(StudentContext);

  async function getStudentEnrolledCourses() {
    try {
      const response = await fetch(`${apiUrl}/student/enrolled-courses`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data && data?.success) {
        setStudentEnrolledCourses(data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("There was something wrong while fetching the courses");
      return;
    }
  }

  useEffect(() => {
    getStudentEnrolledCourses();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentEnrolledCourses && studentEnrolledCourses.length > 0 ? (
          studentEnrolledCourses.map((enrollment) => (
            <Card key={enrollment.courseId} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={enrollment.course.image}
                  alt={enrollment.course.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{enrollment.course.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {enrollment.course.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    redirect(
                      `/student/purchased-enrolled-course/${enrollment.courseId}`,
                    )
                  }
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Please enroll</h1>
            <Link
              to="/student"
              className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
            >
              Click here to select and enroll in a course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCourses;
