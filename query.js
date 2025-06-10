const endpoint = "https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql";
const query = `
  query {
    event(where: { id: { _eq: 75 } }) {
      object {
        attrs
      }
    }

    user {
      id
      profile
      campus
      login
      attrs

      results(order_by: { grade: desc }, limit: 5) {
        object {
          name
        }
        grade
      }

      transactions(where: { type: { _eq: "xp" } }) {
        amount
      }

      events(where: { eventId: { _eq: 75 } }) {
        level
      }

      xpHistory: transactions(
        where: { 
          _and: [
            { eventId: { _eq: 75 } },
            { type: { _eq: "xp" } }
          ]
        }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }

      totalXP: transactions(
        where: { eventId: { _eq: 75 } },
        order_by: { createdAt: asc }
      ) {
        object {
          name
          attrs
          type
        }
        amount
        createdAt
        eventId
        path
        type
      }

      upTransactions: transactions(where: { type: { _eq: "up" } }) {
        amount
      }

      downTransactions: transactions(where: { type: { _eq: "down" } }) {
        amount
      }

      xpTimeline: transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }

      skillTypes: transactions_aggregate(
        distinct_on: [type]
        where: { type: { _nin: ["xp", "level", "up", "down"] } }
        order_by: [{ type: asc }, { amount: desc }]
      ) {
        nodes {
          type
          amount
        }
      }
    }
  }
`;

export async function schema() {
  try {
    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Session expired. Please login again.");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error.message || "An error occurred while fetching data.");
  }

}
