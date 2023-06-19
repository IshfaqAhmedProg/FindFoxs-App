import { useState } from "react";
import analyseSingleDataResult from "../functions/analyseSingleDataResult";
import { SingleResult } from "../interfaces/ValidatorResponses";
import Stats, { Stat } from "../interfaces/Stats";
import { IToolFormData } from "../interfaces/ToolForm";
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
  (fetchUrl: string, body: string, formData: IToolFormData) => Promise<void>,
  boolean
] => {
  const [loadingSingleResult, setLoadingSingleResult] =
    useState<boolean>(false);
  const [singleResult, setSingleResult] = useState<SingleResult>(initialResult);
  function fetchSingleDataResults(
    fetchUrl: string,
    body: string,
    formData: IToolFormData
  ) {
    setLoadingSingleResult(true);
    return fetch(fetchUrl, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        const statAnal = analyseSingleDataResult(
          data,
          publicStats,
          formData.formattedData[0]
        );
        setSingleResult({
          resultStat: statAnal.stat,
          resultScore: statAnal.score,
          resultReport: statAnal.report,
        });
        setLoadingSingleResult(false);
      })
      .catch((err) => {
        console.log(err);
        setSingleResult({
          resultStat: [],
          resultScore: 404,
          resultReport: err.status,
        });
        setLoadingSingleResult(false);
      });
  }
  return [singleResult, fetchSingleDataResults, loadingSingleResult];
};
export default useSingleDataResult;
