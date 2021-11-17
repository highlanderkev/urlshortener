import React from "react";
import PropTypes from "prop-types";
import UrlListItem from "./UrlListItem";
import { URLEntry } from "../urlEntry.model";

type UrlListProps = {
  list: Array<URLEntry>;
  onRemove: Function;
};

class UrlList extends React.Component<UrlListProps> {
  render() {
    return (
      <div>
        <h2>Previously Shortened URLs</h2>
        <ol className="list-group list-group-numbered">
          {this.props.list.map((el: URLEntry) => {
            return (
              <UrlListItem
                key={el.slug}
                item={el}
                onRemove={this.props.onRemove}
              />
            );
          })}
        </ol>
      </div>
    );
  }
}

export default UrlList;
