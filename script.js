const startDebt = 2491823007381;
const increasePerSecond = 10327;
const startTime = Date.now();

function formatNumber(n) {
  return n.toLocaleString('de-DE') + " €";
}

function updateDebt() {
  const now = Date.now();
  const elapsedMs = now - startTime;
  const currentDebt = startDebt + (elapsedMs / 1000) * increasePerSecond;
  document.getElementById("debt-counter").textContent = formatNumber(currentDebt);
  document.getElementById("session-counter").textContent = formatNumber((elapsedMs / 1000) * increasePerSecond);
}
setInterval(updateDebt, 30);

// Slides mit Leertaste und Tap
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.style.display = 'none';
    if (i === index) {
      slide.classList.add('active');
      slide.style.display = 'flex';
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
});

document.addEventListener('touchstart', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);

// Diagramme laden
window.addEventListener("load", () => {
  const ctx1 = document.getElementById("vergleichChart")?.getContext("2d");
  if (ctx1) {
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Japan", "USA", "Deutschland"],
        datasets: [{
          label: "Staatsverschuldung in % des BIP",
          data: [263, 129, 65],
          backgroundColor: ["#00ff99", "#00ffff", "#33ffcc"],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        animation: { duration: 1500 },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Staatsverschuldung im internationalen Vergleich",
            font: { size: 18 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "% vom BIP" }
          },
          x: {
            title: { display: true, text: "Länder" }
          }
        }
      }
    });
  }

  const ctx2 = document.getElementById("zinsChart")?.getContext("2d");
  if (ctx2) {
    new Chart(ctx2, {
      type: "pie",
      data: {
        labels: ["Zinsausgaben", "Investitionen"],
        datasets: [{
          data: [40, 70],
          backgroundColor: ["#00ff99", "#00ffff"]
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1500 },
        plugins: {
          title: {
            display: true,
            text: "Verteilung Bundesausgaben (2024)",
            font: { size: 18 }
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  const ctx3 = document.getElementById("entwicklungChart")?.getContext("2d");
  if (ctx3) {
    new Chart(ctx3, {
      type: "line",
      data: {
        labels: ["2000", "2005", "2010", "2015", "2020", "2022", "2024"],
        datasets: [{
          label: "Staatsverschuldung (in Mrd. €)",
          data: [1200, 1400, 2000, 2150, 2100, 2400, 2500],
          borderColor: "#00ffff",
          backgroundColor: "rgba(0, 255, 204, 0.2)",
          borderWidth: 2,
          tension: 0,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#00ffff"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Staatsverschuldung Deutschland – Entwicklung 2000–2024",
            font: { size: 18 }
          },
          legend: { display: false }
        }
      }
    });
  }

  const ctx4 = document.getElementById("prognoseChart")?.getContext("2d");
  if (ctx4) {
    new Chart(ctx4, {
      type: "line",
      data: {
        labels: ["2024", "2025", "2026", "2027", "2028", "2029", "2030"],
        datasets: [{
          label: "Prognose Staatsverschuldung",
          data: [2500, 2570, 2660, 2720, 2785, 2870, 2940],
          borderColor: "#33ffcc",
          backgroundColor: "rgba(51, 255, 204, 0.2)",
          fill: true,
          tension: 0,
          pointRadius: 4,
          pointBackgroundColor: "#00ffff"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Prognose: Staatsverschuldung Deutschland bis 2030",
            font: { size: 18 }
          },
          legend: { display: false }
        }
      }
    });
  }
});
