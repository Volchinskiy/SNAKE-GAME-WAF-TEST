import { Request, Response } from "express";
import ScoreService from "../servises/score.service";

class ScoreController{
  constructor(private ScoreService: ScoreService ){}  
  async addNewScore(req: Request, res: Response){
    const {name, score, person_id} = req.body;
    const newScore = await this.ScoreService.addNewScore(name, score, person_id);
    res.status(200).send(newScore);
  }
  async getTop10Scores(_req: Request, res: Response){
    const scores = await this.ScoreService.getTop10Scores();

    scores.sort((a, b) => { 
      if (a.score > b.score) {
        return -1
      } else if (a.score < b.score) {
        return 1
      };
      return 0;
    });

    if(scores.length > 10){
      scores.length = 10;
    }

    res.status(200).send(scores);
  }
}

const scoreController = new ScoreController( new ScoreService());
export default scoreController;