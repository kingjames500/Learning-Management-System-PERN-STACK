import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
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

      {/* Courses Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Popular Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="course-image-url-1"
              alt="Course 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                Course Title 1
              </h3>
              <p className="text-gray-600 mt-2">
                Brief description of course 1 content...
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-800 font-bold">$19.99</span>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Enroll
                </a>
              </div>
            </div>
          </div>
          {/* Course Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="course-image-url-2"
              alt="Course 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                Course Title 2
              </h3>
              <p className="text-gray-600 mt-2">
                Brief description of course 2 content...
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-800 font-bold">$29.99</span>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Enroll
                </a>
              </div>
            </div>
          </div>
          {/* Course Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="course-image-url-3"
              alt="Course 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                Course Title 3
              </h3>
              <p className="text-gray-600 mt-2">
                Brief description of course 3 content...
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-800 font-bold">$39.99</span>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Enroll
                </a>
              </div>
            </div>
          </div>
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
