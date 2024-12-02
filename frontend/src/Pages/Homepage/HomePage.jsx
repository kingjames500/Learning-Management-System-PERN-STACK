import React from "react";
import apiUrl from "@/lib/apiUrl";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: "popularCourses",
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/home/popular-courses`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      return data?.data; // Assuming this is the array of courses
    },
    cacheTime: Infinity, 
    staleTime: Infinity, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchOnReconnect: false, 
  });


  if (isLoading) {
    return <div className="text-center py-12">Loading courses...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load courses: {error.message}
      </div>
    );
  }

  const isTwoCourses = data && data.length === 2;

  return (
    <div className="bg-gray-100 mt-5">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Learn from the best courses, anytime, anywhere
          </h1>
          <p className="text-gray-600 mb-8">
            Join thousands of learners from around the world already learning on
            Udemy Clone.
          </p>
          <Link
            to="/student"
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg"
          >
            Start Learning
          </Link>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Popular Courses
        </h2>
        <div
          className={`grid ${data.length === 2
              ? "grid-cols-1 md:grid-cols-2 justify-center"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            } gap-8`}
        >
          {data.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.subtitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {course.courseDescription}
                </p>
                <p className="text-gray-600 mt-4 flex items-center text-lg font-semibold">
                  <User className="mr-2 h-5 w-5" /> {course.instructorName}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className="text-sm text-green-500 bg-green-100 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-800 font-bold">${course.pricing}</span>
                  <Link
                    to={`/student/course/${course.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* About Us Section */}
      <section className="bg-blue-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-700 text-lg mb-6">
            At <strong>Learning Management System</strong>, we aim to bridge the
            gap between aspiring learners and high-quality education. Our
            platform offers a wide variety of courses to help you gain new
            skills and achieve your goals.
          </p>
          <p className="text-gray-700 text-lg">
            With expert instructors, a user-friendly interface, and flexible
            learning options, we are committed to making education accessible to
            everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Learning Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
