import { useAuth } from "@/contexts/AuthContext";
import createTask from "@/shared/functions/createTask";
import { UToolFormData } from "@/shared/hooks/useToolForm";
import { useRouter } from "next/router";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import FacebookScraperInput from "./FacebookScraperInput";

export default function FacebookScraper() {
  const { user } = useAuth();
  const router = useRouter();
  async function submitTask(formData: UToolFormData) {
    await createTask(
      user,
      formData.formattedData,
      "Facebook Scraper",
      formData.formattedData.length,
      "page"
    )
      .then(() => router.push("/tasks"))
      .catch((err: any) => console.log(err));
  }
  return (
    <ToolsLayout
      title="Facebook Scraper"
      toolVideo={<ToolVideo videoId="TF67a-48jlY" />}
    >
      <FacebookScraperInput submitTask={submitTask} />
    </ToolsLayout>
  );
}
