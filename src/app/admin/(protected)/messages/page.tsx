import { getMessages } from "@/app/actions/messages";
import MessagesClient from "./MessagesClient";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-gray-300">View and manage contact form inquiries.</p>
        </div>
      </div>
      
      <MessagesClient initialData={messages} />
    </div>
  );
}
