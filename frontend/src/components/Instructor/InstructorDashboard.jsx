import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import cards from "@/cards/dashboardCards";
function InstructorDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
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
