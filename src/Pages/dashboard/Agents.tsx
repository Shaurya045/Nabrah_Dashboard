import { useCallback, useEffect, useState } from "react";
import { EllipsisVertical, Headphones, icons, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { Textarea } from "@/Components/ui/textarea";
import { createAgent, getAllAgents, updateAgent, deleteAgent } from "../../../apis/agentApis";
import { useProject } from "@/contexts/projectContext";
import { DropdownMenu, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
type Agent = {
  id: string;
  name: string;
  startFirst: boolean;
  firstSentence: string;
  agentType: "basic";
  whoAreYou: string;
  goal: string;
  steps: string;
  allowInterruptions: boolean;
  voice: string | undefined;
  supportData: string;
  createdAt: Date;
}

const VOICE_OPTIONS = ["dania"];

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {projectId} = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: "",
    startFirst: true,
    firstSentence: "",
    agentType: "basic",
    whoAreYou: "",
    goal: "",
    steps: "",
    allowInterruptions: true,
    voice: "dania",
    supportData: "",
  });

  // const handleCreateAgent = async () => {
  //   if (!newAgent.name) return;

  //   try {
  //     setIsLoading(true);
      
  //     const response = await createAgent({
  //       name: newAgent.name!,
  //       start_first: newAgent.startFirst!,
  //       first_sentence: newAgent.firstSentence!,
  //       agent_type: newAgent.agentType!,
  //       who_are_you: newAgent.whoAreYou!,
  //       goal: newAgent.goal!,
  //       steps: newAgent.steps!,
  //       allow_interruptions: newAgent.allowInterruptions!,
  //       voice: newAgent.voice!,
  //       support_data: newAgent.supportData!,
  //     }, projectId || '');

  //     const createdAgent: Agent = {
  //       id: response.id,
  //       name: response.name,
  //       startFirst: response.start_first,
  //       firstSentence: response.first_sentence,
  //       agentType: response.agent_type as "basic",
  //       whoAreYou: response.who_are_you,
  //       goal: response.goal,
  //       steps: response.steps,
  //       allowInterruptions: response.allow_interruptions,
  //       voice: response.voice,
  //       supportData: response.support_data,
  //       createdAt: new Date(response.createdAt),
  //     };

  //     setAgents([...agents, createdAgent]);
  //     setNewAgent({
  //       name: "",
  //       startFirst: true,
  //       firstSentence: "",
  //       agentType: "basic",
  //       whoAreYou: "",
  //       goal: "",
  //       steps: "",
  //       allowInterruptions: true,
  //       voice: "dania",
  //       supportData: "",
  //     });
  //     setIsCreating(false);
  //     setSelectedAgent(createdAgent);
  //   } catch (error) {
  //     console.error('Failed to create agent:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!projectId) return;

  //   getAllAgents(projectId)
  //     .then((data) => {
  //       setAgents(data.map((agent) => ({
  //         id: agent.id,
  //         name: agent.name,
  //         startFirst: agent.start_first,
  //         firstSentence: agent.first_sentence,
  //         agentType: agent.agent_type as "basic",
  //         whoAreYou: agent.who_are_you,
  //         goal: agent.goal,
  //         steps: agent.steps,
  //         allowInterruptions: agent.allow_interruptions,
  //         voice: agent.voice,
  //         supportData: agent.support_data,
  //         createdAt: new Date(agent.createdAt),
  //       })));
  //     })
  //     .catch((error) => {
  //       console.error('Failed to load agents:', error);
  //     });
  // }, [agents])

  const fetchAgents = useCallback(async () => {
    if (!projectId) return;

    try {
      const data = await getAllAgents(projectId);
      const mappedAgents = data.map((agent) => ({
        id: agent.id,
        name: agent.name,
        startFirst: agent.start_first,
        firstSentence: agent.first_sentence,
        agentType: agent.agent_type as "basic",
        whoAreYou: agent.who_are_you,
        goal: agent.goal,
        steps: agent.steps,
        allowInterruptions: agent.allow_interruptions,
        voice: agent.voice,
        supportData: agent.support_data,
        createdAt: new Date(agent.createdAt),
      }));
      setAgents(mappedAgents);
    } catch (error) {
      console.error('Failed to load agents:', error);
    }
  }, [projectId]);

  const handleCreateAgent = async () => {
    if (!newAgent.name) return;

    try {
      setIsLoading(true);
      
      const response = await createAgent({
        name: newAgent.name!,
        start_first: newAgent.startFirst!,
        first_sentence: newAgent.firstSentence!,
        agent_type: newAgent.agentType!,
        who_are_you: newAgent.whoAreYou!,
        goal: newAgent.goal!,
        steps: newAgent.steps!,
        allow_interruptions: newAgent.allowInterruptions!,
        voice: newAgent.voice!,
        support_data: newAgent.supportData!,
      }, projectId || '');

      console.log(response)

      await fetchAgents();
      setNewAgent({
        name: "",
        startFirst: true,
        firstSentence: "",
        agentType: "basic",
        whoAreYou: "",
        goal: "",
        steps: "",
        allowInterruptions: true,
        voice: "dania",
        supportData: "",
      });
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedAgent || !projectId) return;

    try {
      setIsLoading(true);
      await updateAgent(selectedAgent.id, {
        name: selectedAgent.name,
        start_first: selectedAgent.startFirst,
        first_sentence: selectedAgent.firstSentence,
        agent_type: selectedAgent.agentType,
        who_are_you: selectedAgent.whoAreYou,
        goal: selectedAgent.goal,
        steps: selectedAgent.steps,
        allow_interruptions: selectedAgent.allowInterruptions,
        voice: selectedAgent.voice,
        support_data: selectedAgent.supportData,
      }, projectId);

      await fetchAgents();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAgent || !projectId) return;

    try {
      setIsLoading(true);
      await deleteAgent(selectedAgent.id, projectId);
      await fetchAgents();
      setSelectedAgent(null);
    } catch (error) {
      console.error('Failed to delete agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  if (agents.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Headphones className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Agent</h1>
          </div>
        </div>

        <div className="rounded-lg border bg-white/30 shadow">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Headphones className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg text-black font-semibold mb-2">
              No Agents created yet
            </h3>
            <p className="text-black mb-6 max-w-sm">
              Create your first agent to get started with AI-powered customer
              service.
            </p>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white">
                  Create Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Agent</DialogTitle>
                  <DialogDescription className="text-gray-900">
                    Configure your AI agent's personality and behavior.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Agent Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter agent name"
                      value={newAgent.name}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="start-first"
                      checked={newAgent.startFirst}
                      onCheckedChange={(checked) =>
                        setNewAgent({ ...newAgent, startFirst: checked })
                      }
                    />
                    <Label htmlFor="start-first">Start Conversation First</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="first-sentence">First Sentence</Label>
                    <Input
                      id="first-sentence"
                      placeholder="Enter the first sentence"
                      value={newAgent.firstSentence}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, firstSentence: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agent-type">Agent Type</Label>
                    <Select
                      value={newAgent.agentType}
                      onValueChange={(value: "basic") =>
                        setNewAgent({ ...newAgent, agentType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="who-are-you">Who Are You</Label>
                    <Textarea
                      id="who-are-you"
                      placeholder="Describe who the agent is"
                      value={newAgent.whoAreYou}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, whoAreYou: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal">Goal</Label>
                    <Textarea
                      id="goal"
                      placeholder="What is the agent's goal?"
                      value={newAgent.goal}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, goal: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="steps">Steps</Label>
                    <Textarea
                      id="steps"
                      placeholder="Define the conversation steps"
                      value={newAgent.steps}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, steps: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allow-interruptions"
                      checked={newAgent.allowInterruptions}
                      onCheckedChange={(checked) =>
                        setNewAgent({ ...newAgent, allowInterruptions: checked })
                      }
                    />
                    <Label htmlFor="allow-interruptions">
                      Allow Interruptions
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voice">Voice</Label>
                    <Select
                      value={newAgent.voice}
                      onValueChange={(value) =>
                        setNewAgent({ ...newAgent, voice: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {VOICE_OPTIONS.map((voice) => (
                          <SelectItem key={voice} value={voice}>
                            {voice.charAt(0).toUpperCase() + voice.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="support-data">Support Data</Label>
                    <Textarea
                      id="support-data"
                      placeholder="Enter any additional support data"
                      value={newAgent.supportData}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, supportData: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleCreateAgent}>Create Agent</Button>
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
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
            <DialogDescription className="text-gray-600">
              Configure your AI agent's personality and behavior.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                placeholder="Enter agent name"
                value={newAgent.name}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, name: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="start-first"
                checked={newAgent.startFirst}
                onCheckedChange={(checked) =>
                  setNewAgent({ ...newAgent, startFirst: checked })
                }
              />
              <Label htmlFor="start-first">Start Conversation First</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="first-sentence">First Sentence</Label>
              <Input
                id="first-sentence"
                placeholder="Enter the first sentence"
                value={newAgent.firstSentence}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, firstSentence: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-type">Agent Type</Label>
              <Select
                value={newAgent.agentType}
                onValueChange={(value: "basic") =>
                  setNewAgent({ ...newAgent, agentType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select agent type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="who-are-you">Who Are You</Label>
              <Textarea
                id="who-are-you"
                placeholder="Describe who the agent is"
                value={newAgent.whoAreYou}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, whoAreYou: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Textarea
                id="goal"
                placeholder="What is the agent's goal?"
                value={newAgent.goal}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, goal: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <Textarea
                id="steps"
                placeholder="Define the conversation steps"
                value={newAgent.steps}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, steps: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="allow-interruptions"
                checked={newAgent.allowInterruptions}
                onCheckedChange={(checked) =>
                  setNewAgent({ ...newAgent, allowInterruptions: checked })
                }
              />
              <Label htmlFor="allow-interruptions">Allow Interruptions</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice">Voice</Label>
              <Select
                value={newAgent.voice}
                onValueChange={(value) =>
                  setNewAgent({ ...newAgent, voice: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {VOICE_OPTIONS.map((voice) => (
                    <SelectItem key={voice} value={voice}>
                      {voice.charAt(0).toUpperCase() + voice.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-data">Support Data</Label>
              <Textarea
                id="support-data"
                placeholder="Enter any additional support data"
                value={newAgent.supportData}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, supportData: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleEdit}>Edit Agent</Button>
          </div>
        </DialogContent>
      </Dialog>
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
            <DialogContent className="bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Agent</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Configure your AI agent's personality and behavior.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Agent Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter agent name"
                    value={newAgent.name}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="start-first"
                    checked={newAgent.startFirst}
                    onCheckedChange={(checked) =>
                      setNewAgent({ ...newAgent, startFirst: checked })
                    }
                  />
                  <Label htmlFor="start-first">Start Conversation First</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first-sentence">First Sentence</Label>
                  <Input
                    id="first-sentence"
                    placeholder="Enter the first sentence"
                    value={newAgent.firstSentence}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, firstSentence: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-type">Agent Type</Label>
                  <Select
                    value={newAgent.agentType}
                    onValueChange={(value: "basic") =>
                      setNewAgent({ ...newAgent, agentType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="who-are-you">Who Are You</Label>
                  <Textarea
                    id="who-are-you"
                    placeholder="Describe who the agent is"
                    value={newAgent.whoAreYou}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, whoAreYou: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <Textarea
                    id="goal"
                    placeholder="What is the agent's goal?"
                    value={newAgent.goal}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, goal: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="steps">Steps</Label>
                  <Textarea
                    id="steps"
                    placeholder="Define the conversation steps"
                    value={newAgent.steps}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, steps: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="allow-interruptions"
                    checked={newAgent.allowInterruptions}
                    onCheckedChange={(checked) =>
                      setNewAgent({ ...newAgent, allowInterruptions: checked })
                    }
                  />
                  <Label htmlFor="allow-interruptions">Allow Interruptions</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice">Voice</Label>
                  <Select
                    value={newAgent.voice}
                    onValueChange={(value) =>
                      setNewAgent({ ...newAgent, voice: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_OPTIONS.map((voice) => (
                        <SelectItem key={voice} value={voice}>
                          {voice.charAt(0).toUpperCase() + voice.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-data">Support Data</Label>
                  <Textarea
                    id="support-data"
                    placeholder="Enter any additional support data"
                    value={newAgent.supportData}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, supportData: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCreateAgent}>Create Agent</Button>
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
                      "w-full px-4 py-2 text-left text-[#ffffff] hover:bg-accent/20 transition-colors",
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
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl text-white font-semibold mb-4">
                      {selectedAgent.name}
                    </h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsEditing(true)} className="cursor-pointer">
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
                    <div>
                      <Label className="text-white">First Sentence</Label>
                      <div className="text-sm text-gray-400">
                        {selectedAgent.firstSentence}
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Agent Type</Label>
                      <div className="text-sm text-gray-400">
                        {selectedAgent.agentType}
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Who Are You</Label>
                      <div className="text-sm text-gray-400">
                        {selectedAgent.whoAreYou}
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Goal</Label>
                      <div className="text-sm text-gray-400">
                        {selectedAgent.goal}
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Voice</Label>
                      <div className="text-sm text-gray-400">
                        {selectedAgent.voice}
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Settings</Label>
                      <div className="text-sm text-gray-400">
                        Starts First: {selectedAgent.startFirst ? "Yes" : "No"}
                        <br />
                        Allows Interruptions:{" "}
                        {selectedAgent.allowInterruptions ? "Yes" : "No"}
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
    </>
  );
}
