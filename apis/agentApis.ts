import axios from 'axios';

const BASE_URL = 'https://api.nabrah.ai/api';

// Define interfaces for the agent data
interface AgentData {
  name: string;
  start_first: boolean;
  first_sentence: string;
  agent_type?: 'basic' | string;
  who_are_you: string;
  goal: string;
  steps: string;
  allow_interruptions: boolean;
  voice?: string;
  support_data: string;
}

interface Agent extends AgentData {
  id: string;
  createdAt: Date;
}


// 1. POST /api/agent - Create a new agent
export const createAgent = async (agentData: AgentData, projectId: string): Promise<Agent> => {
  const payload = {
    name: agentData.name,
    start_first: agentData.start_first,
    first_sentence: agentData.first_sentence,
    agent_type: agentData.agent_type || 'basic',
    who_are_you: agentData.who_are_you,
    goal: agentData.goal,
    steps: agentData.steps,
    allow_interruptions: agentData.allow_interruptions,
    voice: agentData.voice || 'dania',
    support_data: agentData.support_data,
  };

  const authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }

  try {
    const response = await axios.post<Agent>(`${BASE_URL}/agent?project_id=${projectId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      console.error('Validation error:', error.response.data);
      throw new Error('Invalid data provided to create agent');
    }
    console.error('Error creating agent:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

// 2. GET /api/agent - Get all agents
export const getAllAgents = async (projectId: string | null): Promise<Agent[]> => {
  const authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }
  try {
    const response = await axios.get<Agent[]>(`${BASE_URL}/agent/?project_id=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting agents:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

// 3. GET /api/agent/{agent_id} - Get agent by ID
export const getAgentById = async (agentId: string, projectId: string | null): Promise<Agent> => {
  const authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }
  try {
    const response = await axios.get<Agent>(`${BASE_URL}/agent/${agentId}/?project_id=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting agent:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

// 4. DELETE /api/agent/{agent_id} - Delete agent by ID
export const deleteAgent = async (agentId: string, projectId: string | null): Promise<void> => {
  const authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }
  try {
    await axios.delete(`${BASE_URL}/agent/${agentId}/?project_id=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error('Error deleting agent:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

// 5. PUT /api/agent/{agent_id} - Update agent by ID
export const updateAgent = async (agentId: string, agentData: AgentData, projectId: string | null): Promise<Agent> => {
  const payload = {
    name: agentData.name,
    start_first: agentData.start_first,
    first_sentence: agentData.first_sentence,
    agent_type: agentData.agent_type || 'basic',
    who_are_you: agentData.who_are_you,
    goal: agentData.goal,
    steps: agentData.steps,
    allow_interruptions: agentData.allow_interruptions,
    voice: agentData.voice || 'dania',
    support_data: agentData.support_data,
  };

  const authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }

  try {
    const response = await axios.put<Agent>(`${BASE_URL}/agent/${agentId}/?project_id=${projectId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      console.error('Validation error:', error.response.data);
      throw new Error('Invalid data provided to update agent');
    }
    console.error('Error updating agent:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};
