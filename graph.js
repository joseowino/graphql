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

  const skillsData = user.skillTypes.map(skill => skill.amount);
  if (!skillsData || skillsData.length === 0) {
    console.error('No skills data available to draw the chart.');
    return;
  }

  console.log('Skills Data:', skillsData);
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
















