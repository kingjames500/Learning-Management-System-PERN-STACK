import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  // for showing all the courses available to students
  const [studentCoursesAvailableList, setStudentCoursesAvailableList] =
    useState([]);
  // for showing the details of a single course
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  // for storing the id of the course whose details are being viewed
  const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
  // for showing loading spinner
  const [isLoading, setIsLoading] = useState(true);
  // for showing the course that the student has enrolled
  const [studentEnrolledCourses, setStudentEnrolledCourses] = useState([]);

  const [studentCurrentCourseProgess, setStudentCurrentCourseProgess] =
    useState({});

  return (
    <StudentContext.Provider
      value={{
        studentEnrolledCourses,
        setStudentEnrolledCourses,
        studentCoursesAvailableList,
        setStudentCoursesAvailableList,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
        isLoading,
        setIsLoading,
        studentCurrentCourseProgess,
        setStudentCurrentCourseProgess,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
