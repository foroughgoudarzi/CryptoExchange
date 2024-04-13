import "./style.css";
import Logo from "../../components/Logo";
import Price from "../../components/Price";

function CardItem(props) {
  return (
    <>
      <div className="mt-3">
        <Logo name={props.name} abr={props.abr} size={props.size} />
        <div className="mt-2"/>
        <Price abr={props.abr.toUpperCase()} />
      </div>
    </>
  );
}

export default CardItem;
