import Card from "../Card/Card";
import styles from './Cards.module.css';

const Cards = ({ Pokemones }) => {

    return (
        <>
            <div className={styles.principal}>
                {Pokemones.map(({ id, name, image, types }) => {
                    return (
                        <Card key={id} id={id} name={name} image={image} types={types} />
                    )
                })}
            </div>

        </>
    )

};

export default Cards;