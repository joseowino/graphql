const logoutBtn = document.getElementById("logoutBtn");
const identifierInput = document.getElementById("identifier");
const passwordInput = document.getElementById("password");
const loginSection = document.getElementById("login-section");
const profileSection = document.getElementById("profile-section");
const loginError = document.getElementById("login-error");
const userLogin = document.getElementById("user-login");
const xpGraph = document.getElementById("xp-graph");
const auditGraph = document.getElementById("audit-graph");

let jwt = null;

logoutBtn.addEventListener("click", () => {
  jwt = null;
  loginSection.style.display = "block";
  profileSection.style.display = "none";
});

async function fetchUserProfile() {
  const query = `
    {
      user {
        id
        login
      }
      transaction(where: { type: { _eq: "xp" } }) {
        amount
        createdAt
      }
      progress {
        grade
      }
    }
  `;

  const res = await fetch("https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  const user = data.data.user[0];
  userLogin.textContent = user.login;

  drawXPGraph(data.data.transaction);
  drawAuditGraph(data.data.progress);
}

function drawXPGraph(transactions) {
  const svg = xpGraph;
  svg.innerHTML = "";
  const maxXP = Math.max(...transactions.map(t => t.amount));
  const barWidth = 10;
  transactions.slice(0, 50).forEach((t, i) => {
    const barHeight = (t.amount / maxXP) * 180;
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", i * (barWidth + 2));
    rect.setAttribute("y", 200 - barHeight);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", "#4CAF50");
    svg.appendChild(rect);
  });
}

function drawAuditGraph(progress) {
  const svg = auditGraph;
  svg.innerHTML = "";
  const pass = progress.filter(p => p.grade === 1).length;
  const fail = progress.filter(p => p.grade === 0).length;
  const total = pass + fail;
  const passHeight = (pass / total) * 180;
  const failHeight = (fail / total) * 180;

  ["#4CAF50", "#F44336"].forEach((color, i) => {
    const height = i === 0 ? passHeight : failHeight;
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", 50 + i * 100);
    rect.setAttribute("y", 200 - height);
    rect.setAttribute("width", 50);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", color);
    svg.appendChild(rect);
  });
}
