async function getWeather() {
  const city = document.getElementById("city").value;
  const error = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  const trimmed = city.trim();
  if (trimmed === "") {
    error.textContent = "Please enter a city name.";
    card.classList.add("hidden");
    return;
  }

  const apiKey = "a92ed58815e8e00c88de274460875f05";
  const encodedCity = encodeURIComponent(trimmed);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        error.textContent = "City not found. Try again.";
      } else if (response.status === 401) {
        error.textContent = "Invalid API key. Check your API key.";
      } else {
        error.textContent = `Error ${response.status}: ${response.statusText}`;
      }
      card.classList.add("hidden");
      return;
    }

    const data = await response.json();

    error.textContent = "";
    card.classList.remove("hidden");

    document.getElementById("cityName").textContent = data.name ?? trimmed;
    document.getElementById("temperature").textContent = data.main?.temp != null ? `${data.main.temp}°C` : "—";
    document.getElementById("humidity").textContent = data.main?.humidity ?? "—";
    document.getElementById("wind").textContent = data.wind?.speed ?? "—";
    document.getElementById("condition").textContent = data.weather?.[0]?.description ?? "—";

    const iconCode = data.weather?.[0]?.icon;
    document.getElementById("weatherIcon").src = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";

  } catch (err) {
    error.textContent = "Error fetching data. Please try again.";
    card.classList.add("hidden");
  }
}
