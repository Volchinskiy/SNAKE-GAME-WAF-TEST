interface state {
  name: string;
  id: number | null;
  login: boolean;
}

export const login = (data: state) => ({
  type: "LOGIN",
  payload: data
})
