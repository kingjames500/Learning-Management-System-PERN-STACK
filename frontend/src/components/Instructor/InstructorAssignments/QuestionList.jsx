import { InstructorContext } from "@/components/Context/Instructor/InstructorContext";
import React, { useContext } from "react";

function QuestionList() {
  const { questionsGenerated } = useContext(InstructorContext);
  console.log(questionsGenerated);

  return (
    <div className="space-y-6">
      {questionsGenerated.length === 0 ? (
        <p className="text-gray-500">No questions generated yet.</p>
      ) : (
        questionsGenerated.map((question, index) => (
          <Card
            key={index}
            className="bg-white shadow-md border border-gray-200"
          >
            <CardHeader>
              <CardTitle className="text-gray-800 font-medium">
                Question {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{question.question}</p>
              <ul className="space-y-2">
                {Object.entries(question.options).map(([key, value]) => (
                  <li
                    key={key}
                    className={`text-gray-800 ${
                      key === question.correctAnswer
                        ? "font-semibold text-green-600"
                        : ""
                    }`}
                  >
                    {key}) {value}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-gray-600">
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-600">{question.correctAnswer}</span>
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default QuestionList;
