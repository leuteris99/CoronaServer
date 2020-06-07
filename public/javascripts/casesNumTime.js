function ch1(country, startDate, endDate) {
    let request = new XMLHttpRequest();
    request.open('GET', '/db/cases-number-per-time/' + country + '&' + startDate + '&' + endDate);
    request.responseType = 'text';
    request.onload = function () {
        console.log(request.response);
        createChart(JSON.parse(request.response), country);
    };
    request.send();
}

function createChart(data, country) {
    let titleEl = document.getElementById('title');
    titleEl.textContent = "Cases in " + country;
    // preparing the data for the chart
    let dateRep = [];
    let i = 0;
    data.forEach(element => {
        dateRep[i++] = element['dateRep'];
    });
    let cases = [];
    i = 0;
    data.forEach(element => {
        cases[i++] = element['cases'];
    });
    let deaths = [];
    i = 0;
    data.forEach(element => {
        deaths[i++] = element['deaths'];
    });
    // rendering the chart
    var ctx = document.getElementById('chart').getContext('2d');
    var mychart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateRep,
            datasets: [{
                label: '# of cases in ' + country,
                data: cases,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            }, {
                label: '# of deaths in ' + country,
                data: deaths,
                backgroundColor: [
                    'rgba(99,255,211,0.2)'
                ],
                borderColor: [
                    'rgb(99,255,187)'
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