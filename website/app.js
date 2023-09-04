/* Global Variables */
const WEATHER_URI = "https://api.openweathermap.org/data/2.5/weather";
const LOCAL_URI = "http://localhost:8080/api/info";
const apiKey = "9f13698859f8ecf0c9d48602358c64b4&units=imperial";

// Event listener to add function to existing HTML DOM element
const submitBtn = document.getElementById("generate");
submitBtn.addEventListener("click", handleGenerate);

/* Function called by event listener */
async function handleGenerate() {
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  try {
    const weatherResult = await apiGet(`${WEATHER_URI}?q=${zip}&appid=${apiKey}`);
    const data = {
      date: generateDate(),
      temp: weatherResult.main.temp,
      content,
    }
    const postData = await apiPost(LOCAL_URI, {}, data);
    if (postData.statusCode !== 201 && !postData.success) return;
    const getData = await apiGet(LOCAL_URI);
    render(getData);
  } catch (e) {
    console.log(`Error::${e}`);
  }
}

function generateDate() {
  const d = new Date();
  return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}

function render(allData) {
  const { temp, content, date } = allData;
  try {
    document.getElementById("temp").innerHTML = Math.round(temp) + " degrees";
    document.getElementById("content").innerHTML = content;
    document.getElementById("date").innerHTML = date;
  } catch (e) {
    console.log(e);
  }
}

async function apiGet(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

async function apiPost(url, headers = {}, body = null){
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}