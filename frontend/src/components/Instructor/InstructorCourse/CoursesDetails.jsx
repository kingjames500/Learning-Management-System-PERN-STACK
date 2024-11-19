import FormControls from "@/components/common-form/Form-controls";
import { InstructorContext } from "@/components/Context/Instructor/InstructorContext";
import {
  courseCurriculumInitialFormData,
  courseLandingPageFormControls,
} from "@/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext } from "react";
import { Switch } from "@/components/ui/switch";
import apiUrl from "@/lib/apiUrl";
import VideoPlayer from "@/components/Video/VideoPlayer";
import { toast } from "sonner";

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
        <Button onClick={handleNewLecture}>Add lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-5 rounded-md">
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
  const { courseLandingFormData, setcourseLandingFormData } =
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
          setFormData={setcourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
}

function CoursesDetails() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Course
        </h1>
        <Button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
          Submit
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
