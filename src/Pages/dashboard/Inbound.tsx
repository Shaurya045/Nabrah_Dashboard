"use client";

import { useState } from "react";
import { Workflow, Plus } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Components/ui/dialog";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { cn } from "../../lib/utils";

interface Inbound {
  id: string;
  name: string;
  createdAt: Date;
}

export default function Inbound() {
  const [inbounds, setInbounds] = useState<Inbound[]>([]);
  const [selectedInbound, setSelectedInbound] = useState<Inbound | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newInboundName, setNewInboundName] = useState("");

  const handleCreateInbound = () => {
    if (!newInboundName) return;

    const newInbound = {
      id: Math.random().toString(36).substr(2, 9),
      name: newInboundName,
      createdAt: new Date(),
    };

    setInbounds([...inbounds, newInbound]);
    setNewInboundName("");
    setIsCreating(false);
    setSelectedInbound(newInbound);
  };

  if (inbounds.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Workflow className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Inbound</h1>
          </div>
        </div>

        <div className="rounded-lg border bg-[#1e2a3b] shadow">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Workflow className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg text-white font-semibold mb-2">
              No Inbound created yet
            </h3>
            <p className="text-[#ffffff90] mb-6 max-w-sm">
              Create your first inbound to automate your customer service
              processes.
            </p>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">
                  Create Inbound
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff]">
                <DialogHeader>
                  <DialogTitle>Create New Inbound</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Give your inbound a name to get started.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Inbound Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter inbound name"
                      value={newInboundName}
                      onChange={(e) => setNewInboundName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleCreateInbound}>Create</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Workflow className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Inbound</h1>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-[#1e2a3b]">
              <Plus className="h-4 w-4 mr-2" />
              Create Inbound
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff]">
            <DialogHeader>
              <DialogTitle>Create New Inbound</DialogTitle>
              <DialogDescription className="text-gray-600">
                Give your inbound a name to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Inbound Name</Label>
                <Input
                  id="name"
                  placeholder="Enter inbound name"
                  value={newInboundName}
                  onChange={(e) => setNewInboundName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateInbound}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4 overflow-hidden">
          <div className="rounded-lg bg-[#1e2a3b]">
            <div className="p-4 font-medium text-white">Your Inbounds</div>
            <div className="overflow-hidden rounded-lg">
              {inbounds.map((inbound) => (
                <button
                  key={inbound.id}
                  onClick={() => setSelectedInbound(inbound)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-[#ffffff] hover:bg-accent/20 transition-colors",
                    selectedInbound?.id === inbound.id &&
                      "bg-accent/40 rounded-sm"
                  )}
                >
                  {inbound.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3">
          {selectedInbound ? (
            <div className="rounded-lg border bg-[#1e2a3b]">
              <div className="p-6">
                <h2 className="text-xl text-white font-semibold mb-4">
                  {selectedInbound.name}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Inbound ID</Label>
                    <div className="text-sm text-gray-400">
                      {selectedInbound.id}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Created At</Label>
                    <div className="text-sm text-gray-400">
                      {selectedInbound.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-[#1e2a3b] p-6 text-center text-white">
              Select an inbound to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
