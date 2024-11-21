import FormControls from "@/components/common-form/Form-controls";
import { InstructorContext } from "@/components/Context/Instructor/InstructorContext";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
  courseLandingPageFormControls,
} from "@/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import apiUrl from "@/lib/apiUrl";
import VideoPlayer from "@/components/Video/VideoPlayer";
import { toast } from "sonner";
import userDetailsStore from "@/components/Store/userStoreDetails";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

function CourseCurriculum() {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }
  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  //function for handling title states
  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  // function for handling free preview states
  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  //function for handling video upload and setting video url and public id
  async function handleSingleVideoUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formVideoData = new FormData();
      formVideoData.append("file", selectedFile);
      try {
        const response = await fetch(`${apiUrl}/upload`, {
          method: "POST",
          body: formVideoData,
        });
        const data = await response.json();
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
          ...cpyCourseCurriculumFormData[currentIndex],
          videoUrl: data.data?.secure_url,
          publicId: data.data?.public_id,
        };
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
      } catch (error) {
        toast.error("There was an error uploading the video", {
          duration: 3000,
        });
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-2xl text-gray-800">
          Course Curriculum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleNewLecture}
          disabled={!isCourseCurriculumFormDataValid()}
        >
          Add lecture
        </Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-5 rounded-md" key={index}>
              <div className="flex gap-5">
                <h3 className="font-semibold">{index + 1}</h3>
                <Input
                  name={`lecture-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96 mb-4"
                  value={courseCurriculumFormData[index]?.title}
                  onChange={(event) => handleCourseTitleChange(event, index)}
                />
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mb-4">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="450px"
                      height="200px"
                    />
                    <Button className="mb-2">Change Video</Button>
                    <Button className="bg-red-500">Delete Video</Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    placeholder="Upload video"
                    className="mb-2"
                    onChange={(event) => handleSingleVideoUpload(event, index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CourseSettings() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  async function handleSingeImageUpload(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formImageData = new FormData();
      formImageData.append("file", selectedFile);
      try {
        const response = await fetch(`${apiUrl}/upload`, {
          method: "POST",
          body: formImageData,
        });
        const data = await response.json();
        setCourseLandingFormData({
          ...courseLandingFormData,
          image: data.data?.url,
        });
      } catch (error) {
        toast.error("There was an error uploading the image", {
          duration: 3000,
        });
      }
    }
  }
  return (
    <Card className="flex flex-1 flex-col p-6 bg-white shadow-lg rounded-lg">
      <CardHeader className="space-y-4">
        <CardTitle className="font-bold text-2xl text-gray-800">
          Course Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {courseLandingFormData?.image ? (
          <img src={courseLandingFormData?.image} alt="course" />
        ) : (
          <div className="space-y-2">
            <Label
              htmlFor="course-image"
              className="text-lg font-medium text-gray-700"
            >
              Upload Course Image
            </Label>
            <Input
              id="course-image"
              type="file"
              accept="image/*"
              onChange={handleSingeImageUpload}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CourseLandingPage() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  return (
    <Card className="flex flex-1 flex-col p-6 bg-white shadow-lg rounded-lg">
      <CardHeader className="space-y-4">
        <CardTitle className="font-bold text-2xl text-gray-800">
          Course Landing Page
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
}

function CoursesDetails() {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);
  const { courseId } = useParams();

  // useEffect for fetching course details for edit
  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCourseDetailsForEdit();
  }, [currentEditedCourseId]);

  // aync function for fetching course details for edit
  async function fetchCourseDetailsForEdit() {
    const response = await fetch(`${apiUrl}/get-course/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok === false) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    if (data && data.course) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData,
      ).reduce((acc, key) => {
        acc[key] = data?.course[key] || courseLandingInitialFormData[key];
        return acc;
      }, {});
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(data.course.curriculum);
    }
  }

  // useEffect for setting the current edited course id
  useEffect(() => {
    if (courseId) {
      setCurrentEditedCourseId(courseId);
    }
  }, [courseId]);

  const user = userDetailsStore((state) => state.user);
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }

    return hasFreePreview;
  }

  // using use mutation for creating course
  const { mutate } = useMutation({
    mutationFn: async (course) => {
      const response = await fetch(`${apiUrl}/create-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(course),
      });

      console.log("response from  creating course", response);

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      toast.success("Course created successfully!", {
        duration: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
      });
    },
  });

  async function handleCreateCourse() {
    const finalCourseData = {
      instructorName: `${user.firstName} ${user.lastName}`,
      ...courseLandingFormData,
      isPublished: true,
      curriculum: courseCurriculumFormData,
    };

    mutate(finalCourseData);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Course
        </h1>
        <Button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          // disabled={!validateFormData()}
          onClick={handleCreateCourse}
        >
          Create Course
        </Button>
      </div>
      <Tabs defaultValue="curriculum">
        {/* Tabs List */}
        <TabsList className="flex  gap-4 border-b border-gray-200">
          <TabsTrigger
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            value="curriculum"
          >
            Course Curriculum
          </TabsTrigger>
          <TabsTrigger
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            value="create-course"
          >
            course landing page
          </TabsTrigger>
          <TabsTrigger
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            value="course-settings"
          >
            Course Settings
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent
          className="mt-6 p-4 bg-white rounded-lg shadow"
          value="curriculum"
        >
          <CourseCurriculum />
        </TabsContent>
        <TabsContent
          className="mt-6 p-4 bg-white rounded-lg shadow"
          value="create-course"
        >
          <CourseLandingPage />
        </TabsContent>
        <TabsContent
          className="mt-6 p-4 bg-white rounded-lg shadow"
          value="course-settings"
        >
          <CourseSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CoursesDetails;
