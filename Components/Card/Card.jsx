import styles from './Card.module.css';
import Image from 'next/image';
import Link from 'next/link';


const Card = ({ id, name, image, types }) => {
    return (
        <>
            <li key={id}>
                <Link href="">

                    <div className={styles.card}>
                        <div className={styles.nombreTipos}>
                            <h3>{name}</h3>
                            <div className={styles.tipos}>
                                {types.map(tipo => {
                                    return (
                                        <p className={styles.tipo}>{tipo.type.name}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <Image src={image} alt={name} className={styles.image} width={150} height={150} priority />
                    </div>
                </Link>
            </li>
        </>
    )
}

export default Card;