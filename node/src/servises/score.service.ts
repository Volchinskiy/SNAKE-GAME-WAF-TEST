import db from "../db/db";

export default class ScoreService{
  async addNewScore(name: string, score: number, person_id: number){
    const newScore = await db.query(`INSERT INTO score (name, score, person_id) values ($1, $2, $3) RETURNING *`, [name, score, person_id]);
    return newScore.rows[0];
  }
  async getTop10Scores(){
    const scores = await db.query('SELECT * FROM score');
    return scores.rows;
  }
}