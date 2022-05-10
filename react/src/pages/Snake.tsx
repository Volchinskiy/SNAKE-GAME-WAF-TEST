import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import scoresService from "./../services/Scores.service";
import { setScoreAction } from "./../redux/store";


interface obj{
  type: string | boolean
}

export default function Snake() {
  const BORD_SIZE = 10;
  const DEFAULT_CELLS_VALUES = Array(BORD_SIZE).fill(Array(BORD_SIZE).fill("rr"));
  const AVAILABLE_MOVE = [ "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "GameStop" ]

  const [snake, setSnake] = React.useState([[3, 1],[2,1],[1,1]]);
  const [food, setFood] = React.useState([0, 0]);
  const [direction, setDirection] = React.useState(AVAILABLE_MOVE[4]);
  const [foodWeight, setFoodWeight] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [speed, setSpeed] = React.useState(500);
  const state: any = useSelector( (state) => state );
  const dispatch = useDispatch();

  async function getTop10() {
    await scoresService.getTop10()
    .then( (object) => {
      if(object.data){
        dispatch(setScoreAction(object.data))
      }
    })
  }

  async function addNewScore() {
    const objScore = {
      name: state.name,
      person_id: state.id,
      score: score
    }
    await scoresService.addNew(objScore);
  }

  function handleKeyDown(event: any) {
    const index = AVAILABLE_MOVE.indexOf(event.key);
    if(index > -1){
      setDirection(AVAILABLE_MOVE[index]);
    }
  }

  React.useEffect( () => {
    document.addEventListener("keydown", handleKeyDown);
  }, [])

  React.useEffect( () => {
    const interval = gameLoop();
    getTop10();
    return () => clearInterval(interval);
  }, [snake] )

  const gameLoop = () => {
    const timerId = setTimeout( () => {

      let newSnake = snake;
      let move = [];

      switch(direction){
        case AVAILABLE_MOVE[0]:
          move = [-1, 0]; 
          break;

        case AVAILABLE_MOVE[1]:
          move = [0, 1]; 
          break;

        case AVAILABLE_MOVE[2]:
          move = [1, 0];
          break;
          
        case AVAILABLE_MOVE[3]:
          move = [0, -1];
          break;

        case AVAILABLE_MOVE[4]:
          move = [0, 0];
          break;
          
        default: move = [1, 0];
      }

      let head = [
        chekAvailableSlot(newSnake[newSnake.length -1][0] + move[0]),
        chekAvailableSlot(newSnake[newSnake.length -1][1] + move[1]) 
      ];

      let spliceIndex = 1;
      if (head[0] === food[0] && head[1] === food[1]){
        if(Math.floor(score / 50) === 1){
          setSpeed(400);
        } else if ( Math.floor(score / 50) === 2 ){
          setSpeed(300);
        } else if ( Math.floor(score / 50) === 3 ){
          setSpeed(200);
        } else if ( Math.floor(score / 50) >= 4 ){
          setSpeed(100);
        }
        setScore(score + foodWeight);

        genereteFood();
        spliceIndex = 0;
      }
      
      if(direction !== AVAILABLE_MOVE[4]){
        let crosses = newSnake.filter( (item) => item[0] === head[0] && item[1] === head[1])
        if(crosses[0]){
          setScore(0);
          newSnake = [[3, 1],[2,1]];
          head = [1,1];
          spliceIndex = 0;
          setFood([0, 0]);
          setDirection(AVAILABLE_MOVE[4]);
          setFoodWeight(1);
          setSpeed(500);
          addNewScore();
          getTop10();
        }

        newSnake.push(head);
        setSnake(newSnake.slice(spliceIndex));
      }

      if(direction === AVAILABLE_MOVE[4]){
        setSnake(newSnake.slice());
      }
    }, speed);

    return timerId;
  }

  function chekAvailableSlot(position: any) {
    switch (true){
      case position >= BORD_SIZE: 
        return 0;
      case position < 0:
        return BORD_SIZE - 1;
      default: 
        return position;  
    }
  }

  function genereteFood() {
    let newFood = [0, 0];
    do {
      newFood = [
        Math.floor(Math.random() * BORD_SIZE), 
        Math.floor(Math.random() * BORD_SIZE)
      ]
    } while (snake.some(elem => elem[0] === newFood[0] && elem[1] === newFood[1]));
    setFood(newFood);

    const randomNumb = Math.floor(Math.random() * 10);
    if( 0 <= randomNumb ){
        if( randomNumb <= 5 ){
          setFoodWeight(1);
        }
      }
      if( 6 <= randomNumb ){
        if( randomNumb <= 8 ){
          setFoodWeight(5);
        }
      }
      if( 9 <= randomNumb ){
        if( randomNumb <= 10 ){
          setFoodWeight(10); 
        }
      }
  }

  function Cell({type}: obj) {
    let result = <div className="row__cell"></div>
  
    if(type === "snake"){
      result = <div className="row__cell row__cell-snake"></div>
    }
    
    if(type === "food"){
      if(foodWeight === 1){
        result = <div className="row__cell row__cell-food1">1</div>
      }
      if(foodWeight === 5){
        result = <div className="row__cell row__cell-food2">5</div>
      }
      if(foodWeight === 10){
        result = <div className="row__cell row__cell-food3">10</div>
      }
    }
  
    return result;
  }

  const onPlay = () => {
    setDirection(AVAILABLE_MOVE[0]);
  }
  
  const onPause = () => {
    setDirection(AVAILABLE_MOVE[4]);
  }

  function onReset() {
    setScore(0);
    setSnake([[3, 1],[2,1],[1,1]]);
    setFood([0, 0]);
    setDirection(AVAILABLE_MOVE[4]);
    setFoodWeight(1);
    setSpeed(500);
    addNewScore();
    getTop10();
  }

  return (
    <div className='snake-game'>
      <div>
        <div>score: {score}</div>
        {
          DEFAULT_CELLS_VALUES.map( (row, indexR) => {return (
            <div className='row' key={indexR}>
              { 
                row.map( (_cell: any, indexC: any) => {
                  const obj: obj = {
                    type: snake.some(elem => elem[0] === indexR && elem[1] === indexC) && "snake",
                  } 

                  if(obj.type !== "snake"){
                    obj.type = (food[0] === indexR && food[1] === indexC) && "food"
                  }
                  return <Cell key={indexC} {...obj} />
                }) 
              }
            </div>
          )})
        }
        <div>
          {
            direction !== AVAILABLE_MOVE[4]
            ?
            <div> 
              <button onClick={onPause}>pause</button>
              <button onClick={onReset}>reset</button>
            </div>
            : 
            <button onClick={onPlay}>play</button>
          }
        </div>

      </div>
      <div className='score'>
        {
          state.scores.map( (item: any) => {
            return (
              <div className='score__item'>
                <div>{item.name}</div>
                <div>{item.score}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

