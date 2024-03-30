import ViewDetails from "@/components/shared/ViewDetails";
import { StarIcon } from "lucide-react";

const FeedbackAnalysis = () => {
  return (
    <div className="p-4 rounded-lg bg-green-100 border border-green-500">
      <h2>Feedback Analysis</h2>
      <div className="my-3 flex items-center space-x-2">
        <StarIcon size={24} className="text-green-500" fill="rgb(34 197 94 )" />
        <p className="font-bold text-sm">
          <span className="text-green-500">7</span> out of 10
        </p>
      </div>
      <div className=" flex items-center space-x-2 ml-1 mb-2">
        <StarIcon size={18} className="text-green-500" fill="rgb(34 197 94 )" />
        <p className="font-bold text-xs">9/10 Service</p>
      </div>
      <div className=" flex items-center space-x-2 ml-1">
        <StarIcon size={18} className="text-red-500" fill="rgb(239 68 68 )" />
        <p className="font-bold text-xs">3/10 Price</p>
      </div>
      <div className="mt-2 flex justify-end">
        <ViewDetails href="#" />
      </div>
    </div>
  );
};

export default FeedbackAnalysis;
