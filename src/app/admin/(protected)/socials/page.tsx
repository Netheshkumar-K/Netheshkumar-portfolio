"use server";

import { getSocials } from "@/app/actions/socials";
import SocialsClient from "./SocialsClient";

export default async function SocialsPage() {
  const socials = await getSocials();
  return <SocialsClient initialSocials={socials} />;
}
