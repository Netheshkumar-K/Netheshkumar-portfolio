import { getExperiences } from "@/app/actions/experience";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-gray-300">Manage your professional experience.</p>
        </div>
      </div>
      
      <ExperienceClient initialData={experiences} />
    </div>
  );
}
