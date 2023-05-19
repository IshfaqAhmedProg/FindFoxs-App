import industries from "@/shared/data/ListOfIndustries.json";

export interface Leads {
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
