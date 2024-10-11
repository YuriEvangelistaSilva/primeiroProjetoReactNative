
import Login from './components/Login';
import React, {useState} from 'react';
import Menutabs from './components/menutabs';

export default function App(){
  const [user, setUser] = useState(null);
 
  // verifica se existe um usuário logado, se não houver chama a
  // tela de login
 if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }
  return<Menutabs/>
}