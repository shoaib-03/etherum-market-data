import React, { useState, useEffect } from "react";
import axios from "axios";

import Row from "../components/Row";

export default function Home() {
  const [marketData, setMarketData] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getMartketData = () => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d`;

    axios
      .get(url, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setMarketData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getMoreData = () => {
  //   let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${pageNumber}&sparkline=false&price_change_percentage=24h%2C7d%2C30d`;

  //   axios
  //     .get(url, {
  //       headers: {
  //         accept: "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setMarketData([...marketData, ...res.data]);
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    getMartketData();
  }, []);

  // useEffect(() => {
  //   getMoreData();
  // }, [pageNumber]);

  return (
    <div className="home__wrapper">
      <div className="header__wrapper">
        <h1>Market</h1>
        <p>All Ethereum-based tokens</p>
      </div>

      {isLoading ? (
        <span>Fetching...</span>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Assets</th>
              <th className="align">Price</th>
              <th className="align">1 Day</th>
              <th className="align">7 Days</th>
              <th className="align">30 Days</th>
              <th className="align">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {marketData.map((coin) => {
              return <Row key={coin.id} coin={coin} />;
            })}
          </tbody>
        </table>
      )}
      {!isLoading && (
        <button
          className="loadmore__btn"
          // onClick={() => setPageNumber(pageNumber + 1)}
        >
          More assets
        </button>
      )}
    </div>
  );
}
