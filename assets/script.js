let weatherAPIKey = 'eea5b144b409aceaec1caf47854c2562';
// let weatherBasePoint = 'https://api.openweathermap.org/data/2.5/weather?appid='

// let weatherByCity = weatherBasePoint =  async (city) => {
//     let endpoint = weatherBasePoint + '&q=' + city;
//     let response = await fetch(endpoint);
//     console.log(response);
// }

// weatherByCity('San Francisco');

class Fetch {
    async getCurrent(input){
            let response = await 
                
                fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=eea5b144b409aceaec1caf47854c2562`)
                .then(r=> r.json())
                .then(data => {return data})
            return await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=` + weatherAPIKey + '&units=imperial')
            .then(response => response.json())
            .then(data => {return data})
    }   
}


class UI {
    constructor(){
        this.infoContainer = document.getElementById("info");
        this.city;
        this.defaultCity= "San Francisco";
    }

    populateContainer(data, cityName) {
        this.infoContainer.innerHTML += `
            <div class = "card-info justify-content-center">
                <h2 class="card-title">${cityName}</h2>
                <h5 class="card-subtitle"> Date: ${data.dt_txt}</h5>
                <h5 class="card-subtitle"> Temp: ${data.main.temp}</h5>
                <h5 class="card-subtitle"> Wind: ${data.wind.speed}</h5>
                <h5 class="card-subtitle"> Condition: ${data.weather[0].description}</5>
            </div>
        `;
    }

    clearContainer(){
        this.infoContainer.innerHTML = "";
    }

    saveToLocalStorage(){
        localStorage.setItem("city", JSON.stringify(data));
    }

    getFromLocalStorage(){
        if (localStorage.getItem("city" == null)) {
            return this.defaultCity;
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }
    }

    clearLS(){
        localStorage.clear();
    }
}

const ft = new Fetch();
const ui = new UI();

const search = document.getElementById("searchUser");
const buttonEl = document.getElementById("btn");

buttonEl.addEventListener('click', () => {
   ui.clearContainer();
    const currentValue = search.value;

    ft.getCurrent(currentValue).then((data)=>{
        console.log(data)
        data.list.slice(0,6).forEach(information=>ui.populateContainer(information, data.city.name));

        // ui.saveToLocalStorage(data);
    })
});

window.addEventListener("DOMContentLoaded", () => {
    const dataSaved = ui.getFromLocalStorage();
    // ui.populateContainer(dataSaved);
})