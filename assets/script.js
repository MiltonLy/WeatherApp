
class Fetch {
    async getCurrent(input){
            const response = await fetch(
             `https://openweathermap.org/data/2.5/forecast?lat=${input}&appid=eea5b144b409aceaec1caf47854c2562`
            )
            const data = await response.json();
            console.log(data);
            return data;
    }   
}

class UI {
    constructor(){
        this.infoContainer = document.getElementById("info");
        this.city;
        this.defaultCity= "San Francisco";
    }

    populateContainer(data) {
        this.infoContainer.innerHTML = `
            <div class = "card-body justify-content-center">
                <h2 class="card-title">${data.name}</h2>
                <h3 class="card-subtitle"> Temp: ${data.main.temp}</h3>
                <h3 class="card-subtitle"> Wind: ${datat.main.wind}</h3>
                <h3 class="card-subtitle"> Condition: ${data.weather[0].description}</3>
            </div>
        `;
    }

    clearContainer(){
        infoContainer.innerHTML = "";
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
    const currentValue = search.value;

    ft.getCurrent(currentValue).then((data)=>{
        ui.populateContainer(data);
        ui.saveToLocalStorage(data);
    })
});

window.addEventListener("DOMContentLoaded", () => {
    const dataSaved = ui.getFromLocalStorage();
    ui.populateContainer(dataSaved);
})