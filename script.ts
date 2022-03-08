
interface Data {
   coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

const button = document.querySelector(".btn-success");
button?.addEventListener("click", () => {
    const inputsearch = (<HTMLInputElement>document.getElementsByClassName("input-value")[0]).value;
    searchWeather(inputsearch);
  });

const displayData = (data: Data) => {
  const card:any = document.querySelector(".card");
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`

  card.innerHTML = `<div class="left-panel panel">
               <div class="city">
                <div class='circle' style='background-color: green'></div>
                  <span>${data.name},${data.sys.country}</span>
                  <p class='description'>${data.weather[0].description}</p>
                </div>
                <div class="temp">
                   <img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${data
                     .weather[0].icon}.png" alt="" width="120">
                   ${Math.ceil(data.main.temp - 273.15)}°C
                </div>
                <div class="right-panel panel">
                    <p>Details</p>
                    <hr></hr>
                   <div class="data">
                      Feels like:  <span class='temp'>${Math.round(
                        data.main.feels_like - 273.15
                      )}°C </span>
                  </div>
                  <div class="data">
                      Humidity: <span class='temp'>${data.main
                        .humidity}%  </span>
                  </div>
                  <div class="data">
                      Wind: <span class='temp'>${data.wind.speed} m/s  </span>
                  </div>
                  <div class="data">
                      Pressure: <span class='temp'>${data.main
                        .pressure} hPa </span>
                  </div>
               </div>
            </div> `;
};

const searchWeather = async (cityname: string): Promise<any> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e41fedf1448b1e63a9033e3b95264634`;
  try {
    const response = await fetch(url);
    if (response.ok) {
     const  data  = await response.json();
     console.log(data)
      displayData(data);
    }
  } catch (error) {
    console.log(error);
  }
};
window.onload = () => {
  searchWeather("");
};
