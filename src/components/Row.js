import React from "react";

export default function Row({ coin }) {
  const formatPercent = (number) => `${Number(number).toFixed(1)}%`;

  function formatCap(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);

  return (
    <tr id={coin.id}>
      <td className="assets">
        <img className="assets__image" src={coin.image} alt={coin.name} />
        <div className="assets_name">
          <p>{coin.name}</p>
          <p>{coin.symbol}</p>
        </div>
      </td>
      <td className="align">{formatDollar(coin.current_price, 20)}</td>
      <td className="align">
        {coin.price_change_percentage_24h_in_currency > 0 ? (
          <span className="text-success">
            +{formatPercent(coin.price_change_percentage_24h_in_currency)}
          </span>
        ) : (
          <span className="text-danger">
            {formatPercent(coin.price_change_percentage_24h_in_currency)}
          </span>
        )}
      </td>
      <td className="align">
        {coin.price_change_percentage_7d_in_currency > 0 ? (
          <span className="text-success">
            +{formatPercent(coin.price_change_percentage_7d_in_currency)}
          </span>
        ) : (
          <span className="text-danger">
            {formatPercent(coin.price_change_percentage_7d_in_currency)}
          </span>
        )}
      </td>
      <td className="align">
        {coin.price_change_percentage_30d_in_currency > 0 ? (
          <span className="text-success">
            +{formatPercent(coin.price_change_percentage_30d_in_currency)}
          </span>
        ) : (
          <span className="text-danger">
            {formatPercent(coin.price_change_percentage_30d_in_currency)}
          </span>
        )}
      </td>
      <td className="align">{formatCap(coin.market_cap, 1)}</td>
    </tr>
  );
}
