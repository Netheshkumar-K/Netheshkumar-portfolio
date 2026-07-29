import { getSkills } from "@/app/actions/skills";
import SkillsClient from "./SkillsClient";

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-300">Manage technical skills and proficiency levels.</p>
        </div>
      </div>
      
      <SkillsClient initialData={skills} />
    </div>
  );
}
