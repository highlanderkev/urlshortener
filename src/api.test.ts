import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from './api';

describe('api tests', () => {

  beforeAll(async () => {
    await api.deleteAllShortenedUrlLinks()
  })

  it("api returns empty set", done => {
    let mock = new MockAdapter(axios);
    const data: Array<any> = []
    mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/links`).reply(200, data);

    api.getAllUrlLinks().then((response: any) => {
      expect(response.data).toEqual(data);
      done();
    })
  });

  let slugForTesting = ''

  it("api returns new shortened url", done => {
    let mock = new MockAdapter(axios);
    const data = {
      url: 'https://test.com'
    }
    mock.onPost(`${process.env.REACT_APP_API_BASE_URL}/links`).reply(201, data);

    api.createShortenedUrlLink(data.url, ).then((response: any) => {
      expect(response?.data?.url).toEqual(data.url);
      expect(response?.data).toHaveProperty('slug');
      expect(response?.data).toHaveProperty('short_url');
      slugForTesting = response?.data.slug
      done();
    })
  });

  it("api deletes new shortened url", done => {
    let mock = new MockAdapter(axios);
    mock.onDelete(`${process.env.REACT_APP_API_BASE_URL}/links`).reply(204);

    api.deleteShortenedUrlLink(slugForTesting).then(() => {
      api.getAllUrlLinks().then(response => {
        expect(response?.data).toEqual([]);
        done();
      })
    })
  });

  afterAll(async () => {
    await api.deleteAllShortenedUrlLinks()
  })
})

