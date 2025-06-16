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

  const skillsData = user.skillTypes.map(skill => skill.amount);
  if (!skillsData || skillsData.length === 0) {
    console.error('No skills data available to draw the chart.');
    return;
  }

  console.log('Skills Data:', skillsData);
}