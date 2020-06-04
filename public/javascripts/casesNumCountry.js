function ch1(country) {
    let request = new XMLHttpRequest();
    request.open('GET', '/db/cases-number-per-country/' + country);
    request.responseType = 'text';
    request.onload = function () {
        console.log(request.response);
        createChart(JSON.parse(request.response), country);
    };
    request.send();
}

function createChart(data, country) {
    let titleEl = document.getElementById('title');
    titleEl.textContent = "Daily new Cases in " + country;
    // preparing the data for the chart
    let dateRep = [];
    let i =0;
    data.forEach(element => {
        dateRep[i++] = element['dateRep'];
    });
    let cases = [];
    i =0;
    data.forEach(element => {
        cases[i++] = element['cases'];
    });
	dateRep.reverse();
	cases.reverse();

    // rendering the chart
    var ctx = document.getElementById('chart').getContext('2d');
    var mychart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateRep,
            datasets: [{
                label: '# of cases in ' + country,
                data: cases,
                backgoundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
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