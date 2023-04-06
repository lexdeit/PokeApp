import { Roboto } from 'next/font/google';
import styles from './app.module.css';
import Link from 'next/link';
import Cards from '@/Components/Cards/Cards';
import Home from './home';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function App({ Pokemones }) {


  return (
    <>
      <main className={roboto.className}>
        <section className={styles.container}>

          <ul className={styles.columnasul}>
            {Pokemones.map(pokemon => {
              return (
                <li key={pokemon.id}>
                  <Link href="">

                    <div className={styles.card}>
                      <div className={styles.nombreTipos}>
                        <h3>{pokemon.name}</h3>
                        <div className={styles.tipos}>
                          {pokemon.types.map((tipo, index) => {
                            return (
                              <p className={styles.tipo}>{tipo.type.name}</p>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <img src={pokemon.image} alt={pokemon.name} width='150' height='150' className={styles.image} />
                  </Link>
                </li>
              )
            })}
          </ul>

          <Home Pokemones={Pokemones} />

        </section>
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