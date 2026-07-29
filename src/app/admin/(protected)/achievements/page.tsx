import { getAllAchievements } from "@/app/actions/achievements";
import AchievementsClient from "./AchievementsClient";

export default async function AchievementsPage() {
  const data = await getAllAchievements();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gradient">Achievements</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your hackathons, competitions, awards, and coding badges.</p>
      </div>
      <AchievementsClient initialData={data} />
    </div>
  );
}
