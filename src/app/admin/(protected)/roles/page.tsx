"use server";

import { getRoles } from "@/app/actions/roles";
import RolesClient from "./RolesClient";

export default async function RolesPage() {
  const roles = await getRoles();
  return <RolesClient initialRoles={roles} />;
}
