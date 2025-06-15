// XP-Time Graph Data
const xpTimeCtx = document.getElementById('xpTimeChart').getContext('2d');
const xpTimeChart = new Chart(xpTimeCtx, {
  type: 'line', // Line chart for XP-Time
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example time labels
    datasets: [{
      label: 'XP Gained Over Time',
      data: [100, 200, 300, 400, 500, 600], // Example XP data
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'XP'
        }
      }
    }
  }
});

// Skills Graph Data
const skillsCtx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(skillsCtx, {
  type: 'bar', // Bar chart for Skills
  data: {
    labels: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'], // Example skill labels
    datasets: [{
      label: 'Skill Proficiency',
      data: [80, 90, 70, 60, 50], // Example skill proficiency data
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Skills'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Proficiency (%)'
        },
        max: 100
      }
    }
  }
});
