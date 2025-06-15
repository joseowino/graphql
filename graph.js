export function drowGraph(user) {
  // Get the canvas elements
  const xpTimeChartCtx = document.getElementById('xpTimeChart');
  const skillsChartCtx = document.getElementById('skillsChart');

  // Draw XP Progress Over Time Chart
  if (xpTimeChartCtx) {
    new Chart(xpTimeChartCtx, {
      type: 'line',
      data: {
        labels: user.xpTimeline.map(entry => {
          const date = new Date(entry.createdAt);
          return date.toLocaleDateString();
        }),
        datasets: [{
          label: 'XP Progress',
          data: user.xpTimeline.map(entry => entry.amount),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'XP Amount'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'XP Progress Over Time'
          }
        }
      }
    });
  }

  // Draw Skills Distribution Chart
  if (skillsChartCtx && user.skillTypes) {
    new Chart(skillsChartCtx, {
      type: 'bar',
      data: {
        labels: user.skillTypes.map(skill => skill.type),
        datasets: [{
          label: 'Skill Levels',
          data: user.skillTypes.map(skill => skill.amount),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Skill Type'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Skills Distribution'
          }
        }
      }
    });
  }
}