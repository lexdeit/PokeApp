  import { Roboto } from 'next/font/google';
  import Home from './home';
  import axios from 'axios';
  import { useEffect, useState } from 'react';

  const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

  export default function App() {
    const [pokemones, setPokemones] = useState([]); // Estado para almacenar los Pokemones

    useEffect(() => {
      // Función para obtener los Pokemones
      const obtenerPokemones = async () => {
        try {
          const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
          const urls = results.data.results.map(resultado => resultado.url);
          const responses = await Promise.all(urls.map(url => axios.get(url)));
          const pokemonesData = responses.map(res => res.data);
          const pokemones = pokemonesData.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            types: pokemon.types
          }));
          setPokemones(pokemones);
        } catch (error) {
          console.error(error);
        }
      };

      obtenerPokemones(); // Llamar a la función para obtener los Pokemones
    }, []); // Vacío como segundo argumento para que solo se ejecute una vez al montar el componente

    console.log("Me ejecute");

    return (
      <>
        <main className={roboto.className}>
          {pokemones.length !== 0 && <Home Pokemones={pokemones} />}
        </main>
      </>
    )
  };



// let Pokemones = axios.get(`https://pokeapi.co/api/v2/pokemon/`)
// .then(res => res.data)
// .then(results => {
//   const URLS = results.results.map(resultado => resultado.url);
//   return URLS;
// })
// .then(urls => {
//   const promises = urls.map(url => axios.get(url));
//   return Promise.all(promises)
//     .then((responses) => {
//       let resul = [];
//       responses.forEach(res => { resul.push(res.data) })
//       return resul;
//     })
// })
// .then(response => {
//   const Pokemones = response.map(pokemon => ({
//     id: pokemon.id,
//     name: pokemon.name,
//     image: pokemon.sprites.other.dream_world.front_default,
//     types: pokemon.types
//   }))
//   return Pokemones;
// })