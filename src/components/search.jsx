import React from "react";
import { tickers } from "./tickers.js";
import Stock from "./stock.jsx";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.items = tickers;
    this.state = {
      suggestions: [],
      text: "",
      stock: []
    };
  }

  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li key={item} onClick={() => this.suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  addStock = e => {
    console.log(this.state.text);
    // add new stock component here
    this.setState({
      stock: [...this.state.stock, <Stock name={this.state.text} key={this.state.text}/>]
    });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <input value={text} onChange={this.onTextChanged} type="text" />
        <input
          className="button is-primary"
          value="Add"
          type="submit"
          onClick={this.addStock}
        />
        {this.renderSuggestions()}
        <div className="stock-list">{this.state.stock.map(item => item)}</div>
      </div>
    );
  }
}

export default Search;
