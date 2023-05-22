import industries from "@/shared/data/ListOfIndustries.json";
export interface Lead {
  _id: string;
  avatar: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  name: string;
  location: string;
  companyName: string;
  companyWebsite: string;
  industry: (typeof industries)[number];
}
export const leadPublicFields = [
  "Job Title",
  "Company",
  "Location",
  "Industry",
];
export interface LeadFilters {
  title: (typeof leadPublicFields)[number];
  icon: React.ReactElement;
}
export const leadSearchTypes = ["Individual", "Company"];

export type LeadSearchType = (typeof leadSearchTypes)[number];
