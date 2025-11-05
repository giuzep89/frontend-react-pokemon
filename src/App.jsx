import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemon-card/PokemonCard.jsx";
import pokemonLogo from "./assets/612ce4761b9679000402af1c.png";

function App() {
    const [error, toggleError] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit20&offset=0');
    const [listOfPokemonUrls, setlistOfPokemonUrls] = useState({});
    const {next, previous, results: listOfUrls} = listOfPokemonUrls;
    const [listOfPokemonData, setlistOfPokemonData] = useState([]);

    useEffect(() => {
        async function loadListOfPokemon() {
            toggleError(false);
            try {
                const response = await axios.get(currentUrl);
                console.log(response);
                setlistOfPokemonUrls(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        loadListOfPokemon();
    }, [currentUrl]);

    useEffect(() => {
        toggleError(false);

        async function getPokemonDetails() {
            try {
                const result = listOfUrls.map((pokemon) => {
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

        if (Object.keys(listOfPokemonUrls).length > 0) {
            getPokemonDetails();
        }
    }, [listOfPokemonUrls]);


    return (
        <>
            <div className="outer-container">
                <img className="logo" src={pokemonLogo} alt="pokemon logo"/>
                <div className="button-container">
                    {previous === null ?
                        <button className="button previous disabled" disabled={true} type="button">previous</button> :
                        <button className="button previous" type="button"
                                onClick={() => setCurrentUrl(previous)}>previous</button>
                    }
                    {next === null ?
                        <button className="button next disabled" disabled={true} type="button">next</button> :
                        <button className="button next" type="button" onClick={() => setCurrentUrl(next)}>next</button>
                    }
                </div>
                {error ? (<p className="error-message">Something went wrong. Please try again.</p>) :
                    (
                    <div className="inner-container">
                        {listOfPokemonData.length > 0 &&
                            listOfPokemonData.map(pokemon => {
                                const {id, name, sprites: {front_default: picture}, moves, weight, abilities} = pokemon;
                                return (
                                    <PokemonCard key={id} name={name} picture={picture} moves={moves} weight={weight}
                                                 abilities={abilities}/>
                                )
                            })
                        }
                    </div>
                )
                }
            </div>
        </>
    )
}

export default App




