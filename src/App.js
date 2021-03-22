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
import DocesSession from './components/DocesSession'
import bImg from './imgs/back-img.jpeg'


function App() {
  const [logins, setLogins] = useState([])
  const [contas, setConta] = useState([])
  const [searchBar, setSearch] = useState([])

  const AddLogin = async (login) => {
    const id = Math.ceil( 10000 * Math.random() + 1)
    const newLogin = {id, login}
    setLogins([ ...logins, newLogin])
    // console.log(...logins) (o LoadPage evita mostrar no console)
  }

  const AddUsers = (login) => {
    const id = Math.ceil( 10000 * Math.random() + 1)
    const newConta = {id, ...login}
    setConta([...contas, newConta])
    // console.log(...contas) (o LoadPage evita mostrar no console)
  }

  const AddSearch = (id, value) => {
    const newSearch = {id, value}
    setSearch([ ...searchBar, newSearch])
    // console.log(newSearch) (o LoadPage evita mostrar no console)
  }
  
   const redefineBack = () => {
	 	  let body = document.querySelector("body")
		  body.style.background = "rgb(0, 0, 0, 0.1)"
	  }

   const bodyBackImg = () => {
     let body = document.querySelector("body")
     body.style.backgroundImage = `url(${bImg})`
     body.style.backgroundPositionX = "right"
     body.style.backgroundPosition = "center"
   }

  return (
    <Router>
      <Route path="/" exact render={() => (
          <div className="container" onLoad={bodyBackImg()}>
            <Header />
            <AddUser onAdd={AddLogin}/>
            <CreateUser />
          </div>
      )} />
      <Route path="/esqueceu" component={Login} />
      <Route path="/criar" exact render={() => (
        <>
          <CreateAccount onAdd={AddUsers}/>
        </>
      )} />
      <Route path="/main" onLoad={redefineBack()} render={() => (
        <>
        <Main onAdd={AddSearch} />
        </>
      )}/> 
      <Route path="/doces" exact component={DocesSession}/>
    </Router>
  );
}

export default App;
