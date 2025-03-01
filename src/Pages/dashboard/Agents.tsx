"use client";

import { useState } from "react";
import { Headphones, Plus } from "lucide-react";
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

interface Agent {
  id: string;
  name: string;
  createdAt: Date;
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");

  const handleCreateAgent = () => {
    if (!newAgentName) return;

    const newAgent = {
      id: Math.random().toString(36).substr(2, 9),
      name: newAgentName,
      createdAt: new Date(),
    };

    setAgents([...agents, newAgent]);
    setNewAgentName("");
    setIsCreating(false);
    setSelectedAgent(newAgent);
  };

  if (agents.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Headphones className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Agent</h1>
          </div>
        </div>

        <div className="rounded-lg border bg-[#1e2a3b] shadow">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Headphones className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg text-white font-semibold mb-2">
              No Agents created yet
            </h3>
            <p className="text-[#ffffff90] mb-6 max-w-sm">
              Create your first agent to get started with AI-powered customer
              service.
            </p>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">
                  Create Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff]">
                <DialogHeader>
                  <DialogTitle>Create New Agent</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Give your agent a name to get started.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Agent Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter agent name"
                      value={newAgentName}
                      onChange={(e) => setNewAgentName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleCreateAgent}>Create</Button>
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
          <Headphones className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Agent</h1>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-[#1e2a3b]">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff]">
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
              <DialogDescription className="text-gray-600">
                Give your agent a name to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  placeholder="Enter agent name"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateAgent}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-6 h-full overflow-hidden">
        <div className="col-span-1 space-y-4 overflow-hidden">
          <div className="rounded-lg bg-[#1e2a3b]">
            <div className="p-4 font-medium text-white">Your Agents</div>
            <div className="overflow-hidden rounded-lg">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    "w-full px-4 py-2  text-left text-[#ffffff] hover:bg-accent/20 transition-colors",
                    selectedAgent?.id === agent.id && "bg-accent/40 rounded-sm"
                  )}
                >
                  {agent.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3">
          {selectedAgent ? (
            <div className="rounded-lg border bg-[#1e2a3b]">
              <div className="p-6">
                <h2 className="text-xl text-white font-semibold mb-4">
                  {selectedAgent.name}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Agent ID</Label>
                    <div className="text-sm text-gray-400">
                      {selectedAgent.id}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Created At</Label>
                    <div className="text-sm text-gray-400">
                      {selectedAgent.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-[#1e2a3b] p-6 text-center text-white">
              Select an agent to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
