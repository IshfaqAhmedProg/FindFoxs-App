import { useState } from "react";
import analyseSingleDataResult from "../functions/analyseSingleDataResult";
import { SingleResult } from "../interfaces/ValidatorResponses";
import Stats from "../interfaces/Stats";
import { UToolFormData } from "./useToolForm";
interface Props {
  initialResult: {
    resultScore: number;
    resultReport: string;
    resultStat: Array<Stats>;
  };
  publicStats: any;
}

const useSingleDataResult = ({
  initialResult,
  publicStats,
}: Props): [
  SingleResult,
  (fetchUrl: string, body: string, formData: UToolFormData) => Promise<void>,
  boolean
] => {
  const [loadingSingleResult, setLoadingSingleResult] =
    useState<boolean>(false);
  const [singleResult, setSingleResult] = useState<SingleResult>(initialResult);

  async function fetchSingleDataResults(
    fetchUrl: string,
    body: string,
    formData: UToolFormData
  ) {
    // Initialise single result everytime new result is fetched to refresh stale data
    setSingleResult(initialResult);
    setLoadingSingleResult(true);
    try {
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await res.json();
      const statAnal = analyseSingleDataResult(
        data,
        publicStats,
        formData.formattedData[0]
      );
      console.log("statAnal", statAnal);
      setSingleResult({
        resultStat: statAnal.stat,
        resultScore: statAnal.score,
        resultReport: statAnal.report,
      });
      setLoadingSingleResult(false);
    } catch (err) {
      setLoadingSingleResult(false);
      throw new Error(`Error occured getting results`);
    }
  }

  return [singleResult, fetchSingleDataResults, loadingSingleResult];
};
export default useSingleDataResult;
