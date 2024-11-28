import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentCoursesAvailable, setStudentCoursesAvailable] = useState([]);
  const [studentViewCourseDetails, setStudentViewCourseDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StudentContext.Provider
      value={{
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        studentCoursesAvailable,
        setStudentCoursesAvailable,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
