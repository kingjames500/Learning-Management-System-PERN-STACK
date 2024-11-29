import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import VideoPlayer from "@/components/Video/VideoPlayer";
import apiUrl from "@/lib/apiUrl";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

const fetchCourseDetails = async (courseId) => {
  try {
    const response = await fetch(`${apiUrl}/student/course/${courseId}`, {
      credentials: "include",
    });
    if (response.ok === false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    // console.log(data, "view course data");
    return data;
  } catch (error) {
    toast.error(error.message);
    return;
  }
};

const EnrollCourseAndBuy = async () => {
  try {
    const { mutate, isError, error} = useMutation({
      mutationFn: async ()
    })
  } catch (error) {
    toast.error(error.message);
    return;
  }
}

function ViewCourse() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    isLoading,
    setIsLoading,
  } = useContext(StudentContext);
  const { courseId } = useParams();
  const location = useLocation();

  // setting details to be null if not on the required page and path

  useEffect(() => {
    if (!location.pathname.includes("/student/course"))
      setStudentViewCourseDetails(null), setCurrentCourseDetailsId(null);
  }, [location.pathname]);

  // fetch course details
  useEffect(() => {
    if (courseId) setCurrentCourseDetailsId(courseId);
  }, [courseId]);

  useEffect(() => {
    async function getCourseDetails() {
      if (currentCourseDetailsId !== null) {
        const data = await fetchCourseDetails(currentCourseDetailsId);
        if (data && data.success) {
          setStudentViewCourseDetails(data?.data);
          setIsLoading(false);
        }
      }
    }
    getCourseDetails();
  }, [currentCourseDetailsId]);

  function handleSetFreePreview() {}

  // get index of free preview url on the video list
  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview,
        )
      : -1;

  if (isLoading) {
    return <div className=" mx-auto p-4">Fetching data......</div>;
  }

  return (
    <div className=" mx-auto p-4">
      <div className="bg-blue-900 text-white p-8 rounded-t-lg">
        <h1 className="text-4xl font-bold">
          {studentViewCourseDetails?.title}
        </h1>
        <p className="text-2xl mb-4">{studentViewCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span className="text-xl">
            {studentViewCourseDetails?.instructorName}
          </span>
          <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {studentViewCourseDetails?.primaryLanguage}
          </span>
          {/* <span>
            {studentViewCourseDetails?.students.length}{" "}
            {studentViewCourseDetails?.students.length <= 1
              ? "Student"
              : "Students"}
          </span> */}
          <span>10 {10 <= 1 ? "Student" : "Students"}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>what you will learn from this course</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentViewCourseDetails?.objectives
                  .split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentViewCourseDetails?.description}</CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentViewCourseDetails?.curriculum?.map(
                (curriculum, index) => (
                  <li
                    key={index}
                    className={`${
                      curriculum?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                    onClick={
                      curriculum?.freePreview
                        ? () => handleSetFreePreview(curriculum)
                        : null
                    }
                  >
                    {curriculum?.freePreview ? (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    <span>{curriculum.title}</span>
                  </li>
                ),
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreviewUrl !== -1
                      ? studentViewCourseDetails.curriculum[
                          getIndexOfFreePreviewUrl
                        ].videoUrl
                      : "No vidoe Available"
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4 gap-3">
                <span className="text-2xl font-bold text-red-600">$</span>
                <span className="text-2xl text-blue-700 font-extrabold">
                  {studentViewCourseDetails?.pricing}
                </span>
              </div>
              <Button className="w-full"
                onClick={() => {
                  console.log("buy now");
                }}
              >Buy Now</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default ViewCourse;
