import "bootstrap/dist/css/bootstrap.min.css";

function Logo(props) {
  return (
    <div>
      <img
        className="coin-logo d-inline"
        src={`https://cryptologos.cc/logos/${props.name.toLowerCase()}-${props.abr.toLowerCase()}-logo.svg?v=029`}
        width={props.size}
        alt={`${props.abr.toUpperCase()} logo`}
      ></img>
      <p className="d-inline ms-3">{props.abr.toUpperCase()}</p>
    </div>
  );
}

export default Logo;
