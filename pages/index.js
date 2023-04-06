import { Roboto } from 'next/font/google';
import Home from './home';
import axios from 'axios';
import { useEffect, useState } from 'react';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function App() {
  const [Pokemones, setPokemones] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/`)
      .then(res => res.data)
      .then(results => {
        const URLS = results.results.map(resultado => resultado.url);
        return URLS;
      })
      .then(urls => {
        const promises = urls.map(url => axios.get(url));
        return Promise.all(promises)
          .then((responses) => {
            let resul = [];
            responses.forEach(res => { resul.push(res.data) })
            return resul;
          })
      })
      .then(response => {
        const Pokemones = response.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types
        }))
        setPokemones(Pokemones);
      })
  }, []); 


  return (
    <>
      <main className={roboto.className}>
        {Pokemones.length !== 0 && <Home Pokemones={Pokemones} />}
      </main>
    </>
  )
};