
import styles from './BarCard.module.css'

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 50%)`;
};

const BarCard = (props) => {
  const color = props.color ?? getRandomColor();
  const size = props.size ?? 20;

  console.info("Props Color", color);
  console.info("Props Size", size);

  const colorBarStyles = {
    background: `linear-gradient(to bottom, ${color}, #fff)`,
    width: `${size}px`
  };

  const styledDivStyles = {
    padding: `10px ${props.size + 10}px`
  };

  return (
    <div className={styles.cardDiv} style={styledDivStyles}>
      {/* <div className={styles.cardBar} style={colorBarStyles}></div> */}
      {props.children}
    </div>
  );
};

export default BarCard;
