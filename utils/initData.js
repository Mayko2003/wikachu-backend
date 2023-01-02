const fs = require('fs')
const POKE_API_URL = 'https://pokeapi.co/api/v2';

const endpoints = [
    'pokemon-species',
    'item',
]

const fetchData = async (url) => {
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
}

const generateData = (endpoint) => {
    fetchData(`${POKE_API_URL}/${endpoint}?limit=5000`).then((data) => {
        fs.writeFileSync(`../data/${endpoint}.json`, JSON.stringify(data));
    })
}

endpoints.forEach(endpoint => {
    generateData(endpoint);
})
