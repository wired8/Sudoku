import React, { Component } from "react";
import "../assets/style/index.css";

export default class Square extends Component {
  fireOnChange(evt) {
    const value = evt.target.value;
    if (parseInt(value, 10) || value === "") {
      this.props.onCellValueChange(
        this.props.row,
        this.props.col,
        evt.target.value
      );
    }
  }

  render() {
    const value = this.props.value;
    return (
      <input
        type="text"
        value={value === 0 ? "" : value}
        maxLength="1"
        onChange={this.fireOnChange.bind(this)}
      />
    );
  }
}





