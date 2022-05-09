import { combineReducers } from "redux";
import personReduser from "./person.reduser";
const rootReduser = combineReducers({
  personReduser,
})

export default rootReduser;