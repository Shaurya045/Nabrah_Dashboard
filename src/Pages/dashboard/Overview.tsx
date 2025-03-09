import { LineChart, Calendar } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LineChart className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Overview</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white" size="sm">
            All Assistants
          </Button>
        </div>
      </div>

      <Card className="rounded-lg border bg-white/30 shadow">
        <CardHeader>
          <CardTitle className="text-black">Track & Manage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <LineChart className="h-12 w-12 mx-auto text-white" />
            </div>
            <h3 className="text-lg text-black font-semibold mb-2">
              Track how your assistants are performing
            </h3>
            <p className="mb-6 text-black">
              Looks like there are no metrics here - create an assistant to
              start seeing your metrics.
            </p>
            <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">Get Started</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
