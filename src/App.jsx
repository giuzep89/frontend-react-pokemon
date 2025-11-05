import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemon-card/PokemonCard.jsx";

function App() {
    const [error, toggleError] = useState(false);
    const [listOfPokemonUrls, setlistOfPokemonUrls] = useState([]);
    const [listOfPokemonData, setlistOfPokemonData] = useState([]);

    useEffect(() => {
        async function loadListOfPokemon() {
            toggleError(false);
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0');
                console.log(response);
                setlistOfPokemonUrls(response.data.results);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }
        loadListOfPokemon();
    }, [])

    useEffect(() => {
        toggleError(false);
        async function getPokemonDetails() {
            try {
                const result = listOfPokemonUrls.map((pokemon) => {
                    return axios.get(pokemon.url);
                })
                const responses = await Promise.all(result);
                const allData = responses.map((response) => {
                    return response.data;
                })
                // console.log(allData[0]);
                setlistOfPokemonData(allData);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (listOfPokemonUrls.length > 0) {
            getPokemonDetails();
        }
    }, [listOfPokemonUrls]);


    return (
        <>
            <h1>Gotta catch em all!</h1>
            <div className="inner-container">
                {listOfPokemonData.length > 0 &&
                    listOfPokemonData.map(pokemon => {
                        const {id, name, sprites: {front_default: picture}, moves, weight, abilities} = pokemon;
                        return (
                            <PokemonCard key={id} name={name} picture={picture} moves={moves} weight={weight} abilities={abilities} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default App
