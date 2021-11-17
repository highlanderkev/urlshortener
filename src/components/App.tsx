import React from "react";
import api from "../api";
import { URLEntry } from "../urlEntry.model";
import UrlList from "./UrlList";
import CustomInput from "./CustomInput";
import UrlDisplay from "./UrlDisplay";

type AppState = {
  url: string;
  slug: string;
  mostRecent: URLEntry | null;
  list: Array<URLEntry>;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: "",
      slug: "",
      mostRecent: null,
      list: []
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

  handleSubmit(event: any) {
    event.preventDefault();
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
      <div className="App container">
        <div className="row">
          <h1>URL Shortener</h1>
          <h2>Input a URL to get a shortened version.</h2>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <CustomInput
                  type={"url"}
                  name={"Required url"}
                  placeholder={"https://google.com"}
                  input={this.state.url}
                  onInputChange={this.handleUrlChange}
                />
              </div>
              <div className="mb-3">
                <CustomInput
                  type={"text"}
                  name={"Optional slug"}
                  placeholder={"/fun"}
                  input={this.state.slug}
                  onInputChange={this.handleSlugChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </form>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
            {this.state.mostRecent ? (
              <UrlDisplay entry={this.state.mostRecent} />
            ) : null}
          </div>
        </div>
        <div className="row">
          <UrlList list={this.state.list} onRemove={this.handleRemove} />
        </div>
      </div>
    );
  }
}
