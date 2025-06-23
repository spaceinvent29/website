// Create placeholder charts for tracked stocks
// Requires Chart.js loaded beforehand

document.addEventListener('DOMContentLoaded', function() {
  const stockSymbols = ['HOOD', 'PLTR', 'HIMS', 'ABCL', 'IBIT', 'AMD'];
  stockSymbols.forEach(symbol => {
    const priceCtx = document.querySelector(`#stock-${symbol} .price-chart`);
    const optCtx = document.querySelector(`#stock-${symbol} .options-chart`);
    if (priceCtx && optCtx && window.Chart) {
      new Chart(priceCtx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          datasets: [{
            label: symbol + ' Price',
            data: [10, 12, 11, 13, 15],
            borderColor: '#4A6FA5',
            backgroundColor: 'transparent'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });

      new Chart(optCtx, {
        type: 'bar',
        data: {
          labels: ['Call', 'Put'],
          datasets: [{
            label: symbol + ' Options Vol',
            data: [1000, 800],
            backgroundColor: ['#8E44AD', '#4A6FA5']
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
  });
});
