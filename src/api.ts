import axios from "axios";
import { URLEntry } from "./urlEntry.model";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "GB-Access-Token": import.meta.env.VITE_API_KEY || '',
    "Content-Type": "application/json"
  }
});

class UrlShortenerApi {
  errorHandler(error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
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

  async deleteAllShortenedUrlLinks() {
    const response = await this.getAllUrlLinks()
    const links: Array<URLEntry> = response?.data
    if(links && links.length > 0) {
      links.forEach(async (link) => {
        await this.deleteShortenedUrlLink(link.slug)
      })
    }
  }
}
export default new UrlShortenerApi();
