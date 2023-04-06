import { Roboto } from 'next/font/google';
import Home from './home';
import axios from 'axios';
import { useEffect, useState } from 'react';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function App({ urls }) {
  const [Pokemones, setPokemones] = useState([]);

  useEffect(() => {
    Promise.all(urls.map(url => axios.get(url)))
      .then(responses => {
        const pokemones = responses.map(res => {
          const { id, name, sprites, types } = res.data;
          return {
            id,
            name,
            image: sprites.other.dream_world.front_default,
            types
          };
        });
        setPokemones(pokemones);
      })
      .catch(error => {
        // Manejar errores aquí
      });
  }, []);


  return (
    <>
      <main className={roboto.className}>
        {Pokemones.length !== 0 && <Home Pokemones={Pokemones} />}
      </main>
    </>
  )
};

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    const urls = data.results.map(resultado => resultado.url);

    return {
      props: { urls }
    }

  } catch (error) {
    console.log(error);
    return {
      props: { urls: [] }
    }
  }
}