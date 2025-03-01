import { BarChart } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Observe() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Observe</h1>
        </div>
        <Button variant="outline" size="sm">
          Last 7 Days
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No data to display yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start using your AI assistants to see analytics and insights.
            </p>
            <Button>Create Assistant</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
