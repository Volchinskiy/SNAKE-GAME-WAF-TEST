import { Request, Response } from "express";
import PersonService from "../servises/persone.services";

interface result {
  name: string;
  id: number | null;
  login: boolean;
}

class PersonController {
  constructor(private PersonService: PersonService){} 
  async createPerson(req: Request, res: Response){
    const {name, password} = req.body;
    const newPerson = await this.PersonService.createPerson(name, password);
    const result = {...newPerson, login: true};

    res.status(200).send(result);
  }
  async loginPerson(req: Request, res: Response){
    const {name, password} = req.body;
    const people = await this.PersonService.loginPerson();
    let result: result = {login: false, id: null, name: ""};

    for(let index of people){
      if(name === index.name){
        if(password === index.password){
          result = {login: true, id: index.id, name: index.name};
        }
      }
    }

    res.status(200).send(result);
  }
}

const personController = new PersonController(new PersonService());
export default personController;