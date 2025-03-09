'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProjectContextType {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectId, setProjectIdState] = useState<string | null>(() => {
    // Retrieve the initial value from localStorage, if it exists
    return localStorage.getItem('projectId');
  });

  const setProjectId = (id: string) => {
    setProjectIdState(id);
    // Store the projectId in localStorage
    if (id) {
      localStorage.setItem('projectId', id);
    } else {
      localStorage.removeItem('projectId');
    }
  };

  // Ensure the projectId is initialized from localStorage on first render
  useEffect(() => {
    const storedProjectId = localStorage.getItem('projectId');
    if (storedProjectId) {
      setProjectIdState(storedProjectId);
    }
  }, []);

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
