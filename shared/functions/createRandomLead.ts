import { faker } from "@faker-js/faker";
import { Lead } from "../interfaces/Lead";

function createRandomLead(): Lead {
  const companyName = faker.company.name();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    _id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    image: faker.image.avatarGitHub(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email({ firstName, lastName }),
    phoneNumber: faker.phone.number("501-###-###"),
    location: `${faker.location.country()}, ${faker.location.state()}, ${faker.location.city()}`,
    companyName: companyName,
    companyWebsite: `${encodeURIComponent(companyName)}.com`,
    industry: "Public Relations",
  };
}
export default function createRandomLeadArray(numUsers = 5): Array<Lead> {
  return Array.from({ length: numUsers }, createRandomLead);
}
