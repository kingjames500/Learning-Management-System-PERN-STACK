import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import cards from "@/cards/dashboardCards";
import apiUrl from "@/lib/apiUrl";
import { useQuery } from "react-query";

function InstructorDashboard() {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "courses",
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/instructor-course-count`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course count");
      }

      return await response.json(); // Assuming response contains { count: number }
    },
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-center">
                <card.Icon className="mr-2 text-2xl text-blue-600" />{" "}
                {/* Display the icon */}
                <CardTitle>{card.Label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {card.value === "courses" ? (
                <p className="text-blue-700">
                  {isLoading
                    ? "Loading..."
                    : isError
                      ? "Failed to load courses"
                      : `You have ${courses?.count || 0} courses.`}
                </p>
              ) : (
                <p>{card.content}</p>
              )}
              <Button
                className="mt-4"
                onClick={() => (window.location.href = card.link)}
              >
                {card.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default InstructorDashboard;
