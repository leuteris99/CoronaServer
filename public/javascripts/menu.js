function ch1() {
    rmTrash()

    const x = document.createElement('p');
    x.id = "cnc";
    x.className = "result";
    x.appendChild(document.createTextNode('Pick a Country:'));
    document.body.appendChild(x);

    let request = new XMLHttpRequest();
    request.open('GET', "/db/get-countries");
    request.responseType = 'text';
    request.onload = function () {
        const jsonData = JSON.parse(request.response);
        let data = [];
        let i = 0;
        jsonData.forEach(element => {
            data[i++] = element['countriesAndTerritories'];
        });
        const a = addForm('/db/cases-number-per-country', 'post');
        const b = addDropDown('country', data);
        const c = addInput('submit', 'done');

        a.appendChild(b);
        a.appendChild(c);
        document.body.appendChild(a);
    };
    request.send();
}

function ch2() {
    rmTrash()

    const x = document.createElement('p');
    x.id = "cnt";
    x.className = "result";
    x.appendChild(document.createTextNode('Pick a date:'));
    document.body.appendChild(x);

    let request = new XMLHttpRequest();
    request.open('GET', '/db/get-countries');
    request.responseType = 'text';
    request.onload = function () {
        const jsonData = JSON.parse(request.response);
        let data = [];
        let i = 0;
        jsonData.forEach(element => {
            data[i++] = element['countriesAndTerritories'];
        });
        const a = addForm('/db/cases-number-per-time', 'post');
        const b = addInput('date', 'startDate');
        const c = addInput('date', 'endDate');
        const d = addInput('submit', 'done');
        const e = addDropDown('country', data);

        a.appendChild(addLabel('Select Country:'));
        a.appendChild(goNextLine());
        a.appendChild(e);
        a.appendChild(goNextLine());
        a.appendChild(addLabel("from:"))
        a.appendChild(goNextLine());
        a.appendChild(b);
        a.appendChild(goNextLine());
        a.appendChild(addLabel("to:"))
        a.appendChild(goNextLine());
        a.appendChild(c);
        a.appendChild(goNextLine());
        a.appendChild(d);
        document.body.appendChild(a);
    };
    request.send();
}

function ch3() {
    rmTrash();

    const x = document.createElement('p');
    x.id = "t5c";
    x.className = "result";
    x.appendChild(document.createTextNode('Pick a Date:'));
    document.body.appendChild(x);

    const a = addForm('/db/top-5-cases', 'post');
    const b = addInput('date', 'startDate');
    const c = addInput('date', 'endDate');
    const d = addInput('submit', 'done');

    a.appendChild(addLabel("from:"))
    a.appendChild(goNextLine());
    a.appendChild(b);
    a.appendChild(goNextLine());
    a.appendChild(addLabel("to:"))
    a.appendChild(goNextLine());
    a.appendChild(c);
    a.appendChild(goNextLine());
    a.appendChild(d);
    document.body.appendChild(a);
}

function ch4(){
    rmTrash();

    const x = document.createElement('p');
    x.id = "cbp";
    x.className = "result";
    x.appendChild(document.createTextNode('Pick a Country:'));
    document.body.appendChild(x);

    let request = new XMLHttpRequest();
    request.open('GET', "/db/get-countries");
    request.responseType = 'text';
    request.onload = function () {
        const jsonData = JSON.parse(request.response);
        let data = [];
        let i = 0;
        jsonData.forEach(element => {
            data[i++] = element['countriesAndTerritories'];
        });
        const a = addForm('/db/cases-by-population', 'post');
        const b = addDropDown('country', data);
        const c = addInput('submit', 'done');

        a.appendChild(b);
        a.appendChild(c);
        document.body.appendChild(a);
    };
    request.send();
}

function ch5() {
    rmTrash();

    const x = document.createElement('p');
    x.id = "cont";
    x.className = "result";
    x.appendChild(document.createTextNode('Pick a Date:'));
    document.body.appendChild(x);

    const a = addForm('/db/continents', 'post');
    const b = addInput('date', 'startDate');
    const c = addInput('date', 'endDate');
    const d = addInput('submit', 'done');

    a.appendChild(addLabel("from:"))
    a.appendChild(goNextLine());
    a.appendChild(b);
    a.appendChild(goNextLine());
    a.appendChild(addLabel("to:"))
    a.appendChild(goNextLine());
    a.appendChild(c);
    a.appendChild(goNextLine());
    a.appendChild(d);
    document.body.appendChild(a);
}

function addForm(action, method) {
    const x = document.createElement('form');
    x.setAttribute('action', action);
    x.setAttribute('method', method)
    x.className = 'result';
    return x;
}

function addInput(type, name) {
    const x = document.createElement('input');
    x.setAttribute('type', type);
    x.setAttribute('name', name);
    x.className = 'result';
    return x;
}

function addLabel(text) {
    const x = document.createElement('label');
    x.className = 'result';
    x.appendChild(document.createTextNode(text));
    return x;
}

function goNextLine() {
    return document.createElement('br');
}

function addDropDown(name, optionArray) {
    const a = document.createElement('select');
    a.setAttribute('name', name);
    a.className = 'result';

    const b = document.createElement('option');
    b.setAttribute('value', 'null');
    b.className = 'result';
    b.appendChild(document.createTextNode('--select-a-country--'));
    a.appendChild(b);

    optionArray.forEach(element => {
        const x = document.createElement('option');
        x.setAttribute('value', element);
        x.className = 'result';
        x.appendChild(document.createTextNode(element));
        a.appendChild(x);
    });
    return a;
}

function rmTrash() {
    const y = document.getElementsByClassName("result");
    console.log(y.length);
    for (let i = y.length - 1; i >= 0; i--) {
        y.item(i).remove();
    }
}