import React, { Component, Fragment } from "react";
import Badge from "react-bootstrap/Badge";

class DrinkStats extends Component {
  sum_of_single_tag(tag) {
    return (
      this.props.entries
        .filter((e) => e.name.tag.map((e) => e.tag_text).includes(tag))
        .map((e) => e.amount.amount)
        .reduce((a, b) => a + b, 0) / 1000
    );
  }

  sum_of_all_tags() {
    const res = {};
    const all_tags = new Set();
    this.props.entries.forEach((e) =>
      e.name.tag.forEach((e) => all_tags.add(e.tag_text))
    );
    all_tags.forEach((t) => (res[t] = this.sum_of_single_tag(t)));
    const total =
      this.props.entries.map((e) => e.amount.amount).reduce((a, b) => a + b) /
      1000;
    res.total = total;

    return res;
  }

  get_drink_statistics() {
    const total_by_tag = this.sum_of_all_tags();
    const stat = Object.entries(total_by_tag).map(([tag, amount]) => {
      let badge_name = "";
      switch (tag) {
        case "alcoholic":
          badge_name = "danger";
          break;
        case "sugary":
          badge_name = "warning";
          break;
        case "non-alcoholic":
        default:
          badge_name = "primary";
          break;
      }

      return (
        <Fragment key={tag}>
          <Badge variant={badge_name}>
            {tag}: {amount}l ({(100 * (amount / total_by_tag.total)).toFixed(2)}
            %)
          </Badge>
          <br />
        </Fragment>
      );
    });
    return stat;
  }

  render() {
    if (this.props.entries.length === 0) return null;
    return <div>{this.get_drink_statistics()}</div>;
  }
}

export default DrinkStats;
