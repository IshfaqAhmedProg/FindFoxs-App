import { useAuth } from "@/contexts/AuthContext";
import createTask from "@/shared/functions/createTask";
import {
  GoogleMapsScraperFormData,
  UToolFormData,
} from "@/shared/hooks/useToolForm";
import { useRouter } from "next/router";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import GoogleMapsScraperInput from "./GoogleMapsScraperInput";

export default function GoogleMapsScraper() {
  const router = useRouter();
  const { user } = useAuth();

  async function submitTask(formData: UToolFormData) {
    console.log("submitTask formData", formData);
    await createTask(
      user,
      {
        keywords: formData.textData,
        language: (formData as GoogleMapsScraperFormData).language,
        coords: (formData as GoogleMapsScraperFormData).coords,
      },
      "Google Maps Scraper",
      formData.textData.length,
      "keyword"
    ).then(() => {
      router.push("/tasks");
    });
  }

  return (
    <ToolsLayout
      title="Google Maps Scraper"
      toolVideo={<ToolVideo videoId="TF67a-48jlY" />}
    >
      <GoogleMapsScraperInput submitTask={submitTask} />
    </ToolsLayout>
  );
}
