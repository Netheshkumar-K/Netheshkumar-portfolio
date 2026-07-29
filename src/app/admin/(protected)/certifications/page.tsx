import { getAllCertifications } from "@/app/actions/certifications";
import CertificationsClient from "./CertificationsClient";

export default async function CertificationsPage() {
  const data = await getAllCertifications();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gradient">Certifications</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your course certifications and credentials.</p>
      </div>
      <CertificationsClient initialData={data} />
    </div>
  );
}
