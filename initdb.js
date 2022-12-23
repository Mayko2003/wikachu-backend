const POKE_API_URL = 'https://pokeapi.co/api/v2';
const { Pokemon } = require('./models');

let pokemons = [];

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getPokemons = async (results) => {
    results.map(async (pokemon) => {
        const details = await fetchData(pokemon.url);
        pokemons = [...pokemons, details];
    })
}

const insertData = async () => {
    pokemons.sort((a, b) => a.id - b.id);

    pokemons.map(async (pokemon) => {
        const newPokemon = new Pokemon({
            id_pokemon: pokemon.id,
            name: pokemon.name,
        });
        await newPokemon.save();
    })
}


const initDB = async () => {

    const url = `${POKE_API_URL}/pokemon-species?limit=200`;

    let page = await fetchData(url);

    while (1) {
        
        await getPokemons(page.results);

        const next = page.next;
        if (!next)  break;
        page = await fetchData(next);
    }

    await insertData();
}

module.exports = initDB;