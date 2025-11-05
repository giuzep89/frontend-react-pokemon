import "./PokemonCard.css"

export default function PokemonCard({name, picture, moves, weight, abilities}) {
    return (
    <article className="pokemon-card">
        <h2>{name}</h2>
        <img src={picture} alt=""/>
        <p><strong>Moves:</strong> {moves.length}</p>
        <p><strong>Weight:</strong> {weight}</p>
        <p><strong>Abilities:</strong></p>
        {abilities.map((ability) => {
            return (
                <p key={ability.ability.name}>{ability.ability.name}</p>
            )
        })}
    </article>
    )
}