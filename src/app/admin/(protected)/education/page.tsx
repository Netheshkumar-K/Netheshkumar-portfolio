import { getEducations } from "@/app/actions/education";
import EducationClient from "./EducationClient";

export default async function EducationPage() {
  const educations = await getEducations();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-gray-300">Manage your educational background.</p>
        </div>
      </div>
      
      <EducationClient initialData={educations} />
    </div>
  );
}
