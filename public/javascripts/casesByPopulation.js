function ch1(country) {
    let request = new XMLHttpRequest();
    request.open('GET', '/db/cases-by-population/' + country);
    request.responseType = 'text';
    request.onload = function () {
        console.log(request.response);
        createChart(JSON.parse(request.response), country);
    };
    request.send();
}

function createChart(data, country) {
    let titleEl = document.getElementById('title');
    titleEl.textContent = "Cases And Population of " + country;
    // preparing the data for the chart
    
    let cases = data.element['cases'];
	let pop = data.element['popData2018'];
    // rendering the chart
    var ctx = document.getElementById('chart').getContext('2d');
    var mychart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cases', 'Population'],
            datasets: [{
                label: 'Cases in ' + country,
                data: cases,
                backgoundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            }, {
                label: 'Population of ' + country,
                data: pop,
                backgoundColor: [
                    'rgba(99,255,255,0.2)'
                ],
                borderColor: [
                    'rgb(99,255,232)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yaxis: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}