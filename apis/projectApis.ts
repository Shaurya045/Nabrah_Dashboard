interface Project {
  name: string;
}
export const fetchProjects = async () => {
    const response = await fetch('https://api.nabrah.ai/api/project');
    return response.json();
  };
  
  export const createProject = async (projectData: Project) => {
    // Get the auth token from localStorage
    const authToken = localStorage.getItem('auth-token');
    
    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch('https://api.nabrah.ai/api/project/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Add the auth token to headers
      },
      body: JSON.stringify(projectData),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }
  
    return response.json();
};

export default createProject
  
  export const getProject = async (projectId: string) => {
    const response = await fetch(`https://api.nabrah.ai/api/project?projectId=${projectId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  export const deleteProject = async (projectId: string) => {
    const response = await fetch(`https://api.nabrah.ai/api/project?projectId=${projectId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  export const updateProject = async (projectId: string, projectData: Project) => {
    // Get the auth token from localStorage
    const authToken = localStorage.getItem('auth-token');
    
    if (!authToken) {
      throw new Error('Authentication token not found');
    }
    const response = await fetch(`https://api.nabrah.ai/api/project?projectId=${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(projectData),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }
  
    return response.json();
  };