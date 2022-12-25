const POKE_API_URL = 'https://pokeapi.co/api/v2';
const { Pokemon } = require('./models');


const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const saveData = async (pages) => {
    pages.map((page) => {
        page.results.map(async (pokemon) => {
            const details = await fetchData(pokemon.url);

            const newPokemon = new Pokemon({
                id_pokemon: details.id,
                name: details.name,
                generation: details.generation.name,
            });

            await newPokemon.save();
        })
    })

}


const initDB = async () => {

    let url = `${POKE_API_URL}/pokemon-species?limit=200`;

    let pages = [];

    while (url) {
        const response = await fetchData(url);
        pages.push(response);
        url = response.next;
    }

    await saveData(pages);
}

module.exports = initDB;