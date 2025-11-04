import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [pokemonData, setPokemonData] = useState({});
    const [error, toggleError] = useState(false);
    const {
        name= "",
        sprites: {front_default: picture = ""} = {},
        moves= [],
        weight= 0,
        abilities= [],
    } = pokemonData;

    useEffect(() => {
        async function loadPokemon() {
            toggleError(false);
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/4/');
                console.log(response);
                setPokemonData(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }
        loadPokemon();
    }, []);

  return (
    <>
      <h1>Gotta catch em all!</h1>
        <div className="inner-container">
        {Object.keys(pokemonData).length > 0 &&
            <article className="pokemon-card">
                <h2>{name}</h2>
                <img src={picture} alt=""/>
                <p>Moves: {moves.length}</p>
                <p>Weight: {weight}</p>
                <p>Abilities:</p>
                {abilities.map((ability) => {
                    return (
                        <p key={ability.ability.name}>{ability.ability.name}</p>
                    )
                })}
            </article>
        }
        </div>
    </>
  )
}

export default App

// TODO - Make a pokemon card and then call it here to check if it works


