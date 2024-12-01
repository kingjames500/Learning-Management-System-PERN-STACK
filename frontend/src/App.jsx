import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import AuthPage from "./Pages/AuthPage/AuthPage";
import NotFoundPage from "./Pages/NotFound Page/NotFoundPage";
import InstructorPage from "./Pages/InstructorPage/InstructorPage";
import CourseDetailsPage from "./Pages/CourseDetailsPage/CourseDetailsPage";
import HomePage from "./Pages/Homepage/HomePage";
import QenerateAssignment from "./components/Instructor/InstructorAssignments/QenerateAssignment";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import StudentViewCoursePage from "./Pages/Student/StudentViewCoursePage/StudentViewCoursePage";
import StudentHomePage from "./Pages/Student/Home/StudentHomePage";
import StudentEnrolledCourses from "./Pages/Student/StudentEnrolledCourses/StudentEnrolledCourses";
import StudentEnrolledCourseDetails from "./Pages/Student/StudentEnrolledCourseDetails/StudentEnrolledCourseDetails";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Toaster position="top-center" richColors duration={2000} />
        <Header />
        <Routes>
          <Route
            path="/instructor/courses/new"
            element={
              <ProtectedRoute role="instructor">
                <CourseDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/assignment"
            element={
              <ProtectedRoute role="instructor">
                <QenerateAssignment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/edit/:courseId"
            element={
              <ProtectedRoute role="instructor">
                <CourseDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <ProtectedRoute role="instructor">
                <InstructorPage />
              </ProtectedRoute>
            }
          />
          {/* Student routes */}
          <Route
            path="/student/course/:courseId"
            element={
              <ProtectedRoute role="student">
                <StudentViewCoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/course/progess/:courseId"
            element={
              <ProtectedRoute role="student">
                <StudentEnrolledCourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/enrolled-courses"
            element={
              <ProtectedRoute role="student">
                <StudentEnrolledCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentHomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
