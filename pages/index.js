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
      .then(data => {
        const urls = data.results.map(result => result.url);
        return urls;
      })
      .then(urls => { const promises = urls.map(url => axios.get(url)); return promises })
      .then(promises => { return Promise.allSettled(promises) })
      .then(respones => {
        let pokemones = [];
        respones.forEach(response => {
          if (response.status === 'fulfilled') {
            pokemones.push(response.value.data)
          }
        })
        return pokemones;
      })
      .then(pokemones => {
        const organizado = pokemones.map(pokemon => {
          return { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.other.dream_world.front_default, types: pokemon.types }
        })
        setPokemones(organizado)
      })
  }, [])


  return (
    <>
      <main className={roboto.className}>
        {Pokemones.length !== 0 && <Home Pokemones={Pokemones} />}
      </main>
    </>
  )
};



// export async function getServerSideProps(context) {

//   return axios.get(`https://pokeapi.co/api/v2/pokemon/`)
//     .then(res => res.data)
//     .then(data => {
//       const urls = data.results.map(result => result.url);
//       return urls;
//     })
//     .then(urls => { const promises = urls.map(url => axios.get(url)); return promises })
//     .then(promises => { return Promise.allSettled(promises) })
//     .then(respones => {
//       let pokemones = [];
//       respones.forEach(response => {
//         if (response.status === 'fulfilled') {
//           pokemones.push(response.value.data)
//         }
//       })
//       return pokemones;
//     })
//     .then(pokemones => {
//       const organizado = pokemones.map(pokemon => {
//         return { id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites, types: pokemon.types }
//       })
//       console.log(organizado);
//       return organizado;
//     })
//     .then(organizado => {
//       return {
//         props: { organizado },
//       }
//     })
// }