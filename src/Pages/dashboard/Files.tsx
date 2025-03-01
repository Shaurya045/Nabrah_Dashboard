import { FileText } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Files() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Files</h1>
        </div>
        <Button>Upload File</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No files uploaded yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Upload files to train your AI assistants with custom knowledge.
            </p>
            <Button>Upload File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
