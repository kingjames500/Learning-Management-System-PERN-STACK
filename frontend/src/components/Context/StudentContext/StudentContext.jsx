import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentCoursesAvailable, setStudentCoursesAvailable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StudentContext.Provider
      value={{
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
