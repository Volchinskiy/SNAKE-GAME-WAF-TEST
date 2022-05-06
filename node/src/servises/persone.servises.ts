import db from "../db/db";

export default class PersonService{
  async createPerson(name: string, password: string){
    const newPerson = await db.query(`INSERT INTO person (name, password) values ($1, $2) RETURNING *`, [name, password]);
    return newPerson.rows[0];
  }
  async chengeName(id:number, name: string){
    const newPerson = await db.query(`UPDATE person set name = $1 where id = $2 RETURNING *`, [name, id]);
    return newPerson.rows[0];
  }
  async loginPerson(){
    const {rows} = await db.query('SELECT * FROM person;');
    return rows;
  }
};