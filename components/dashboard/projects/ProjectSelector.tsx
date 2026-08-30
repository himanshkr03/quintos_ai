// File: E:\quintos_ai\components\dashboard\projects\ProjectSelector.tsx

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  FolderGit2,
  ChevronDown,
  Plus,
  Check,
  Loader2,
  X,
  Layers,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";

export interface ProjectItem {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
}

interface ProjectSelectorProps {
  currentProjectId?: string | null;
  onSelectProject?: (project: ProjectItem) => void;
  className?: string;
}

export default function ProjectSelector({
  currentProjectId,
  onSelectProject,
  className = "",
}: ProjectSelectorProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(
    currentProjectId || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        const list: ProjectItem[] = data.projects || [];
        setProjects(list);
        if (!selectedId && list.length > 0) {
          const savedId = typeof window !== "undefined" ? localStorage.getItem("quintos_active_project_id") : null;
          const found = list.find((p) => p.id === savedId) || list[0];
          setSelectedId(found.id);
          onSelectProject?.(found);
        }
      }
    } catch (err) {
      console.warn("[Fetch Projects Warning]:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedId, onSelectProject]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeProject =
    projects.find((p) => p.id === selectedId) ||
    projects[0] || {
      id: "default",
      name: "Primary Research Workspace",
      description: null,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

  const handleSelect = (project: ProjectItem) => {
    setSelectedId(project.id);
    if (typeof window !== "undefined") {
      localStorage.setItem("quintos_active_project_id", project.id);
    }
    onSelectProject?.(project);
    setIsOpen(false);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || isCreating) return;

    setIsCreating(true);
    setCreateError(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProjectName.trim(),
          description: newProjectDesc.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCreateError(data?.error?.message || "Failed to create project.");
        setIsCreating(false);
        return;
      }

      if (data.project) {
        setProjects((prev) => [data.project, ...prev]);
        handleSelect(data.project);
      }

      setIsModalOpen(false);
      setNewProjectName("");
      setNewProjectDesc("");
    } catch (err) {
      console.error("[Create Project Exception]:", err);
      setCreateError("An error occurred while creating the project.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className={`relative ${className}`} ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Select active project workspace"
        >
          <FolderGit2 className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="max-w-[120px] sm:max-w-[160px] truncate text-left">
            {activeProject.name}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 mt-2 w-64 sm:w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
            <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Workspaces
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition"
              >
                <Plus className="h-3 w-3" />
                <span>New</span>
              </button>
            </div>

            <div className="py-1 max-h-56 overflow-y-auto space-y-0.5">
              {isLoading && projects.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto text-blue-600 mb-1" />
                  <span>Loading projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="py-4 px-2 text-center text-xs text-slate-500">
                  <p>No projects found.</p>
                </div>
              ) : (
                projects.map((p) => {
                  const isSelected = p.id === activeProject.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelect(p)}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs transition ${
                        isSelected
                          ? "bg-blue-50/80 font-bold text-blue-900"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="truncate">
                        <p className="truncate font-medium">{p.name}</p>
                        {p.description && (
                          <p className="text-[10px] text-slate-400 truncate">
                            {p.description}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="h-4 w-4 text-blue-600 shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <div className="pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition text-left"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Research Workspace</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create New Project */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Workspace Isolation
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Create Research Project
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Isolate models, API keys, datasets, and reasoning trajectories.
                </p>
              </div>

              {createError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-800">
                  {createError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Workspace Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Molecular VQE Cluster"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  disabled={isCreating}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Goals, target datasets, or hardware cluster references."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  disabled={isCreating}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isCreating}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isCreating}
                  leftIcon={
                    isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )
                  }
                >
                  {isCreating ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
