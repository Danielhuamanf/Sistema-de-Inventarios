const ctx1 = document.getElementById("chart-1").getContext("2d");
const myChart = new Chart(ctx1, {
  type: "polarArea",
  data: {
    labels: ["TVs", "Celulares", "Laptops"],
    datasets: [
      {
        label: "Unidades Vendidas",
        data: [300, 500, 400],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});


const ctx2 = document.getElementById("chart-2").getContext("2d");
const myChart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
      "Junio", "Julio", "Agosto", "Septiembre", 
      "Octubre", "Noviembre", "Diciembre"
    ],
    datasets: [
      {
        label: "Ingresos Netos (S/)",
        data: [
          80000, 90000, 70000, 85000, 95000, 
          75000, 100000, 110000, 80000, 
          95000, 120000, 130000
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});