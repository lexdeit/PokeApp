import axios from "axios";

const getPokemon = (url, setPokemones, setPages) => {
    setPokemones([])
    axios.get(url)
        .then(res => {
            if (res.data.next || res.data.previous) setPages({ next: res.data.next, previous: res.data.previous });
            return res.data.results.map(result => result.url)
        })
        .then(urls => Promise.all(urls.map(url => axios.get(url))))
        .then(responses => {
            setPokemones(responses.reduce((acc, response) => {
                const { id, name, sprites, types } = response.data;
                return [...acc, { id, name, image: sprites.other.dream_world.front_default, types }];
            }, []));
        });
};

export default getPokemon;