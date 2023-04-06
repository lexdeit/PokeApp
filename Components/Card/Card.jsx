import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Card.module.css';

const cardAnimation = {

    initial: {
        opacity: 0,
        x: -400
    },

    animate: {
        x: 0
    },

    transition: {
        duration: 1
    },

    whileHover: {
        scale: 1.1
    },

    whileInView: {
        opacity: 1
    }

};

const imageAnimation = {

    initial: {
        opacity: 0,
        y: -50
    },

    animate: {
        opacity: 1,
        y: 0
    },
};

const Card = ({ id, name, image, types }) => {
    return (
        <>
            <li key={id}>
                <Link href="">

                    <motion.div

                        variants={cardAnimation}
                        initial='initial'
                        animate='animate'
                        transition='transition'
                        whileHover={{ scale: 1.1 }}
                        whileInView='whileInView'

                        className={`${styles.card} ${types[0].type.name}`}>
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

                        <motion.img

                            variants={imageAnimation}
                            initial='initial'
                            animate='animate'
                            whileHover={{ y: -10 }}

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