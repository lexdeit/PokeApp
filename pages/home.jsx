import Cards from "@/Components/Cards/Cards";

const Home = ({ Pokemones }) => {

    return (
        <>
            <Cards Pokemones={Pokemones} />
        </>
    )
}

export default Home
export async function getServerSideProps() {


    const getPokemons = async (numero) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`)
            .then(response => response.json())
            .then(data => data)
    }

    let Pokemones = [];

    for (let i = 1; i <= 100; i++) {

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