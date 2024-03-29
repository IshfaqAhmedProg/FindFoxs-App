import {
  EmailValidatorResponse,
  PhoneNumberValidatorResponse,
} from "../interfaces/ValidatorResponses";
import convertToReadableString from "./stringTransformers/convertToReadableString";
import getRandomArbitrary from "./getRandomArbitrary";
import isBoolean from "validator/lib/isBoolean";

export default function analyseSingleDataResult(
  response: EmailValidatorResponse | PhoneNumberValidatorResponse,
  publicStats: Array<string>,
  input: string
) {
  if (isEmailResponse(response)) {
    return {
      stat: generateStatStruct(response, publicStats),
      report: emailReport(response),
      score: Math.floor(
        (convertInputToPercentage(input) + emailScore(response)) * 100
      ),
    };
  } else {
    return {
      stat: generateStatStruct(response, publicStats),
      report: phoneReport(response),
      score: Math.floor(
        (convertInputToPercentage(input) + phoneScore(response)) * 100
      ),
    };
  }
}

export function isEmailResponse(
  response: EmailValidatorResponse | PhoneNumberValidatorResponse
): response is EmailValidatorResponse {
  return (response as EmailValidatorResponse).valid !== undefined;
}

function convertInputToPercentage(str: string): number {
  if (typeof str === "string") {
    const asciiValues = str.split("").map((char) => char.charCodeAt(0));

    const sum = asciiValues.reduce((acc, value) => acc + value, 0);

    console.log("sum", sum);
    const normalizedValue = sum / (asciiValues.length * 255);
    console.log("normalizedValue", normalizedValue);

    const percentage =
      normalizedValue < 0.1 ? normalizedValue : normalizedValue * 0.1;
    console.log("percentage", percentage);
    return percentage;
  }
  return getRandomArbitrary(0, 0.1);
}

function generateStatStruct(response: any, publicStats: Array<string>) {
  return publicStats.map((key) => {
    const value = response[key];
    return {
      statTitle: convertToReadableString(key),
      stats: [
        {
          title: isBoolean(value.toString())
            ? convertToReadableString(value)
            : !Array.isArray(value)
            ? value ?? "-"
            : value.length > 0
            ? JSON.stringify(value)
            : "None",
        },
      ],
    };
  });
}
function emailScore(response: EmailValidatorResponse): number {
  const { inbox_exists, valid } = response;
  console.log("valid", valid);
  let score = 0;
  if (inbox_exists) {
    // High score for valid and inbox exists
    score = getRandomArbitrary(0.82, 0.85);
  } else if (valid && !inbox_exists) {
    // Lower score for valid but inbox doesnt exist
    score = getRandomArbitrary(0.42, 0.45);
  } else {
    // Lowest score for invalid
    score = getRandomArbitrary(0.12, 0.15);
  }
  return score;
}
function phoneScore(response: PhoneNumberValidatorResponse): number {
  const { phone_valid } = response;

  if (phone_valid) {
    // High score for valid and not disposable
    return 0.85;
  } else {
    // Lowest score for invalid
    return 0.15;
  }
}
function emailReport(response: EmailValidatorResponse): string {
  const { valid, disposable, inbox_exists, possible_typo } = response;

  if (valid && inbox_exists) {
    // High score for valid and not disposable
    return "Valid Email";
  } else if (valid && disposable && inbox_exists) {
    // Lower score for valid but disposable
    return "Disposable Email";
  } else if (possible_typo.length > 0) {
    // Lowest score for invalid
    return "Check for Typo";
  } else {
    return "Invalid Email";
  }
}
function phoneReport(response: PhoneNumberValidatorResponse): string {
  const { status, phone_valid } = response;

  if (phone_valid && status == "success") {
    // High score for phone_valid and not disposable
    return "Valid Phone Number";
  } else {
    // Lower score for valid but disposable
    return "Invalid Phone Number";
  }
}
