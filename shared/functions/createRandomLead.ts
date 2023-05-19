import { faker } from "@faker-js/faker";
import { Leads } from "../interfaces/Leads";

function createRandomLead(): Leads {
  const companyName = faker.company.name();
  return {
    _id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    avatar: faker.image.avatar(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    location: `${faker.location.country()}, ${faker.location.state()}, ${faker.location.city()}`,
    companyName: companyName,
    companyWebsite: `${encodeURIComponent(companyName)}.com`,
    industry: "Public Relations",
  };
}
export default function createRandomLeadArray(numUsers = 5): Array<Leads> {
  return Array.from({ length: numUsers }, createRandomLead);
}
