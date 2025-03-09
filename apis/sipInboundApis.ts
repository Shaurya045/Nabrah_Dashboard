export interface SipInboundRequest {
    name: string;
    numbers: string[];
    allowed_addresses: string[];
    auth_username: string;
    auth_password: string;
  }
  
  export interface SipInboundResponse {
    id: string;
    name: string;
    numbers: string[];
    allowed_addresses: string[];
    auth_username: string;
    created_at: string;
    updated_at: string;
  }

const BASE_URL = 'https://api.nabrah.ai/api';

export const sipService = {
  // Create new SIP Inbound
  createSipInbound: async (data: SipInboundRequest, projectId: string | null): Promise<SipInboundResponse> => {
    try {
       // Get the auth token from localStorage
    const authToken = localStorage.getItem('auth-token');
    
    if (!authToken) {
      throw new Error('Authentication token not found');
    }
      const response = await fetch(`${BASE_URL}/sipInbound/?project_id=${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Add the auth token to headers
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating SIP inbound:', error);
      throw error;
    }
  },

  // Get all SIP Inbounds
  getAllSipInbounds: async (projectId: string | null): Promise<SipInboundResponse[]> => {
       // Get the auth token from localStorage
       const authToken = localStorage.getItem('auth-token');
    
       if (!authToken) {
         throw new Error('Authentication token not found');
       }

    try {
      const response = await fetch(`${BASE_URL}/sipInbound/?project_id=${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Add the auth token to headers
        },
      
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching SIP inbounds:', error);
      throw error;
    }
  },

  // Get specific SIP Inbound by ID
  getSipInboundById: async (sipId: string, projectId: string | null): Promise<SipInboundResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/sipInbound/${sipId}/?project_id=${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching SIP inbound:', error);
      throw error;
    }
  },

  // Delete SIP Inbound by ID
  deleteSipInbound: async (sipId: string, projectId: string | null): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/sipInbound/${sipId}/?project_id=${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting SIP inbound:', error);
      throw error;
    }
  },
};