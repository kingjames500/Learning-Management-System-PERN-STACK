import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "sonner";
import MainHeader from "./components/Header/MainHeader";
import AuthPage from "./Pages/AuthPage/AuthPage";
import NotFoundPage from "./Pages/NotFound Page/NotFoundPage";

import InstructorPage from "./Pages/InstructorPage/InstructorPage";
import CourseDetailsPage from "./Pages/CourseDetailsPage/CourseDetailsPage";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Toaster position="top-center" richColors expand duration={300} />
        <MainHeader />
        <Routes>
          <Route
            path="/instructor/courses/new"
            element={<CourseDetailsPage />}
          />
          <Route path="/instructor" element={<InstructorPage />} />
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
