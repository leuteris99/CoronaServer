function ch1(countries) {
    let request = new XMLHttpRequest();
    request.open('GET', '/db/cases-number-per-country/' + countries);
    request.responseType = 'text';
    request.onload = function () {
        createChart(JSON.parse(request.response), countries);
    };
    request.send();
}

function createChart(data, countries) {
    let titleEl = document.getElementById('title');
    let countriesNames = "";
    countries.forEach((country, index) => {
        if (index !== 0) {
            countriesNames += " and ";
        }
        countriesNames += country;
    });
    titleEl.textContent = "Daily new Cases in " + countriesNames;
    // preparing the data for the chart
    let dateRep = [];
    let i = 0;
    data[0]['data'].forEach(element => {
        dateRep[i++] = element['dateRep'];
    });

    // rendering the chart
    var ctx = document.getElementById('chart').getContext('2d');
    var mychart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateRep,
            datasets: []
        },
        options: {
            scales: {
                yAxis: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    let dynamicColors = function (a) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    let cases = [];
    let deaths = [];
    data.forEach((countEl) => {
        cases = [];
        deaths = [];
        countEl['data'].forEach((dataEl, index) => {
            cases[index] = dataEl['cases'];
        });
        let newCasesDataSet = {
                label: '# of cases in ' + countEl['country'],
                data: cases,
                backgroundColor: [
                    dynamicColors(0.2)
                ],
                borderColor: [
                    dynamicColors(1)
                ],
                borderWidth: 1,
            },
            i = 0;
        countEl['data'].forEach((dataEl, index) => {
            deaths[index] = dataEl['deaths'];
        });
        let newDeathDataSet = {
            label: '# of deaths in ' + countEl['country'],
            data: deaths,
            backgroundColor: [
                dynamicColors(0.2)
            ],
            borderColor: [
                dynamicColors(1)
            ],
            borderWidth: 1,
        }
        mychart.data.datasets.push(newCasesDataSet);
        mychart.update();
        mychart.data.datasets.push(newDeathDataSet);
        mychart.update();
    });

}