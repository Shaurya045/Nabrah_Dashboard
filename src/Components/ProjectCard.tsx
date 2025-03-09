import { Pencil, Trash2 } from 'lucide-react';
import { Project } from "../Pages/Project"

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;   
}

export function ProjectCard({ onOpen, project, onEdit, onDelete }: ProjectCardProps) {
    const handleEdit = (e: any) => {
        e.stopPropagation();
        onEdit(project);
    }

    const handleDelete = (e: any) => {
        e.stopPropagation();
        onDelete(project.id);
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" onClick={() => onOpen(project.id)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
          {project.description && (
            <p className="mt-2 text-gray-600">{project.description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}