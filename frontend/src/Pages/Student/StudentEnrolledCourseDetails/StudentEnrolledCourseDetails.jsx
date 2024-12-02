import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/Video/VideoPlayer";
import apiUrl from "@/lib/apiUrl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getStudentCourseProgress(courseId) {
  const response = await fetch(`${apiUrl}/student/course-learning-progress/${courseId}`, {
    credentials: "include",
  });

  if (response.ok === false) {
    console.log("Failed to get course progress");
    return;
  }

  const data = await response.json();
  console.log("course progress", data);
  return data;
}

export default function StudentEnrolledCourseDetails() {
  const { courseId } = useParams();
  const { studentCurrentCourseProgess, setStudentCurrentCourseProgess } = useContext(StudentContext);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    async function fetchCourseProgress() {
      if (courseId) {
        const data = await getStudentCourseProgress(courseId);
        if (data?.success) {
          setStudentCurrentCourseProgess(data.data);
        }
      }
    }
    fetchCourseProgress();
  }, [courseId]);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-sm">
        <div className="flex items-center space-x-4">
          <Button
            className="flex items-center text-gray-700 hover:text-gray-900"
            variant="ghost"
            size="sm"
            onClick={() => history.goBack()}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back To My Courses
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgess?.title || "Loading..."}
          </h1>
        </div>
        <Button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="text-gray-700 hover:text-gray-900"
        >
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Player Section */}
        <div
          className={`flex-1 flex items-center justify-center ${isSideBarOpen ? "mr-[400px]" : ""
            } transition-all duration-300 bg-gray-50`}
        >
          <div className="w-full max-w-5xl p-4">
            <VideoPlayer
              url={studentCurrentCourseProgess?.curriculum?.[0]?.videoUrl}
              width="100%"
              height="auto"
            />
            <div className="p-6 mt-4 bg-gray-100 rounded-lg shadow-sm mb-7">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {studentCurrentCourseProgess?.title }
              </h2>
              <p className="text-gray-600">
                {studentCurrentCourseProgess?.description }
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-gray-100 border-l border-gray-300 transition-transform duration-300 ${isSideBarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            {/* Tabs List */}
            <TabsList className="grid bg-gray-200 w-full grid-cols-2 p-0 h-14 text-gray-800">
              <TabsTrigger
                value="content"
                className="text-gray-700 hover:bg-gray-300 rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-gray-700 hover:bg-gray-300 rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {/* {studentCurrentCourseProgess?.curriculum?.map((item) => (
                    <div
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
                      key={item.id}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  )) || (
                      <p className="text-gray-500">No course content available.</p>
                    )} */}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">About this course</h2>
                  <p className="text-gray-600">{studentCurrentCourseProgess?.description}</p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
