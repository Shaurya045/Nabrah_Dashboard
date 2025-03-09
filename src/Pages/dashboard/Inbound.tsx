"use client";

import { useState, useEffect } from "react";
import { Workflow, Plus, X } from "lucide-react";
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
import { sipService, type SipInboundRequest } from "../../../apis/sipInboundApis";
import { useProject } from "@/contexts/projectContext";

interface Inbound {
  id: string;
  name: string;
  numbers: string[];
  allowed_addresses: string[];
  auth_username: string;
  auth_password: string;
  createdAt: Date;
}

export default function Inbound() {
  const { projectId } = useProject();
  const [inbounds, setInbounds] = useState<Inbound[]>([]);
  const [selectedInbound, setSelectedInbound] = useState<Inbound | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(projectId);
  
  // Form states
  const [newInboundName, setNewInboundName] = useState("");
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [allowedAddresses, setAllowedAddresses] = useState<string[]>([""]);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const addField = (array: string[], setArray: (value: string[]) => void) => {
    setArray([...array, ""]);
  };

  const removeField = (index: number, array: string[], setArray: (value: string[]) => void) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
  };

  const updateField = (index: number, value: string, array: string[], setArray: (value: string[]) => void) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };

  const handleCreateInbound = async () => {
    if (!newInboundName || !authUsername || !authPassword) return;

    try {
      setIsLoading(true);

      const inboundData: SipInboundRequest = {
        name: newInboundName,
        numbers: numbers.filter(n => n.trim() !== ""),
        allowed_addresses: allowedAddresses.filter(a => a.trim() !== ""),
        auth_username: authUsername,
        auth_password: authPassword,
      };

      const response = await sipService.createSipInbound(inboundData, projectId);

      const newInbound: Inbound = {
        id: response.id,
        name: response.name,
        numbers: response.numbers,
        allowed_addresses: response.allowed_addresses,
        auth_username: response.auth_username,
        auth_password: authPassword, // Store password locally since API doesn't return it
        createdAt: new Date(response.created_at),
      };

      setInbounds([...inbounds, newInbound]);
      
      // Reset form
      setNewInboundName("");
      setNumbers([""]);
      setAllowedAddresses([""]);
      setAuthUsername("");
      setAuthPassword("");
      setIsCreating(false);
      setSelectedInbound(newInbound);
    } catch (error) {
      console.error('Error creating inbound:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load initial inbounds
    const loadInbounds = async () => {
      try {
        const response = await sipService.getAllSipInbounds(projectId);
        const formattedInbounds: Inbound[] = response.map(inbound => ({
          id: inbound.id,
          name: inbound.name,
          numbers: inbound.numbers,
          allowed_addresses: inbound.allowed_addresses,
          auth_username: inbound.auth_username,
          auth_password: "", // Password is not returned from API
          createdAt: new Date(inbound.created_at),
        }));
        setInbounds(formattedInbounds);
      } catch (error) {
        console.error('Error loading inbounds:', error);
      }
    };

    loadInbounds();
  }, []);

  const handleDeleteInbound = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inbound?')) return;

    try {
      setIsLoading(true);
      await sipService.deleteSipInbound(id, projectId);
      setInbounds(prev => prev.filter(i => i.id !== id));
      setSelectedInbound(null);
    } catch (error) {
      console.error('Error deleting inbound:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  }

  if (inbounds.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Workflow className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Inbound</h1>
          </div>
        </div>

        <div className="rounded-lg border bg-white/30 shadow">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Workflow className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg text-black font-semibold mb-2">
              No Inbound created yet
            </h3>
            <p className="text-black mb-6 max-w-sm">
              Create your first inbound to automate your customer service processes.
            </p>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">
                  Create Inbound
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Inbound</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Configure your inbound settings.
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

                  <div className="space-y-2">
                    <Label>Phone Numbers</Label>
                    {numbers.map((number, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Enter phone number"
                          value={number}
                          onChange={(e) => updateField(index, e.target.value, numbers, setNumbers)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeField(index, numbers, setNumbers)}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addField(numbers, setNumbers)}
                      className="w-full mt-2"
                    >
                      Add Phone Number
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Allowed Addresses</Label>
                    {allowedAddresses.map((address, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Enter allowed address"
                          value={address}
                          onChange={(e) => updateField(index, e.target.value, allowedAddresses, setAllowedAddresses)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeField(index, allowedAddresses, setAllowedAddresses)}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addField(allowedAddresses, setAllowedAddresses)}
                      className="w-full mt-2"
                    >
                      Add Allowed Address
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Authentication Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Authentication Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleCreateInbound}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
          <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Inbound</DialogTitle>
              <DialogDescription className="text-gray-600">
                Configure your inbound settings.
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

              <div className="space-y-2">
                <Label>Phone Numbers</Label>
                {numbers.map((number, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Enter phone number"
                      value={number}
                      onChange={(e) => updateField(index, e.target.value, numbers, setNumbers)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeField(index, numbers, setNumbers)}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addField(numbers, setNumbers)}
                  className="w-full mt-2"
                >
                  Add Phone Number
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Allowed Addresses</Label>
                {allowedAddresses.map((address, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Enter allowed address"
                      value={address}
                      onChange={(e) => updateField(index, e.target.value, allowedAddresses, setAllowedAddresses)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeField(index, allowedAddresses, setAllowedAddresses)}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addField(allowedAddresses, setAllowedAddresses)}
                  className="w-full mt-2"
                >
                  Add Allowed Address
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Authentication Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Authentication Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleCreateInbound}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
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
                <div className="flex items-center justify-between">
                  <h2 className="text-xl text-white font-semibold mb-4">
                    {selectedInbound.name}
                  </h2>
                  <Button onClick={() => handleDeleteInbound(selectedInbound.id)} className="text-white">
                    Delete Inbound
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Inbound ID</Label>
                    <div className="text-sm text-gray-400">
                      {selectedInbound.id}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Phone Numbers</Label>
                    <div className="text-sm text-gray-400">
                      {selectedInbound.numbers.join(", ")}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Allowed Addresses</Label>
                    <div className="text-sm text-gray-400">
                      {selectedInbound.allowed_addresses.join(", ")}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Authentication Username</Label>
                    <div className="text-sm text-gray-400">
                      {selectedInbound.auth_username}
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
    </>
  );
}