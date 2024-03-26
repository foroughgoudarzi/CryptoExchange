import useSWR from "swr";

function Price(props) {
  const fetcher = (...args) =>
    fetch(new Request(...args), {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        authorization:
          'Apikey "decb05752b2fdc589a80b18337ab566dfa63e3baf5639ebc35ad882463279e25"',
      }),
    }).then(function (response) {
      return response.json();
    });

  // Implements useSWR
  const { data, error, isLoading } = useSWR(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${props.abr}&tsyms=GBP`,
    fetcher,
    { refreshInterval: 1000000 }
  );
  console.log(data);
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
