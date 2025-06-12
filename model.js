import { schema } from "./query.js";

const fetchData = async () => {
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
      id: data.user.id ?? null,
      login: data.user.login ?? "Guest",
      profile: data.user.profile ?? null,
      campus: data.user.campus ?? null,
      attrs: data.user.attrs ?? {},
      results: data.user.results ?? [],
      transactions: data.user.transactions ?? [],
      xpHistory: data.user.xpHistory ?? [],
      totalXP: data.user.totalXP ?? [],
      upTransactions: data.user.upTransactions ?? [],
      downTransactions: data.user.downTransactions ?? [],
      xpTimeline: data.user.xpTimeline ?? [],
      skillTypes: data.user.skillTypes?.nodes ?? [],
      events: data.user.events ?? [],
    };
  } catch (error) {
    console.error("Error in fetchData:", error);
    // return { 
    //   id: null, 
    //   login: "Guest",
    //   profile: null,
    //   campus: null,
    //   attrs: {},
    //   results: [],
    //   transactions: [],
    //   xpHistory: [],
    //   totalXP: [],
    //   upTransactions: [],
    //   downTransactions: [],
    //   xpTimeline: [],
    //   skillTypes: [],
    //   events: [],
    // };
  }
};

export const user = await fetchData();
