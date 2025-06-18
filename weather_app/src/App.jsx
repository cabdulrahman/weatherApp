import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("http://localhost:5173/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.cod === 404) {
          setError("City not found.");
        } else {
          setData(result);
        }
      } else {
        setError("Failed to fetch data.");
      }
    } catch (error) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-background">
      <div className="center-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchData} disabled={loading || !city}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <hr />
      {data && data.main && data.weather ? (
        <div>
          <h3>{data.name}</h3>
          <h3>Temp: {data.main.temp}&deg;F</h3>
          <h3>Weather: {data.weather[0].main}</h3>
        </div>
      ) : null}
    </div>
  );
}

export default App;
