class Record {
    #dateRep;
    #day;
    #month;
    #year;
    #cases;
    #deaths;
    #countriesAndTerritories;
    #geoId;
    #countryterritoryCode;
    #popData2018;
    #continentExp;

    constructor(dateRep, day, month, year, cases, deaths, countriesAndTerritories, geoId, countryterritoryCode, popData2018, continentExp) {
        this.#dateRep = dateRep;
        this.#day = day;
        this.#month = month;
        this.#year = year;
        this.#cases = cases;
        this.#deaths =deaths;
        this.#countriesAndTerritories = countriesAndTerritories;
        this.#geoId = geoId;
        this.#countryterritoryCode = countryterritoryCode;
        this.#popData2018 =popData2018;
        this.#continentExp = continentExp;
    }

    get dataRep() {
        return this.#dateRep;
    }

    get day() {
        return this.#day;
    }

    get month() {
        return this.#month;
    }

    get year() {
        return this.#year;
    }

    toJSON() {
        return {dateRep: this.dateRep, day: this.day, month: this.month, year: this.year, cases: this.cases, deaths: this.deaths, countriesAndTerritories: this.countriesAndTerritories, geoId: this.geoId, countryterritoryCode: this.countryterritoryCode, popData2018: this.popData2018, continentExp: this.continentExp};
    }

    toString() {
        return "dateRep: " + this.dateRep + ", country: "+this.countriesAndTerritories;
    }
}

module.exports = Record;