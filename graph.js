import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
// import { xpTimeline } from './calc.js';

export function drawGraphs(user) {
  drawXpTimeChart(user);
  drawSkillsRadarChart(user);
}

function drawXpTimeChart(user) {
  const container = d3.select('#lineGraph');
  container.selectAll('*').remove();

  const margin = {top: 30, right: 30, bottom: 50, left: 60};
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Parse dates and sort data
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth() - 18, now.getDate());
  const data = user.xpTimeline
    .map(d => ({
      date: new Date(d.createdAt),
      amount: d.amount,
      cumulative: 0
    }))
    .filter(d => d.date >= cutoff)
    .sort((a, b) => a.date - b.date);

  // Calculate cumulative XP
  data.forEach((d, i) => {
    d.cumulative = i === 0 ? d.amount : data[i-1].cumulative + d.amount;
  });

  const svg = container
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  // X scale
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  // Y scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.cumulative)])
    .nice()
    .range([height, 0]);

  // Line generator
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.cumulative))
    .curve(d3.curveMonotoneX);

  // Add the line path
  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#6366f1')
    .attr('stroke-width', 3)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);

  // Add the scatter plot points
  svg.selectAll('.line-dot')
    .data(data)
    .enter().append('circle')
      .attr('class', 'line-dot')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.cumulative))
      .attr('r', 4)
      .attr('fill', '#6366f1')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 6);
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(`<strong>${d.date.toLocaleDateString()}</strong><br/>XP: ${d.amount}<br/>Total: ${d.cumulative}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
        tooltip.transition().duration(500).style('opacity', 0);
      });

  // Add the X Axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b')));

  // Add the Y Axis
  svg.append('g')
    .call(d3.axisLeft(y).tickFormat(d => d3.format('.2s')(d)));

  // Add X axis label
  svg.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
    .style('text-anchor', 'middle')
    .text('Date');

  // Add Y axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Cumulative XP');

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'chart-tooltip')
    .style('opacity', 0);
}

function drawSkillsRadarChart(user) {
  const container = d3.select('#radarChart');
  container.selectAll('*').remove();

  const margin = {top: 60, right: 60, bottom: 60, left: 60};
  const width = 500 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;

  const svg = container
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

  // Filter and prepare data
  const skillsData = user.skillTypes
    .filter(skill => skill.amount > 0)
    .map(skill => ({
      axis: skill.type.replace('skill_', ''),
      value: skill.amount / 1000 // Normalize values
    }));

  // Radar chart configuration
  const maxValue = d3.max(skillsData, d => d.value) * 1.1;
  const levels = 5;
  const angleSlice = Math.PI * 2 / skillsData.length;

  // Create scales
  const rScale = d3.scaleLinear()
    .range([0, radius])
    .domain([0, maxValue]);

  // Draw circular grid lines
  for (let level = 0; level <= levels; level++) {
    const levelFactor = radius * level / levels;
    
    svg.selectAll('.levels')
      .data([1])
      .enter()
      .append('circle')
      .attr('class', 'grid-circle')
      .attr('r', levelFactor)
      .style('fill', 'none')
      .style('stroke', 'rgba(100, 100, 100, 0.2)')
      .style('stroke-width', '1px');  
  }

  // Draw axes
  const axis = svg.selectAll('.axis')
    .data(skillsData)
    .enter()
    .append('g')
    .attr('class', 'axis');

  axis.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y2', (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr('class', 'line')
    .style('stroke', 'rgba(100, 100, 100, 0.2)')
    .style('stroke-width', '1px');

  // Add axis labels
  axis.append('text')
    .attr('class', 'legend')
    .style('font-size', '11px')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('x', (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y', (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
    .text(d => d.axis);

  // Create the radar chart area
  const radarLine = d3.lineRadial()
    .curve(d3.curveLinearClosed)
    .radius(d => rScale(d.value))
    .angle((d, i) => i * angleSlice);

  // Draw the radar chart
  svg.append('path')
    .datum(skillsData)
    .attr('class', 'radar-area')
    .attr('d', radarLine)
    .style('fill', 'rgba(99, 102, 241, 0.2)')
    .style('stroke', 'rgba(99, 102, 241, 1)')
    .style('stroke-width', '2px');

  // Add data points
  svg.selectAll('.radar-circle')
    .data(skillsData)
    .enter()
    .append('circle')
    .attr('class', 'radar-circle')
    .attr('r', 4)
    .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style('fill', 'rgba(99, 102, 241, 1)')
    .style('stroke', '#fff')
    .style('stroke-width', '2px')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('r', 6);
      tooltip.transition().duration(200).style('opacity', .9);
      tooltip.html(`<strong>${d.axis}</strong><br/>XP: ${d.value.toFixed(1)}k`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', function() {
      d3.select(this).attr('r', 4);
      tooltip.transition().duration(500).style('opacity', 0);
    });

  // Add chart title
  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', 0)
    .attr('y', -radius - 30)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('font-weight', 'bold')

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'chart-tooltip')
    .style('opacity', 0);
}