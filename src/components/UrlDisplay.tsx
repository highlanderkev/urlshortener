import React from "react";
import { URLEntry } from "../urlEntry.model";

type UrlDisplayProps = {
  entry: URLEntry;
};

export default class UrlDisplay extends React.Component<UrlDisplayProps> {
  render() {
    return (
      <div>
        <h3>Original URL: {this.props.entry.url}</h3>
        <h4>Shortened URL: {this.props.entry.short_url}</h4>
      </div>
    );
  }
}
