"use client";

import { useState } from "react";
import { Phone, Plus } from "lucide-react";
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

interface Outbound {
  id: string;
  phoneNumber: string;
  createdAt: Date;
}

export default function Outbound() {
  const [outbounds, setOutbounds] = useState<Outbound[]>([]);
  const [selectedOutbound, setSelectedOutbound] = useState<Outbound | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [newOutboundNumber, setNewOutboundNumber] = useState("");

  const handleAddOutbound = () => {
    if (!newOutboundNumber) return;

    const newOutbound = {
      id: Math.random().toString(36).substr(2, 9),
      phoneNumber: newOutboundNumber,
      createdAt: new Date(),
    };

    setOutbounds([...outbounds, newOutbound]);
    setNewOutboundNumber("");
    setIsCreating(false);
    setSelectedOutbound(newOutbound);
  };

  if (outbounds.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Outbound</h1>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Phone className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No outbounds added yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Add your first outbound to start handling calls with AI.
            </p>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>Add Outbound</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Outbound</DialogTitle>
                  <DialogDescription>
                    Enter a phone number for your new outbound.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Outbound</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="Enter outbound"
                      value={newOutboundNumber}
                      onChange={(e) => setNewOutboundNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddOutbound}>Add</Button>
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
          <Phone className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Outbound</h1>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Outbound
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Outbound</DialogTitle>
              <DialogDescription>
                Enter a phone number for your new outbound.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  value={newOutboundNumber}
                  onChange={(e) => setNewOutboundNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddOutbound}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border bg-card">
            <div className="p-4 font-medium">Your Outbounds</div>
            <div className="divide-y">
              {outbounds.map((outbound) => (
                <button
                  key={outbound.id}
                  onClick={() => setSelectedOutbound(outbound)}
                  className={cn(
                    "w-full px-4 py-2 text-left hover:bg-accent/50 transition-colors",
                    selectedOutbound?.id === outbound.id && "bg-accent"
                  )}
                >
                  {outbound.phoneNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3">
          {selectedOutbound ? (
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedOutbound.phoneNumber}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Outbound ID</Label>
                    <div className="text-sm text-muted-foreground">
                      {selectedOutbound.id}
                    </div>
                  </div>
                  <div>
                    <Label>Created At</Label>
                    <div className="text-sm text-muted-foreground">
                      {selectedOutbound.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
              Select an outbound to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
