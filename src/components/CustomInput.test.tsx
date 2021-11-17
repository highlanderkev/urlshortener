import React from 'react';
import CustomInput from "./CustomInput";
import renderer from "react-test-renderer";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()})
describe('Custom Input Component', () => {
  it("matches snapshot", () => {
    const customInput = renderer.create(<CustomInput type={"text"} name={"test"} placeholder={"test"} input={""} onInputChange={() => {}}/>);
    let tree = customInput.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays prop name by default", () => {
    const input = shallow(<CustomInput
      type={"url"}
      name={"url"}
      placeholder={"https://google.com"}
      input={""}
      onInputChange={() => {}}
    />)
    expect(input.text()).toEqual("url");
  });

  it("calls prop function with value on input change", () => {
    const mockFn = jest.fn();
    const input = shallow(<CustomInput
      type={"url"}
      name={"url"}
      placeholder={"https://google.com"}
      input={"test"}
      onInputChange={mockFn}
    />)
    input.find('input').simulate('change', { target: { value: 'test' } })
    expect(mockFn.mock.calls[0][0]).toBe('test');
  });
})

