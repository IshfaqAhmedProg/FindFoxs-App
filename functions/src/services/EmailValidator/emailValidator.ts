/* eslint-disable */

interface IEmailPostAnalysis {
  Deliverable: number;
  No_Connect: number;
  Timeout: number;
  Unavailable_SMTP: number;
  Unexpected_Error: number;
  Low_Quality: number;
  Low_Deliverability: number;
  Invalid_Email: number;
  Invalid_Domain: number;
  Rejected_Email: number;
  Invalid_SMTP: number;
  total: number;
}
const emailValidator = async function (request: Array<string>) {
  const validatedEmails = await validateAllEmails(request);
  return validatedEmails;
};
const validateAllEmails = async (emails: Array<string>) => {
  const allAsyncResults = [];
  let postAnalysisData: IEmailPostAnalysis = {
    Deliverable: 0,
    No_Connect: 0,
    Timeout: 0,
    Unavailable_SMTP: 0,
    Unexpected_Error: 0,
    Low_Quality: 0,
    Low_Deliverability: 0,
    Invalid_Email: 0,
    Invalid_Domain: 0,
    Rejected_Email: 0,
    Invalid_SMTP: 0,
    total: 0,
  };
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "mailcheck.p.rapidapi.com",
    },
  };
  for (const item of emails) {
    const data = await (
      await fetch(`https://mailcheck.p.rapidapi.com/?domain=${item}`, options)
    ).json();
    postAnalysisData = await postAnalyseEmailValidator(
      data as Record<string, any>,
      postAnalysisData
    );
    const configdata = { ...(data as any), email: item };
    allAsyncResults.push(configdata);
  }
  allAsyncResults.push(postAnalysisData);
  return allAsyncResults;
};

async function postAnalyseEmailValidator(
  data: any,
  paData: IEmailPostAnalysis
) {
  paData.total++;
  if (data.valid == true && data.reason === "Whitelisted" && data.risk <= 8) {
    paData.Deliverable++;
  } else if (
    `${data.valid}${data.block}${data.disposable}${data.domain}${data.text}${data.reason}${data.risk}${data.mx_host}${data.typo}${data.mx_ip}${data.mx_info}${data.last_changed_at}` ==
    ""
  ) {
    paData.Unexpected_Error++, paData.Timeout++, paData.No_Connect++;
  } else if (data.risk > 20) {
    paData.Low_Quality++;
  } else if (data.reason.startsWith("Some anomalies detected")) {
    paData.Low_Deliverability++;
  } else if (data.valid == false) {
    paData.Invalid_Email++;
  } else if (data.text.startsWith("Invalid domain")) {
    paData.Invalid_Domain++;
  } else if (data.disposable == true) {
    paData.Rejected_Email++;
  } else if (data.mx_info.startsWith("No MX-pointer in DNS record.")) {
    paData.Invalid_SMTP++;
    paData.Unavailable_SMTP++;
  }
  return paData;
}
export default emailValidator;
