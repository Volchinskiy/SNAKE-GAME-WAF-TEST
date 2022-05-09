import HttpSerivce from "./Http.service";

class PersonService extends HttpSerivce {
  personUrl: string;
  constructor() {
    super();
    this.personUrl = "person";
  }

  async login(name: string, password: string){
    const data = {
      name: name,
      password: password
    }
    return await this.post(`${this.personUrl}/login`, data);
  }

  async register(name: string, password: string){
    const data = {
      name: name,
      password: password
    }
    return await this.post(`${this.personUrl}/register`, data);
  }
}

const personService = new PersonService();
export default personService;