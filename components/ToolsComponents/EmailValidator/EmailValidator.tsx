import { useAuth } from "@/contexts/AuthContext";
import checkIfEmail from "@/shared/functions/checkIfFunctions/checkIfEmail";
import createTask from "@/shared/functions/createTask";
import convertToReadableString from "@/shared/functions/stringTransformers/convertToReadableString";
import useSingleDataResult from "@/shared/hooks/useSingleDataResult";
import { UToolFormData } from "@/shared/hooks/useToolForm";
import Stats from "@/shared/interfaces/Stats";
import { useRouter } from "next/navigation";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";

const publicStats = [
  "email",
  "inbox_exists",
  "reason",
  "disposable",
  "possible_typo",
  "mx_info",
  "risk",
];
const initialResultStat: Array<Stats> = publicStats.map((stat) => {
  return {
    statTitle: convertToReadableString(stat),
    stats: [
      {
        title: stat == "risk" ? 0 : "Unknown",
      },
    ],
  };
});

export default function EmailValidator() {
  const router = useRouter();
  const { user } = useAuth();
  const [singleResult, fetchSingleDataResults, loadingSingleResult] =
    useSingleDataResult({
      initialResult: {
        resultScore: 0,
        resultReport: "No email validated yet!",
        resultStat: initialResultStat,
      },
      publicStats,
    }); //handles single input results
  async function submitSingle(formData: UToolFormData) {
    await fetchSingleDataResults(
      "/api/validators/validateEmail",
      JSON.stringify({
        domain: formData.formattedData[0],
      }),
      formData
    );
  }
  async function submitTask(formData: UToolFormData) {
    await createTask(
      user,
      formData.formattedData,
      "Email Validator",
      formData.formattedData.length,
      "email"
    ).then(() => router.push("/tasks"));
  }
  return (
    <ToolsLayout
      title="Email Validator"
      singleResultCard={
        <SingleResultCard
          loading={loadingSingleResult}
          confidence={singleResult.resultScore}
          result={singleResult.resultReport}
          resultStat={singleResult.resultStat}
        />
      }
      toolVideo={<ToolVideo videoId="TF67a-48jlY" />}
    >
      <ValidatorsInput
        description="You can enter a single email or upload a file containing a list of emails, make sure the file you upload is of .xlsx or .csv format. Also make sure the files have headers on the first row."
        unit="email"
        submitSingle={submitSingle}
        submitTask={submitTask}
        checkFunction={checkIfEmail}
      />
    </ToolsLayout>
  );
}
