import { Roboto } from 'next/font/google';
import Home from './home';
import axios from 'axios';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function App({ Pokemones }) {

console.log(Pokemones);

  axios.get(`https://pokeapi.co/api/v2/pokemon/`)
    .then(response => {
      const promises = response.data.results.map(character => axios.get(character.url));
      return Promise.all(promises);
    })
    .then(responses => Promise.all(responses.map(res => res.data)))
    .then(pokemonData => {
      const formattedPokemonData = pokemonData.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types
      }));
      console.log(formattedPokemonData);
    })
    .catch(error => console.error(error.message));


  return (
    <>
      <main className={roboto.className}>
        <Home Pokemones={Pokemones} />
      </main>
    </>
  )


};




// export async function getServerSideProps() {


//   const getPokemons = async (numero) => {
//     return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`)
//       .then(response => response.json())
//       .then(data => data)
//   }

//   let Pokemones = [];

//   for (let i = 1; i <= 20; i++) {

//     let Pokemon = await getPokemons(i)
//     Pokemones.push(Pokemon)
//   }

//   Pokemones = Pokemones.map(({ id, name, sprites, types }) => {
//     return ({
//       id,
//       name,
//       image: sprites.other.dream_world.front_default,
//       types,
//       hola: 'hola'
//     })
//   })

//   return {
//     props: {
//       Pokemones
//     }
//   }
// }






export async function getServerSideProps() {


  axios.get(`https://pokeapi.co/api/v2/pokemon/`)
    .then(response => {
      const promises = response.data.results.map(character => axios.get(character.url));
      return Promise.all(promises);
    })
    .then(responses => Promise.all(responses.map(res => res.data)))
    .then(pokemonData => {
      const Pokemones = pokemonData.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types
      }));
      return { props: { Pokemones } };

    })
    .catch(error => console.error(error.message));
  return { props: { Pokemones: [] } }


};