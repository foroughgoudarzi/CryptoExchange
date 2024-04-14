import useSWR from "swr";

function FetchPriceData(abr) {
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
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${abr}&tsyms=GBP`,
    fetcher,
    { refreshInterval: 1000000 }
  );

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
}

export default FetchPriceData;
