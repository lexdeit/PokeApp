import axios from 'axios';

export async function pruebapke() {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        const urls = data.results.map(resultado => resultado.url);

        // Hacemos todas las solicitudes de manera concurrente usando Promise.all
        const responses = await Promise.all(urls.map(url => axios.get(url)));

        const pokemones = responses.map(res => {
            const { id, name, sprites, types } = res.data;
            return {
                id,
                name,
                image: sprites.other.dream_world.front_default,
                types
            };
        });

        return {
            props: { pokemones }
        };
    } catch (error) {
        // Manejar errores aquí y devolver un objeto con el error
        return {
            props: { error: 'Error en la solicitud' }
        };
    }
}
