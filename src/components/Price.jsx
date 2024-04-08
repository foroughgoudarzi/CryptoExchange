import FetchPriceData from "./FetchPriceData";

function Price(props) {
  

  // Implements useSWR
  const { data, error, isLoading } = FetchPriceData(props.abr);

  return (
    <div>
      {error ? (
        <div>failed to load</div>
      ) : isLoading ? (
        <div>loading...</div>
      ) : (
        <p className="mb-0">
          {data.DISPLAY[props.abr].GBP.PRICE}
          <span
            className={
              data.DISPLAY[props.abr].GBP.CHANGEPCTDAY > 0
                ? "text-success ms-4"
                : "text-danger ms-4"
            }
          >
            {data.DISPLAY[props.abr].GBP.CHANGEPCTDAY}%
          </span>
        </p>
      )}
    </div>
  );
}

export default Price;
