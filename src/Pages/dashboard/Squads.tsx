import { Users } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

export default function Squads() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Squads</h1>
        </div>
        <Button>Create Squad</Button>
      </div>

      <Card className="rounded-lg border bg-white/30 shadow">
        <CardHeader>
          <CardTitle>Your Squads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No squads created yet
            </h3>
            <p className="text-black mb-6">
              Create squads to organize your team and manage permissions.
            </p>
            <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">Create Squad</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
