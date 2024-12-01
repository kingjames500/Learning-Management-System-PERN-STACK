import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/Video/VideoPlayer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext, useState } from "react";

export default function StudentEnrolledCourseDetails() {
  // const { studentCurrentCourseProgess, setStudentCurrentCourseProgess } = useContext(StudentContext);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            className="text-white"
            variant="ghost"
            size="sm"
            onclick={() => history.goBack()}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back To My Courses
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            Introduction to ReactJs full course
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <VideoPlayer
            url="https://www.youtube.com/watch?v=4UZrsTqkcW4"
            width="100%"
            height="100%"
          />
          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2">ReactJS course</h2>
          </div>
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className=" text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4"></div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
