import { SimpleLink } from "@/shared/interfaces/Links";
interface RouteCollection {
  [key: string]: SimpleLink;
}

const mainRoutes: RouteCollection = {
  dashboard: {
    name: "Dashboard",
    goto: "/dashboard",
  },
  leads: {
    name: "Leads",
    goto: "",
    children: {
      search: { name: "Search Leads", goto: "/leads/search" },
      manage: { name: "Manage Your Leads", goto: "/leads/manage" },
      engage: { name: "Engage with Leads", goto: "/leads/engage" },
    },
  },
  tools: {
    name: "Tools",
    goto: "",
    children: {
      emailValidator: {
        name: "Email Validator",
        goto: "/tools/emailValidator",
      },
      phoneNumberValidator: {
        name: "Phone Number Validator",
        goto: "/tools/phoneNumberValidator",
      },
      googleMapsScraper: {
        name: "Google Maps Scraper",
        goto: "/tools/googleMapsScraper",
      },
      emailsAndContactsScraper: {
        name: "Emails and Contacts Scraper",
        goto: "/tools/emailsAndContactsScraper",
      },
      facebookScraper: {
        name: "Facebook Scraper",
        goto: "/tools/facebookScraper",
      },
    },
  },
  tasks: {
    name: "Tasks",
    goto: "/tasks",
  },
  settings: {
    name: "Settings",
    goto: "/",
  },
};
export function findRouteNameByUrl(
  url: string,
  routes: RouteCollection | undefined = mainRoutes
): string {
  for (const route of Object.values(routes)) {
    if (url === route.goto) {
      return route.name; // Found a match at this level
    }

    if (route.children) {
      const matchedChildRoute = findRouteNameByUrl(url, route.children);
      if (matchedChildRoute !== "") {
        return matchedChildRoute; // Found a match in the child routes or subchild routes
      }
    }
  }
  return ""; // No match found in the current level or any of its children
}
export default mainRoutes;
