import { Request, Response } from "express";
import PersonService from "../servises/persone.services";

class PersonController {
  constructor(private PersonService: PersonService){} 
  async createPerson(req: Request, res: Response){
    const {name, password} = req.body;
    const newPerson = await this.PersonService.createPerson(name, password);
    const result = {...newPerson, login: true}
    res.status(200).send(result);
  }
  async loginPerson(req: Request, res: Response){
    const {name, password} = req.body;
    const people = await this.PersonService.loginPerson();
    let result = {login: false, id: null};

    for(let index of people){
      console.log(index);
      if(name === index.name){
        if(password === index.password){
          result = {login: true, id: index.id};
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