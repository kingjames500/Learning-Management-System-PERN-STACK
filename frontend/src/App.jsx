import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import AuthPage from "./Pages/AuthPage/AuthPage";
import NotFoundPage from "./Pages/NotFound Page/NotFoundPage";
import StudentHomePage from "./components/Student/StudentHomePage";
import InstructorPage from "./Pages/InstructorPage/InstructorPage";
import CourseDetailsPage from "./Pages/CourseDetailsPage/CourseDetailsPage";
import HomePage from "./Pages/Homepage/HomePage";
import QenerateAssignment from "./components/Instructor/InstructorAssignments/QenerateAssignment";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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

          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
