import { Request, Response } from "express";
import PersonService from "../servises/persone.servises";

class PersonController {
  constructor(private PersonService: PersonService){} 
  async createPerson(req: Request, res: Response){
    const {name, password} = req.body;
    const newPerson = await this.PersonService.createPerson(name, password);
    res.status(200).send(newPerson);
  }
  async loginPerson(req: Request, res: Response){
    const {name, password} = req.body;
    const people = await this.PersonService.loginPerson();
    let result = false;

    for(let index of people){
      if(name === index.name){
        if(password === index.password){
          result = true;
        }
      }
    }

    res.status(200).send(result);
  }
  async chengeName(req: Request, res: Response){
    const {id, name} = req.body;
    const newPerson = await this.PersonService.chengeName(id, name);
    res.status(200).send(newPerson);
  }
}

const personController = new PersonController(new PersonService());
export default personController;