import React from "react";
import { URLEntry } from "../urlEntry.model";

type UrlListItemProps = {
  item: URLEntry;
  onRemove: Function;
};

export default class UrlListItem extends React.Component<UrlListItemProps> {
  handleClick = () => {
    this.props.onRemove(this.props.item.slug);
  };

  render() {
    return (
      <li
        key={this.props.item.slug}
        className="list-group-item d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <a href={this.props.item.url}>{this.props.item.url}</a>
            <br />
            <a href={this.props.item.short_url}>{this.props.item.short_url}</a>
          </div>
          <small>{this.props.item.slug}</small>
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={this.handleClick}
        ></button>
      </li>
    );
  }
}
