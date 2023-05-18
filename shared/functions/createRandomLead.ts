import { faker } from "@faker-js/faker";
export interface Leads {
  _id: string;
  avatar: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyWebsite: string;
}
function createRandomLead(): Leads {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    companyName: faker.company.name(),
    companyWebsite: `${faker.company.name()}.com`,
  };
}
export default function createRandomLeadArray(numUsers = 5): Array<Leads> {
  return Array.from({ length: numUsers }, createRandomLead);
}
