import { schema } from "./query.js";

const { data } = (await schema()) || { data: {} };

console.log("Fetched data:", data);

export const user = {
  id: data?.user?.id ?? null,
  login: data?.user?.login ?? "Guest",
};
