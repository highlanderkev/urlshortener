import React from 'react';
import UrlDisplay from "./UrlDisplay";
import renderer from "react-test-renderer";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()})
describe('Url Display Component', () => {
  it("matches snapshot", () => {
    const urlDisplay = renderer.create(<UrlDisplay entry={{ url: 'Test', short_url: 'Test', slug: '' }} />);
    let tree = urlDisplay.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays url entry", () => {
    const display = shallow(<UrlDisplay entry={{ url: 'Test', short_url: 'Test', slug: '' }} />)
    expect(display.text()).toEqual("Original URL: TestShortened URL: Test");
  });
})
