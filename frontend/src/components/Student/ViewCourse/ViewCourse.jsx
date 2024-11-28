import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import apiUrl from "@/lib/apiUrl";
import { Globe } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const fetchCourseDetails = async (courseId) => {
  try {
    const response = fetch("${apiUrl}/student/course/${courseId}", {
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    return;
  }
};

function ViewCourse() {
  const { studentCoursesAvailable, setStudentCoursesAvailable } =
    useContext(StudentContext);
  const { courseId } = useParams();

  useEffect(() => {
    const getCourseDetails = async () => {
      const data = await fetchCourseDetails(courseId);

      if (data && data.success) {
        setStudentCoursesAvailable(data.data);
      }
    };
    getCourseDetails();
  }, []);

  useEffect(() => {}, [studentCoursesAvailable]);

  console.log(studentCoursesAvailable);
  return (
    <div className=" mx-auto p-4">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-2xl font-bold">{studentCoursesAvailable?.title}</h1>
        <p className="text-xl mb-4">course subtitle</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By kingjames</span>
          {/* <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span> */}
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
