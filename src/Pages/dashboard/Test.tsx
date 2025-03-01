import { TestTube2 } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Test() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TestTube2 className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Test</h1>
        </div>
        <Button>New Test</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <TestTube2 className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tests run yet</h3>
            <p className="text-muted-foreground mb-6">
              Run tests to ensure your AI assistants are performing correctly.
            </p>
            <Button>Start Testing</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
