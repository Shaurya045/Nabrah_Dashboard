import { PenToolIcon as Tool } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Tools() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tool className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Tools</h1>
        </div>
        <Button>Add Tool</Button>
      </div>

      <Card className="rounded-lg border bg-white/30 shadow">
        <CardHeader>
          <CardTitle>Available Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <Tool className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No tools configured yet
            </h3>
            <p className="text-black mb-6">
              Add tools to enhance your AI assistants' capabilities.
            </p>
            <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">Add Tool</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
