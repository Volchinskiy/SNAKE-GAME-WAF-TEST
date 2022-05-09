import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

interface initStateI{
  name: string;
  id: null | number;
  login: boolean;
  scores: Array<object>
} 

const initState: initStateI = {
  name: "",
  id: null,
  login: false,
  scores: []
}

export const login = (data: any) => {
 return {
   type: "LOGIN",
   payload: data
 }
};

export const setScoreAction = (data: Array<object>): any => {
 return {
   type: "SET SCORE",
   payload: data
 }
};

const reducer = (state: any = initState, action: any) => {
  switch(action.type){
    case "LOGIN":
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        login: action.payload.login
      }

    case "SET SCORE":
      return {
        ...state,
        scores: action.payload
      }

    default: 
      return state
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;