import axios, { Axios } from "axios";

class HttpSerivce {
  baseUrl: string | undefined;
  fetchingService: Axios;
  apiVersion: string;
  constructor(
      baseUrl = "http://localhost:5000",
      fetchingService = axios,
      apiVersion = "api",
    ) {
      this.baseUrl = baseUrl;
      this.fetchingService = fetchingService;
      this.apiVersion = apiVersion;
    }
    getUrl(url: string) {
      return `${this.baseUrl}/${this.apiVersion}/${url}`;
    }
    async get(url: string) {
      return await this.fetchingService.get(this.getUrl(url));
    }
    async post(url: string, data: object) {
      return await this.fetchingService.post(this.getUrl(url), data);
    }
    async put(url: string, data: object) {
      return await this.fetchingService.put(this.getUrl(url), data);
    }
}

export default HttpSerivce;