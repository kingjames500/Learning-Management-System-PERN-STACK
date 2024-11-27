import React from "react";
import apiUrl from "@/lib/apiUrl";
import { useQuery } from "react-query";

const HomePage = () => {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: "popularCourses",
  //   queryFn: async () => {
  //     const res = await fetch(`${apiUrl}/home/popular-courses`);

  //     if (!res.ok) {
  //       const error = await res.json();
  //       throw new Error(error.message);
  //     }

  //     const data = await res.json();
  //     return data.popularCourse; // Assuming this is the array of courses
  //   },
  //   cacheTime: Infinity,
  // });

  // if (isLoading) {
  //   return <div className="text-center py-12">Loading courses...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="text-center py-12 text-red-500">
  //       Failed to load courses: {error.message}
  //     </div>
  //   );
  // }

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
          <a
            href="#"
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg"
          >
            Start Learning
          </a>
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Popular Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {data.map((course) => ( */}
          <div
            // key={course.id} // Use a unique identifier for each course
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              // src={course.image} // Ensure your API provides this field
              // alt={course.subtitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {/* {course.subtitle} */}
              </h3>
              <p className="text-gray-600 mt-2">{course.title}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-800 font-bold">
                  {/* ${course.pricing} */}
                </span>
                <a
                  // href={`/courses/${course.id}`} // Link to the course page
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Enroll
                </a>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </section>

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
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Learning Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
