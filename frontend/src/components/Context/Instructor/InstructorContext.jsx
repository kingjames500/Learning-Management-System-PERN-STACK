import React, { createContext, useState } from "react";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  // This state will hold the form data for the course landing page
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData,
  );

  // This state will hold the form data for the course curriculum
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData,
  );

  // This state will hold the list of courses for the instructor
  const [instructorCourseList, setInstructorCourseList] = useState([]);

  //this state will hold the edit course data

  const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);

  const [questionsGenerated, setQuestionsGenerated] = useState([]);

  return (
    <InstructorContext.Provider
      value={{
        questionsGenerated,
        setQuestionsGenerated,
        currentEditedCourseId,
        setCurrentEditedCourseId,
        instructorCourseList,
        setInstructorCourseList,
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
