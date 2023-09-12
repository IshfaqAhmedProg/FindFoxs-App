import { useAuth } from "@/contexts/AuthContext";
import createTask from "@/shared/functions/createTask";
import { UToolFormData } from "@/shared/hooks/useToolForm";
import { useRouter } from "next/router";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import EmailsAndContactsScraperInput from "./EmailsAndContactsScraperInput";

export default function EmailsAndContactsScraper() {
  const { user } = useAuth();
  const router = useRouter();
  async function submitTask(formData: UToolFormData) {
    await createTask(
      user,
      formData.formattedData,
      "Emails And Contacts Scraper",
      formData.formattedData.length,
      "url"
    ).then(() => router.push("/tasks"));
  }
  return (
    <ToolsLayout
      title="Email And Contacts Scraper"
      toolVideo={<ToolVideo videoId="TF67a-48jlY" />}
    >
      <EmailsAndContactsScraperInput submitTask={submitTask} />
    </ToolsLayout>
  );
}
