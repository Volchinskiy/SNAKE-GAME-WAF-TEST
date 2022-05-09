interface state {
  name: string;
  id: number | null;
  login: boolean;
}

const initialState: state = {
  name: "",
  id: null,
  login: false,
}

export default function questionReduser(state = initialState, action: any){
  switch(action.type) {
    case "LOGIN" : {
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        login: action.payload.login,
      }
    }

    default: {
      return state;
    }
  }
}