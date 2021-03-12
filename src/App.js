import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useState } from 'react'
import './css/App.css';
import Header from './components/Header'
import AddUser from './components/AddUser'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import Main from './components/Main'
import CreateAccount from './components/CreateAccount'


function App() {
  const [logins, setLogins] = useState([])
  const [contas, setConta] = useState([])

  const AddLogin = async (login) => {
    const id = Math.ceil( 10000 * Math.random() + 1)
    const newLogin = {id, login}
    setLogins([ ...logins, newLogin])
    console.log(...logins)
  }

  const AddUsers = (login) => {
    const id = Math.ceil( 10000 * Math.random() + 1)
    const newConta = {id, ...login}
    setConta([...contas, newConta])
    console.log(...contas)
  }

  

  return (
    <Router>
      <Route path="/" exact render={() => (
          <div className="container">
            <Header />
            <AddUser onAdd={AddLogin}/>
            <CreateUser />
          </div>
      )} />
      <Route path="/main" component={Main}/>
      <Route path="/esqueceu" component={Login} />
      <Route path="/criar" exact render={() => (
        <>
          <CreateAccount onAdd={AddUsers}/>
        </>
      )} />
    </Router>
  );
}

export default App;
