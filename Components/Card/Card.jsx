import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Card.module.css';


const containerAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1, scale: 1, transition: {
            delayChildren: 0.1,
            staggerChildren: 0.5
        }
    },
    hover: { scale: 1.2, zIndex: 10 }
};

const iconPokemonVariants = {
    hidden: { y: 20, opacity: 0, rotateZ: 100 },
    visible: { y: 0, opacity: 1, rotateZ: 0 },
};



const Card = ({ id, name, image, types }) => {
    return (
        <>
            <li key={id}>
                <Link href="">

                    <motion.div
                        variants={containerAnimation}
                        initial="hidden"
                        whileInView="visible"
                        whileHover='hover'
                        className={`${styles.card} ${types[0].type.name}`}>

                        <motion.div
                            variants={iconPokemonVariants}
                            className={styles.nombreTipos}>
                            <motion.h3
                                variants={iconPokemonVariants}
                            >{name}</motion.h3>
                            <motion.div
                                variants={iconPokemonVariants}
                                className={styles.tipos}>
                                {types.map(tipo => {
                                    return (
                                        <motion.p
                                            variants={iconPokemonVariants}
                                            className={styles.tipo}>{tipo.type.name}</motion.p>
                                    )
                                })}
                            </motion.div>
                        </motion.div>

                        <motion.img
                            variants={iconPokemonVariants}
                            src={image}
                            alt={name}
                            className={styles.image}
                            width={150}
                            height={150}
                        />


                    </motion.div>
                </Link>
            </li>
        </>
    )
}

export default Card;