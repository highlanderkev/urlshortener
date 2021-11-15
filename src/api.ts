import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "GB-Access-Token": process.env.API_KEY
  }
});

class UrlShortenerApi {
  private errorHandler(error: any) {
    console.error(error);
  }

  async getAllUrlLinks() {
    return await api.get("/links").catch(this.errorHandler);
  }

  async createShortenedUrlLink(url: string, slug?: string) {
    return await api
      .post("/links", {
        url: url,
        slug: slug || null
      })
      .catch(this.errorHandler);
  }

  async deleteShortenedUrlLink(slug: string) {
    return await api.delete(`/links/${slug}`).catch(this.errorHandler);
  }
}
export default new UrlShortenerApi();
