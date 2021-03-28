const DELAY_HTML = 50;

// Car data
const brandList = ['BMW', 'Jeep', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Renault'];
const yearList = [2015, 2016, 2017, 2018, 2019, 2020, 2021];
const engineSizeList = [1000, 1600, 2000, 2600, 3000, 4000, 4400];
const typeList = ['sedan', 'coupe', 'pickup-truck', 'SUV', 'sports-car', 'minivan', 'convertible'];
const colorList = ['black', 'white', 'silver', 'blue', 'gold', 'red', 'yellow'];

// Car object constructor
function Car(brand, year, engineSize, type, color) {
    this.brand = brand;
    this.year = year;
    this.engineSize = engineSize;
    this.type = type;
    this.color = color;
}

// Car object method prototype
Car.prototype.getDetailsHtml = function () {
    return `<div class="list__item">
            <div class="list__item--header text--emphasis">${this.brand} ${this.color} ${this.type}</div>
            <div class="list__item--detail text--normal">Brand: ${this.brand}</div>
            <div class="list__item--detail text--normal">Year: ${this.year}</div>
            <div class="list__item--detail text--normal">Engine size: ${this.engineSize} cm3</div>
            <div class="list__item--detail text--normal">Type: ${this.type}</div>
            <div class="list__item--detail text--normal">Color: ${this.color}</div>
            </div>`;
};

// Generate car list
function getCars(units) {
    let carList = [];

    // Insert HTML after delay [ms]
    function insertHtmlDelayed(i, delay) {
        setTimeout(function () {
            document.querySelector('.list--grid').insertAdjacentHTML('beforeend', carList[i].getDetailsHtml());
        }, i * delay);
    }

    for (let i = 0; i < units; i++) {
        let brandIndex = Math.floor(Math.random() * brandList.length);
        let yearIndex = Math.floor(Math.random() * yearList.length);
        let engineSizeIndex = Math.floor(Math.random() * engineSizeList.length);
        let typeIndex = Math.floor(Math.random() * typeList.length);
        let colorIndex = Math.floor(Math.random() * colorList.length);
        carList.push(new Car(brandList[brandIndex], yearList[yearIndex], engineSizeList[engineSizeIndex], typeList[typeIndex], colorList[colorIndex]));
    }

    // DOM manipulation
    document.querySelector('.list--grid').innerHTML = '';

    for (let i = 0; i < units; i++) {
        insertHtmlDelayed(i, DELAY_HTML);
    }
}