import React from 'react'
import personService from '../services/Person.servise';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "./../redux/actions/person.action";


export default function RegisterLogin() {
  const [showRegister, setShowRegister] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onLogin = async () => {
    await personService.login(name, password)
     .then((object) => {
        if(object.data.login){
          dispatch(login(object.data))
          navigate("/game");
        } 
      })
  }

  const onRegister = async () => {
    await personService.register(name, password)
      .then((object) => {
        if(object.data.login){
          dispatch(login(object.data))
          navigate("/game");
        } 
      })
  }

  const onSetName = (event: any) => {
    setName(event.target.value);
  }
  
  const onSetPassword = (event: any) => {
    setPassword(event.target.value);
  }
  
  const onShowRegister = () => {
    setName("");
    setPassword("");
    setShowRegister(!showRegister);
  }

  if(showRegister){
    return (
      <div className='register'>
        <div className='register__title' >let's register</div>
        <div className='register__input-wrapper'>
          <input value={name} onChange={onSetName} className='register__name' type="text" placeholder="name" />
          <input value={password} onChange={onSetPassword} className='register__password' type="text" placeholder="password" />
          <div className='register__button-wrapper'>
            <button onClick={onShowRegister}>login?</button>
            <button onClick={onRegister}>register</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='register'>
      <div className='register__title' >let's login</div>
      <div className='register__input-wrapper'>
        <input value={name} onChange={onSetName} className='register__name' type="text" placeholder="name" />
        <input value={password} onChange={onSetPassword} className='register__password' type="text" placeholder="password" />
        <div className='register__button-wrapper'>
          <button onClick={onShowRegister}>register?</button>
          <button onClick={onLogin}>login</button>
        </div>
      </div>
    </div>
  )
}
