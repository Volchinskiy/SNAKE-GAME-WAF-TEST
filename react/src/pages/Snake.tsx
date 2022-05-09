import React from 'react'

interface obj{
  type: string | boolean
}

export default function Snake() {
  const BORD_SIZE = 10;
  const DEFAULT_CELLS_VALUES = Array(BORD_SIZE).fill(Array(BORD_SIZE).fill("rr"));
  const AVAILABLE_MOVE = [ "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft" ]

  const [snake, setSnake] = React.useState([[1, 1]]);
  const [food, setFood] = React.useState([0, 0]);
  const [direction, setDirection] = React.useState(AVAILABLE_MOVE[0]);
  const [foodWeight, setFoodWeight] = React.useState(1);
  const [score, setScore] = React.useState(49);
  const [speed, setSpeed] = React.useState(500);


  function handleKeyDown(event: any) {
    const index = AVAILABLE_MOVE.indexOf(event.key);
    if(index > -1){
      setDirection(AVAILABLE_MOVE[index]);
    }

  }
  React.useEffect( () => {
    document.addEventListener("keydown", handleKeyDown)
  } )

  React.useEffect( () => {
    const interval = gameLoop();
    return () => clearInterval(interval);
  }, [snake] )

  const gameLoop = () => {
    const timerId = setTimeout( () => {

      const newSnake = snake;
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

      default: move = [1, 0];
    }

    const head = [
      chekAvailableSlot(newSnake[newSnake.length -1][0] + move[0]),
      chekAvailableSlot(newSnake[newSnake.length -1][1] + move[1]) 
    ];

    newSnake.push(head);
    let spliceIndex = 1;
    if (head[0] === food[0] && head[1] === food[1]){
      setScore(score + foodWeight);
    
      console.log(Math.floor(score / 50))
      console.log(speed)

      if(Math.floor(score / 50) === 1){
        setSpeed(400);
      } else if ( Math.floor(score / 50) === 2 ){
        setSpeed(300);
      } else if ( Math.floor(score / 50) === 3 ){
        setSpeed(200);
      } else if ( Math.floor(score / 50) === 4 ){
        setSpeed(100);
      }

      genereteFood();
      spliceIndex = 0;
    }

    setSnake(newSnake.slice(spliceIndex));
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
  }

  function Cell({type}: any) {
    let result = <div className="row__cell"></div>
  
    if(type === "snake"){
      result = <div className="row__cell row__cell-snake"></div>
    }
  
    if(type === "food"){
      const randomNumb = Math.floor(Math.random() * 10);
  
      if( 0 <= randomNumb ){
        if( randomNumb <= 5 ){
          result = <div className="row__cell row__cell-food1">1</div> 
          setFoodWeight(1);
        }
      }
  
      if( 6 <= randomNumb ){
        if( randomNumb <= 8 ){
          result = <div className="row__cell row__cell-food2">5</div>
          setFoodWeight(5);
        }
      }
  
      if( 9 <= randomNumb ){
        if( randomNumb <= 10 ){
          result = <div className="row__cell row__cell-food3">10</div>
          setFoodWeight(10); 
        }
      }
    }
  
    return result;
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
      </div>
      <div className='score'>
        <div className='score__item'>
          <div>name</div>
          <div>score</div>
        </div>
      </div>
    </div>
  )
};

