import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import { Skeleton } from "@/components/ui/skeleton";
import apiUrl from "@/lib/apiUrl";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fetchCoursesToBeViewedByStudents = async () => {
  try {
    const response = await fetch(`${apiUrl}/student/courses`, {
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return null;
  }
};

function AllStudentCourses() {
  const navigate = useNavigate();
  const {
    studentCoursesAvailable,
    setStudentCoursesAvailable,
    isLoading,
    setIsloading,
  } = useContext(StudentContext);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCoursesToBeViewedByStudents();
      if (data && data.success) {
        setStudentCoursesAvailable(data.data);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {}, [studentCoursesAvailable]);

  const handleCardClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Courses Available
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentCoursesAvailable && studentCoursesAvailable.length > 0 ? (
          studentCoursesAvailable.map((studentCourse) => (
            <div
              key={studentCourse.id}
              onClick={() => handleCardClick(studentCourse.id)}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg cursor-pointer transition overflow-hidden"
              style={{
                maxWidth: "350px", // Card width
                margin: "0 auto", // Center the card
              }}
            >
              <img
                src={studentCourse.image}
                alt={studentCourse.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {studentCourse.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Created By:{" "}
                  <span className="font-medium text-gray-700">
                    {studentCourse.instructorName}
                  </span>
                </p>
                <p className="text-[16px] text-gray-600 mt-3 mb-2">
                  {`${studentCourse?.curriculum?.length} ${
                    studentCourse?.curriculum?.length <= 1
                      ? "Lecture"
                      : "Lectures"
                  } - ${studentCourse?.level.toUpperCase()} Level`}
                </p>
                <p className="text-lg font-bold text-gray-800">
                  $ {studentCourse.pricing}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <h1 className="font-extrabold text-4xl">No Courses Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllStudentCourses;
