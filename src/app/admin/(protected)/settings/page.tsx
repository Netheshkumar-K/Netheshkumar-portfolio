"use server";

import SettingsClient from "./SettingsClient";
import { getSettings } from "@/app/actions/settings";

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsClient initialSettings={settings} />;
}
