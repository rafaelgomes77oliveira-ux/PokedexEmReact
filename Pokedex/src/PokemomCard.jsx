function PokemonCard({ pokemon }){
    return (
        <div className="card">
            <h3>#{pokemon.id} - {pokemon.name}</h3>
        </div>
    )
}

export default PokemonCard;