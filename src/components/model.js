import { schema } from "./query.js";

const fetchData = async () => {  
  const expectedPath = `${location.origin}/main.html`;
  if (location.href !== expectedPath) {
    return;
  }
  
  try {
    const result = await schema();

    const { data } = result || { data: {} };

    if (!data) {
      console.error("No data returned from schema query.");
      return { id: null, login: "Guest" };
    }

    if (!data.user) {
      console.error("No user data returned from schema query.");
      return { id: null, login: "Guest" };
    }

    return {
      id: result.data.user[0].id ?? null,
      login: result.data.user[0].login ?? "Guest",
      firstName: result.data.user[0].attrs?.firstName ?? "",
      lastName: result.data.user[0].attrs?.lastName ?? "",
      email: result.data.user[0].attrs?.email ?? "",
      profile: result.data.user[0].profile ?? null,
      campus: result.data.user[0].campus ?? null,
      attrs: result.data.user[0].attrs ?? {},
      results: result.data.user[0].results ?? [],
      transactions: result.data.user[0].transactions ?? [],
      xpHistory: result.data.user[0].xpHistory ?? [],
      totalXP: result.data.user[0].totalXP ?? [],
      upTransactions: result.data.user[0].upTransactions ?? [],
      downTransactions: result.data.user[0].downTransactions ?? [],
      xpTimeline: result.data.user[0].xpTimeline ?? [],
      skillTypes: result.data.user[0].skillTypes?.nodes ?? [],
      level: result.data.user[0].events[0].level ?? 0,
      events: result.data.event[0].object.attrs ?? {},
      grade: result.data.user[0].progresses[0].grade ?? "N/A",
    };
  } catch (error) {
    console.error("Error in fetchData:", error);
    return { 
      id: null, 
      login: "Guest",
      firstName: "",
      lastName: "",
      email: "",
      profile: null,
      campus: null,
      attrs: {},
      results: [],
      transactions: [],
      xpHistory: [],
      totalXP: [],
      upTransactions: [],
      downTransactions: [],
      xpTimeline: [],
      skillTypes: [],
      level: 0,
      events: {},
      grade: "N/A"
    };
  }
};

export const user = await fetchData();
