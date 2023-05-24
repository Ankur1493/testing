const search = document.querySelector("#searchValue");
const searchBtn = document.querySelector(".searchBtn");
const sections = document.querySelector(".sections")
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");

const displayTemperature= function(temp,tempMax,tempMin){

    const markup = `
        <div class="section1 section">
            <div class="head"><h2>Temperatures</h2></div>
            <div class="temp">temperature :- ${temp}&#8451</div>
            <div class="tempMin">Min Temperature :- ${tempMin}&#8451</div>
            <div class="tempMax">Max Temperature is :- ${tempMax}&#8451</div>
        </div>
`   
    sections.insertAdjacentHTML("afterbegin",markup);
}

const displayHumidity= function(humidity,windSpeed){

    const markup = `
        <div class="section2 section">
            <div class="head"><h2>Humidity Info</h2></div>
            <div class="temp">Humidity :- 22</div>
            <div class="tempMin">Wind Degree :- 19</div>
            <div class="tempMax">feels like :- 23</div>
        </div>
    `   
    sections.insertAdjacentHTML("afterbegin",markup);
}



const details = async function(city){
    try{

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q={${city}},&limit=1&appid=7d7d9461dbbb4f43a795a54d76513a16`)
        if(!response.ok) throw new Error("enter correct city")
        const data = await response.json();
        if(data.length === 0 || data[0].name.toLowerCase() !== city.toLowerCase()) {
            throw new Error("enter correct city");
        }
        const {lat,lon} = data[0];

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d7d9461dbbb4f43a795a54d76513a16`);
        const data1 = await res.json();
        console.log(data1);
        sections.style.opacity = "100%";
        // displayTemperature(data1.)
        const { main: { temp, temp_min, temp_max } } = data1;
        displayTemperature(temp,temp_max,temp_min);
        

        setTimeout(function(){
            sections.style.opacity = "0%";
           },4000);

    }catch(err){
        alert(err.message);
    }
}

// const searchValue = search.value;

// searchBtn.addEventListener("click",details(search.value));
searchBtn.addEventListener("click",function(){
    details(search.value);
    search.value =""
})
search.addEventListener("keydown",function(e){
    if(e.keyCode === 13){
        e.preventDefault();
        searchBtn.click();
    }
})