import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(21);
  const [apiData, setApiData] = useState();
  const [themeColor, setThemeColor] = useState()
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  const click = () => {
    let randomNum = Math.floor(Math.random() * 150) + 1;
    setData(randomNum);
    fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        setApiData(items)
        setThemeColor(typeColor[items.types[0].type.name]);
      });
  };

  useEffect(() => {
    click();
  }, []);

  console.log(apiData);
  console.log(themeColor)
  return (
    <div className="container">
      {apiData && apiData !== undefined && (
        <>
          <div className="card" style={{background: `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`}}>
            <div className="hp">
              <span className="hp-span">HP </span>
              <span className="hp-number">{apiData.stats[0].base_stat}</span>
            </div>
            <div className="card-body">
              <img src={apiData.sprites.other.dream_world.front_default} />
              <span className="pokemon-name">{apiData.name}</span>
              <div className="pokemon-about">
                <span className="about-1" style={{backgroundColor: `${themeColor}`}} >{apiData.types[0].type.name}</span>
              </div>
            </div>
            <div className="pokemon-abilitys">
              <div className="ability">
                <span className="ability-number">
                  {apiData.stats[1].base_stat}
                </span>
                <span className="ability-text">
                  {apiData.stats[1].stat.name}
                </span>
              </div>

              <div className="ability">
                <span className="ability-number">
                  {apiData.stats[2].base_stat}
                </span>
                <span className="ability-text">
                  {apiData.stats[2].stat.name}
                </span>
              </div>

              <div className="ability">
                <span className="ability-number">
                  {apiData.stats[5].base_stat}
                </span>
                <span className="ability-text">
                  {apiData.stats[5].stat.name}
                </span>
              </div>
            </div>
          </div>
          <button className="pokemon-btn" onClick={click}>
            Generate
          </button>
        </>
      )}
    </div>
  );
}

export default App;
