import { schema } from "./query.js";

const fetchData = async () => {
  if (window.location.href !== 'http://127.0.0.1:5500/index.html') {
    console.log("Loaded window: ", window.location.href)
    return;
  }

  try {
    const result = await schema();

    const { data } = result || { data: {} };
    console.log("Result:", result.data.user[0].login);

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
      events: result.data.user[0].events ?? [],
    };
  } catch (error) {
    console.error("Error in fetchData:", error);
    return { 
      id: null, 
      login: "Guest",
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
      events: [],
    };
  }
};

export const user = await fetchData();
