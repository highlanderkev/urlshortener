import React from "react";

type InputType = "text" | "url";

type CustomInputProps = {
  type: InputType;
  name: string;
  placeholder: string;
  input: string;
  onInputChange: Function;
};

export default class CustomInput extends React.Component<CustomInputProps> {
  handleChange = (event: Event) => {
    this.props.onInputChange(event?.target?.value);
  };

  render() {
    return (
      <div className="form-floating">
        <input
          type={this.props.type}
          name={this.props.name}
          value={this.props.input}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          className="form-control"
        />
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <span>Value: {this.props.input}</span>
      </div>
    );
  }
}
