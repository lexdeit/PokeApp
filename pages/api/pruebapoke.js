import axios from 'axios';

export async function getServerSideProps(context) {

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    const results = data.results.map(resultado => resultado);

    const urls = results.map(elemento => elemento.url)
    const promises = urls.map(url => axios.get(url))

    return Promise.allSettled(promises)
        .then((responses) => { const value = responses.map(res => res.value.data); return value })
        .then(resonse => {
            const pokemones = resonse.map(res => {
                const { id, name, sprites, types } = res;
                return {
                    id,
                    name,
                    image: sprites.other.dream_world.front_default,
                    types
                };
            });
            // console.log(pokemones);
            return { props: { pokemones } }
        })
        .catch(error => {
            console.log(`Error conexion servidor: ${error.message}`);
            return { props: { pokemones: [] } }
        })
}