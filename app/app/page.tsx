import QuestionCard from "@/components/common/question-card";
import { demoQuestions } from "@/lib/demo-data";
import Button from "@/components/ui/button";

export default function AppHome() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}

      {/* Questions Feed */}
      <div className="space-y-4">
        {demoQuestions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button
          buttonType="secondary"
          buttonVariant="outline"
          buttonText="Load More Questions"
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
}
