import React, { Component } from "react";
import Search from "./search.jsx";
import { useAsync } from "react-async";
import alphavantage from "../../node_modules/alphavantage/dist/bundle.js";

let ticker = "";

const rsiCall = async () =>
  await alphavantage({ key: "JDP9NGZV8MO31I09" })
    .technical.rsi(ticker, "daily", "60", "close")
    .then(res => res);

function Stock(props) {
  ticker = props.name;
  const { data, error, isLoading } = useAsync({ promiseFn: rsiCall });
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data)
    return (
      <div>
        {console.log(data)}
        {console.log(data["Meta Data"]["1: Symbol"])}
        {console.log(
          data["Technical Analysis: RSI"][
            data["Meta Data"]["3: Last Refreshed"]
          ]
        )}
        <h3>{data["Meta Data"]["1: Symbol"]}</h3>
        <div>
          RSI:
          {
            data["Technical Analysis: RSI"][
              data["Meta Data"]["3: Last Refreshed"]
            ]["RSI"]
          }
        </div>
      </div>
    );
}

export default Stock;
