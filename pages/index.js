import { Roboto } from 'next/font/google';
import Home from './home';
import axios from 'axios';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function App({ Pokemones }) {


  axios.get(`https://pokeapi.co/api/v2/pokemon/`)
    .then(response => response.data)
    .then(data => data.results)
    .then(results => {
      const characters = results.map(character => {
        return fetch(character.url)
          .then(res => res.json())
      });
      return Promise.all(characters)
    })
    .then(characters => {
      return characters.map(pokemon => {
        return ({ id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites.other.dream_world.front_default, types: pokemon.types })
      })
    })
    .then(pokemon => console.log(pokemon))
    .catch(error => console.error(error.message))


  return (
    <>
      <main className={roboto.className}>
        <Home Pokemones={Pokemones} />
      </main>
    </>
  )


};




export async function getServerSideProps() {


  const getPokemons = async (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`)
      .then(response => response.json())
      .then(data => data)
  }

  let Pokemones = [];

  for (let i = 1; i <= 20; i++) {

    let Pokemon = await getPokemons(i)
    Pokemones.push(Pokemon)
  }

  Pokemones = Pokemones.map(({ id, name, sprites, types }) => {
    return ({
      id,
      name,
      image: sprites.other.dream_world.front_default,
      types,
      hola: 'hola'
    })
  })

  return {
    props: {
      Pokemones
    }
  }
}






// export async function getServerSideProps() {


//   let Pokemones = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
//     .then(response => response.data)
//     .then(data => data.results)
//     .then(results => {
//       const characters = results.map(character => {
//         return fetch(character.url)
//           .then(res => res.json())
//       });
//       return Promise.all(characters)
//     })
//     .then(characters => {
//       return characters.map(pokemon => {
//         return ({ id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites.other.dream_world.front_default, types: pokemon.types })
//       })
//     })
//     .catch(error => console.error(error.message));



//   return { props: { Pokemones } };
// };