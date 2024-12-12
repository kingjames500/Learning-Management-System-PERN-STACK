import { StudentContext } from "@/components/Context/StudentContext/StudentContext";
import Errors from "@/components/Error/Error";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/Video/VideoPlayer";
import apiUrl from "@/lib/apiUrl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Confetti from "react-confetti";
import { toast } from "sonner";

export default function StudentEnrolledCourseDetails() {
  const { courseId } = useParams();
  const { studentCurrentCourseProgess, setStudentCurrentCourseProgess } =
    useContext(StudentContext);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [lockCourse, setLockCourse] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCompletedCourseDialog, setShowCompletedCourseDialog] =
    useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //  using useQuery for fetching student course learning progress
  const { isError, error } = useQuery({
    queryKey: ["student-course-learning-progress", courseId],
    queryFn: async () => {
      const response = await fetch(
        `${apiUrl}/student/course-learning-progress/${courseId}`,
        {
          credentials: "include",
        },
      );

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      if (data?.success) {
        if (!data?.data?.isPurchased) {
          setLockCourse(true);
        } else {
          setStudentCurrentCourseProgess({
            courseDetail: data?.data?.courseDetails,
            progress: data?.data?.courseProgress,
          });

          if (data?.data?.completed) {
            setCurrentLecture(data?.data?.courseDetails?.curriculum?.[0]);
            setShowCompletedCourseDialog(true);
            setShowConfetti(true);

            return;
          }

          if (data?.data?.courseProgress?.length === 0) {
            setCurrentLecture(data?.data?.courseDetails?.curriculum?.[0]);
          } else {
            const lastIndexOfViewedLecture =
              data?.data?.courseProgress.reduceRight((acc, obj, index) => {
                return acc === -1 && obj.viewed ? index : acc;
              }, -1);
            setCurrentLecture(
              data?.data?.courseDetails?.curriculum?.[
                lastIndexOfViewedLecture + 1
              ],
            );
          }
        }
      }
    },
  });

  // using useMutation for marking lecture as viewed in the database
  const markLectureAsViewed = useMutation({
    mutationFn: async ({ courseId, lectureId }) => {
      const response = await fetch(
        `${apiUrl}//student/course/marking-lecture-as-viewed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId, lectureId }),
          credentials: "include",
        },
      );

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "student-course-learning-progress",
        courseId,
      ]);
    },
  });

  // using useEffect to mark lecture as viewed in the database
  useEffect(() => {
    if (currentLecture?.progressValue === 1) {
      markLectureAsViewed.mutate({
        courseId: currentLecture.courseId,
        lectureId: currentLecture.id,
      });
    }
  }, [currentLecture]);

  // useMutatation for  resetting courseProgress

  const resetCurrentCourseProgress = useMutation({
    mutationFn: async (courseId) => {
      const response = await fetch(
        `${apiUrl}//student/course/reset-course-progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseId),
          credentials: "include",
        },
      );

      if (response.ok === false) {
        const error = await response.json();
        throw new error.message();
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      toast.success(
        "Course progress reset succesfully! You can start learning again",
      );
      if (data?.success) {
        setShowConfetti(false);
        setShowCompletedCourseDialog(false);
        setCurrentLecture(null);
        queryClient.invalidateQueries([
          "student-course-learning-progress",
          courseId,
        ]);
        return;
      }
    },
  });

  const handleRewatchCourse = async () => {
    resetCurrentCourseProgress.mutate({
      courseId: studentCurrentCourseProgess.courseDetail.id,
    });
  };
  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  if (isError) {
    return (
      <Errors
        error={error}
        linkPath="/student/enrolled-courses"
        linkText="Go to My Courses"
      />
    );
  }

  console.log(" waiting for current lecture to be updated", currentLecture);
  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student/enrolled-courses")}
            className="text-black"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgess?.courseDetail?.title}
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
        {/* Container for the lecture title and video */}
        <div className="flex flex-col flex-1 p-4 space-y-4">
          <div
            className={`flex-1 ${isSideBarOpen ? "mr-[400px]" : ""} transition-all duration-300`}
          >
            <VideoPlayer
              width="95%"
              height="400px"
              url={currentLecture?.videoUrl}
              onProgressUpdate={setCurrentLecture}
              progressData={currentLecture}
            />
          </div>
          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className="text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgess?.courseDetail?.curriculum.map(
                    (item) => (
                      <div
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                        key={item.id}
                      >
                        {studentCurrentCourseProgess?.progress?.find(
                          (progressItem) => progressItem.lectureId === item.id,
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    ),
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {studentCurrentCourseProgess?.courseDetail?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompletedCourseDialog}>
        <DialogContent showOverlay={false} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course</Label>
              <div className="flex flex-row gap-3">
                <Button onClick={() => navigate("/student/enrolled-courses")}>
                  My Courses Page
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
