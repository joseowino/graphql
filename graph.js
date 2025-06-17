import { xpTimeline } from './calc.js';

const xpTimeChartCtx = document.getElementById('xpTimeChart');
const skillsChartCtx = document.getElementById('skillsChart');

export function drowGraph(user) {

  const xpTimelineData = xpTimeline(user);
  if (!xpTimelineData || xpTimelineData.length === 0) {
    console.error('No XP timeline data available to draw the chart.');
    return;
  }

  console.log('XP Timeline Data:', xpTimelineData);

  const xpData = user.xpTimeline.map(entry => entry.amount);
  if (!xpData || xpData.length === 0) {
    console.error('No XP data available to draw the chart.');
    return;
  }

  console.log('XP Data:', xpData);
  drawXpTimeChart(xpData);

  const skillsData = user.skillTypes;
  if (!skillsData || skillsData.length === 0) {
    console.error('No skills data available to draw the chart.');
    return;
  }

  console.log('Skills Data:', skillsData);
  drawSkillsChart(skillsData);
}


function drawXpTimeChart(data) {
  const svg = document.getElementById('lineGraph');
    const width = 500;
    const height = 300;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const maxY = Math.max(...data);
    const stepX = graphWidth / (data.length - 1);

    // Generate points
    const points = data.map((value, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (value / maxY) * graphHeight;
      return { x, y };
    });

    // Draw axes
    const axes = `
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="axis"/>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="axis"/>
    `;

    // Draw polyline
    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
    const polyline = `<polyline class="line" points="${polylinePoints}"/>`;

    // Draw points
    const circles = points.map(p => `<circle class="point" cx="${p.x}" cy="${p.y}" r="4"/>`).join('');

    // Combine and inject into SVG
    svg.innerHTML = axes + polyline + circles;

}

function drawSkillsChart(data) {
  const svg = document.getElementById('radarChart');
  const width = svg.width.baseVal.value;
  const height = svg.height.baseVal.value;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxLevel = 10;
  const radius = 180;
  const angleStep = (2 * Math.PI) / data.length;

  // Draw circular web (levels)
  for (let level = 1; level <= maxLevel; level++) {
    const r = (radius / maxLevel) * level;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const points = data.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
    path.setAttribute("points", points);
    path.setAttribute("class", "web");
    svg.appendChild(path);
  }

  // Draw axis lines
  data.forEach((data, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("class", "axis");
    svg.appendChild(line);

    // Add skill labels
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y);
    label.setAttribute("class", "label");
    label.textContent = data.type;
    label.setAttribute("dy", y < centerY ? -8 : 14);
    svg.appendChild(label);
  });

  // Draw skill shape
  const shapePoints = data.map((data, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const levelRatio = data.amount / maxLevel;
    const x = centerX + radius * levelRatio * Math.cos(angle);
    const y = centerY + radius * levelRatio * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  const shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  shape.setAttribute("points", shapePoints);
  shape.setAttribute("class", "shape");
  svg.appendChild(shape);
}
