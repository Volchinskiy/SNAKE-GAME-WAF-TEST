import HttpSerivce from "./Http.service";

class ScoresService extends HttpSerivce {
  Url: string;
  constructor() {
    super();
    this.Url = "score";
  }
  async getTop10(){
    return await this.get(`${this.Url}`);
  }

  async addNew(data: any) {
    return await this.post(`${this.Url}`, data);
  }
}

const scoresService = new ScoresService();
export default scoresService;