import { getProjects } from "@/app/actions/projects";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-300">Manage your portfolio projects.</p>
        </div>
      </div>
      
      <ProjectsClient initialData={projects} />
    </div>
  );
}
