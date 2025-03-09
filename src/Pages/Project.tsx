import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import { getProject, createProject, deleteProject, updateProject, fetchProjects } from '../../apis/projectApis';
import { ProjectForm } from '@/Components/ProjectForm';
import { ProjectCard } from '@/Components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/contexts/projectContext';

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

function Project() {
  // Initialize as an empty array instead of undefined
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setProjectId } = useProject();

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setIsLoading(true);
      const data = await fetchProjects();
      // Ensure data is an array before setting it
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
        setError('Invalid data format received');
      }
    } catch (err) {
      setError('Failed to load projects');
      setProjects([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateProject(data: CreateProjectPayload) {
    try {
      setIsLoading(true);
      const newProject = await createProject(data);
      setProjects(prev => [...prev, newProject]);
      setIsFormOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to create project');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateProject(data: CreateProjectPayload) {
    if (!editingProject) return;
    try {
      setIsLoading(true);
      const updated = await updateProject(editingProject.id, data);
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
      setEditingProject(null);
      setError(null);
    } catch (err) {
      setError('Failed to update project');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      setIsLoading(true);
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete project');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetProjectDetails(id: string) {
    try {
      console.log('Getting project details for:', id);
      setProjectId(id);
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to get project details');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] p-8">
      <div className="">
        <img src="/DARKLOGO.png" alt="Logo" className="h-12 w-auto" />
      </div>
      <div className="border my-8 rounded-lg py-4 px-8 h-[calc(100vh-150px)]">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-1 text-sm text-black">Manage your projects</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            disabled={isLoading}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 mx-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {(isFormOpen || editingProject) && (
          <div className="fixed inset-0 bg-gray-800/75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? 'Edit Project' : 'New Project'}
              </h2>
              <ProjectForm
                project={editingProject ?? undefined}
                onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingProject(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="mt-6 px-4 sm:px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <>
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-black">No projects yet. Create your first project!</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={handleGetProjectDetails}
                      onEdit={setEditingProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;