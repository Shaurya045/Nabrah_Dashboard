import { Settings } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Blocks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Blocks</h1>
        </div>
        <Button>Create Block</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Blocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No blocks created yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Create reusable blocks to build complex AI workflows.
            </p>
            <Button>Create Block</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
