import { useState } from 'react'
import '../css/App.css'

const AddUser = ({ onAdd }) => {
	const [login, setLogin] = useState('')
	const [senha, setSenha] = useState('')
	const [remember, setRemember] = useState(false)

	

	const onSubmit = (e) => {
		e.preventDefault()

		if (!login){
			alert("Insira o login!")
		}
		else if (!senha){
			alert("Insira a senha!")
		}
		
		else {	
			onAdd({ login, senha, remember })
			setLogin('')
    		setSenha('')
    		setRemember(false)
			window.location.href = "/main"
		}
	}
	return (
		<form className="add-form" onSubmit={onSubmit}>
			<div className="form-control">
				<label>Login</label>
				<input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}></input>
			</div>
			<div className="form-control">
				<label>Senha</label>
				<input type="text" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
			</div>
			<div className="form-check">
				<label>Lembrar-me</label>
				<input type="checkbox" className="checkbox" value={remember} onChange={(e) => setRemember(e.currentTarget.checked)}></input>
			</div>

			<input type="submit" value="Entrar" action="Main.js" className="btn btn-block"></input>

		</form>
	)
}

export default AddUser