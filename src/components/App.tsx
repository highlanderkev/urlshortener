import React from "react";
import api from "../api";
import UrlList from "./UrlList";
import CustomInput from "./CustomInput";
import UrlDisplay from "./UrlDisplay";

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      url: "",
      slug: "",
      mostRecent: null,
      list: ["one", "two", "three"]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllUrlLinks = this.getAllUrlLinks.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.getAllUrlLinks();
  }

  getAllUrlLinks() {
    api.getAllUrlLinks().then((response) => {
      console.log("response", response);
      if (response?.data) {
        this.setState({
          list: response?.data
        });
      }
    });
  }

  handleUrlChange = (url: any) => {
    this.setState({
      url: url
    });
  };

  handleSlugChange = (slug: any) => {
    this.setState({
      slug: slug
    });
  };

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log("Submit", this.state.url, this.state.slug);
    api
      .createShortenedUrlLink(this.state.url, this.state.slug)
      .then((response) => {
        console.log("short", response);
        if (response && response?.data) {
          this.setState(
            {
              mostRecent: response.data
            },
            () => {
              this.getAllUrlLinks();
            }
          );
        }
      });
  }

  handleRemove(slug: string) {
    api.deleteShortenedUrlLink(slug).then(() => {
      this.getAllUrlLinks();
    });
  }

  render() {
    return (
      <div className="App">
        <h1>URL Shortener</h1>
        <h2>Input a URL to get a shortened version.</h2>
        <form onSubmit={this.handleSubmit}>
          <CustomInput
            type={"url"}
            name={"url"}
            placeholder={"https://google.com"}
            input={this.state.url}
            onInputChange={this.handleUrlChange}
          />
          <CustomInput
            type={"text"}
            name={"slug"}
            placeholder={"/fun"}
            input={this.state.slug}
            onInputChange={this.handleSlugChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {this.state.mostRecent ? (
          <UrlDisplay entry={this.state.mostRecent} />
        ) : null}
        <UrlList list={this.state.list} onRemove={this.handleRemove} />
      </div>
    );
  }
}
