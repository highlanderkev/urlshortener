import React from 'react';
import UrlList from "./UrlList";
import renderer from "react-test-renderer";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()})
describe('URL List Component', () => {
  it("matches snapshot", () => {
    const urlList = renderer.create(<UrlList list={[{ url: 'test', slug: 'test', short_url: 'test'}]} onRemove={() => {}} />);
    let tree = urlList.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays list of url entries", () => {
    const urlList = shallow(<UrlList list={[{ url: 'test', slug: 'test', short_url: 'test'}]} onRemove={() => {}} />)
    expect(urlList.text()).toEqual("Previously Shortened URLs<UrlListItem />");
  });
})
