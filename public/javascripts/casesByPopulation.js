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

    let cases = data[0]['cases'];
    console.log(cases)
    let pop = data[0]['popData2018'];
    console.log(pop);
    // rendering the chart
    var ctx = document.getElementById('chart').getContext('2d');
    var mychart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cases', 'Population'],
            datasets: [{
                label: 'Cases in ' + country,
                data: [cases,pop],
                backgroundColor: [
                    'rgb(255,99,132)',
                    'rgba(99,224,255,0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(99,174,255,0.58)'
                ],
                borderWidth: 2,
                borderAlign: 'inner',
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ((cases*100)/pop) + '% of population affected.'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}