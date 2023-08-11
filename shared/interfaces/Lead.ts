import industries from "@/shared/data/ListOfIndustries.json";
export interface Lead {
  _id: string;
  image?: string;
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
export interface LeadAction {
  title: (typeof leadPublicFields)[number];
  icon: React.ReactElement;
  handler?: (params: any) => void;
}

export const leadSearchTabs = ["Individual", "Company"];

