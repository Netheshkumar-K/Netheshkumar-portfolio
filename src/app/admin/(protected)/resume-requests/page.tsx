"use server";

import { getResumeRequests } from "@/app/actions/resume";
import ResumeRequestsClient from "./ResumeRequestsClient";

export default async function ResumeRequestsPage() {
  const requests = await getResumeRequests();
  return <ResumeRequestsClient initialRequests={requests} />;
}
