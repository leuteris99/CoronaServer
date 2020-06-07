function ch1(startDate, endDate) {
    let request = new XMLHttpRequest();
    request.open('GET', '/db/continents/' + startDate + '&' + endDate);
    request.responseType = 'text';
    request.onload = function () {
        console.log(request.response);
        createChart(JSON.parse(request.response));
    };
    request.send();
}

function createChart(data) {
    let titleEl = document.getElementById('title');
    titleEl.textContent = "Cases per Continent ";
    // preparing the data for the chart
    let continents = [];
    let i = 0;
    data.forEach(element => {
        continents[i++] = element['continentExp'];
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
        type: 'radar',
        data: {
            labels: continents,
            datasets: [{
                label: '# cases ',
                data: cases,
                backgroundColor: [
                    'rgba(99,255,242,0.2)'
                ],
                borderColor: [
                    'rgb(99,255,242)'
                ],
                borderWidth: 1,
                pointBorderColor: [
                    'rgb(98,253,241)',
                    'rgb(97,251,240)',
                    'rgb(97,251,240)',
                    'rgb(97,251,240)',
                    'rgb(97,251,240)',
                ],
                pointBackgroundColor: [
                    'rgb(98,253,241)',
                    'rgb(98,253,241)',
                    'rgb(98,253,241)',
                    'rgb(98,253,241)',
                    'rgb(98,253,241)',
                ],
            }, {
                label: '# deaths ',
                data: deaths,
                backgroundColor: [
                    'rgb(46,59,116)',
                ],
                borderColor: [
                    'rgb(39,50,98)',
                ],
                borderWidth: 1,
                pointBorderColor: [
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                ],
                pointBackgroundColor: [
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                    'rgb(39,50,98)',
                ],
            }]
        }
    });
}