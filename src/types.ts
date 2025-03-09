export interface Project {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface CreateProjectPayload {
    name: string;
    description?: string;
  }