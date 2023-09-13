import { useAuth } from "@/contexts/AuthContext";
import checkIfPNumber from "@/shared/functions/checkIfFunctions/checkIfPNumber";
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
  "phone",
  "phone_type",
  "phone_region",
  "country",
  "country_code",
  "country_prefix",
  "carrier",
];
const initialResultStat: Array<Stats> = publicStats.map((stat) => {
  return {
    statTitle: convertToReadableString(stat),
    stats: [
      {
        title: "Unknown",
      },
    ],
  };
});

export default function PhoneNumberValidator() {
  const router = useRouter();
  const { user } = useAuth();
  const [singleResult, fetchSingleDataResults, loadingSingleResult] =
    useSingleDataResult({
      initialResult: {
        resultScore: 0,
        resultReport: "No number validated yet!",
        resultStat: initialResultStat,
      },
      publicStats,
    }); //handles single input results
  async function submitSingle(formData: UToolFormData) {
    await fetchSingleDataResults(
      "/api/validators/validatePhoneNumber",
      JSON.stringify({
        number: formData.formattedData[0],
      }),
      formData
    );
  }
  async function submitTask(formData: UToolFormData) {
    await createTask(
      user,
      formData.formattedData,
      "Phone Number Validator",
      formData.formattedData.length,
      "number"
    ).then(() => router.push("/tasks"));
  }

  return (
    <ToolsLayout
      title="Phone Number Validator"
      toolVideo={<ToolVideo videoId="TF67a-48jlY" />}
      singleResultCard={
        <SingleResultCard
          loading={loadingSingleResult}
          confidence={singleResult.resultScore}
          result={singleResult.resultReport}
          resultStat={singleResult.resultStat}
        />
      }
    >
      <ValidatorsInput
        description="You can enter a single number or upload a file containing a list of numbers, make sure the file you upload is of .xlsx or .csv format. Also make sure the files have headers on the first row."
        unit="number"
        submitSingle={submitSingle}
        submitTask={submitTask}
        checkFunction={checkIfPNumber}
      />
    </ToolsLayout>
  );
}
