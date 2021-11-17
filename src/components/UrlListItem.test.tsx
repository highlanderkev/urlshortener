import React from 'react';
import UrlListItem from "./UrlListItem";
import renderer from "react-test-renderer";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()})
describe('URL List Item Component', () => {
  it("matches snapshot", () => {
    const listItem = renderer.create(<UrlListItem key={'test'} item={{url: 'test', short_url: 'test', slug: 'test'}} onRemove={() => {}} />);
    let tree = listItem.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays list url entry", () => {
    const listItem = shallow(<UrlListItem key={'test'} item={{url: 'test', short_url: 'test', slug: 'test'}} onRemove={() => {}} />)
    expect(listItem.text()).toEqual("testtesttest");
  });

})
