function ch1(startDate, endDate) {
    let request = new XMLHttpRequest();
    request.open('GET', '/db/top-5-cases/' + startDate + '&' + endDate);
    request.responseType = 'text';
    request.onload = function () {
        console.log(request.response);
        createChart(JSON.parse(request.response));
    };
    request.send();
}

function createChart(data) {
    let titleEl = document.getElementById('title');
    titleEl.textContent = "Top 5 Countries By Cases";
    // preparing the data for the chart

    let country = [];
    let i = 0;
    data.forEach(element => {
        country[i++] = element['country'];
    });
    let cases = [];
    i = 0;
    data.forEach(element => {
        cases[i++] = element['cases'];
    });

    // rendering the chart
    var ctx = document.getElementById('chart').getContext('2d');
    var mychart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: country,
            datasets: [{
                label: '# Top 5 ',
                data: cases,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(99,161,255,0.2)',
                    'rgba(133,255,99,0.2)',
                    'rgba(255,161,99,0.2)',
                    'rgba(99,255,232,0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgb(99,120,255)',
                    'rgb(109,255,99)',
                    'rgb(255,167,99)',
                    'rgb(99,255,224)'
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