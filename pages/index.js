import { Roboto } from 'next/font/google';
import Home from './home';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function App({ Pokemones }) {


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
    })
  })

  return {
    props: {
      Pokemones
    }
  }
}