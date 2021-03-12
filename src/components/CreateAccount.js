import { useState, useRef } from 'react'
import {Password} from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import PropTypes from 'prop-types'

const CreateAccount = ({ onAdd }) => {
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [bairro, setBairro] = useState('')
    const [celular, setCelular] = useState('')
    const [login, setLogin] = useState('')
	const [senha, setSenha] = useState('')
    
    const toast = useRef(null);

    const accept = () => {
         toast.current.show({ severity: 'info', summary: 'Sucesso', detail: 'Sua conta foi criada!', life: 3000 });
    }

    const onSubmit = async (e) => {
        e.preventDefault()
    
        if (!nome || !endereco || !bairro || !celular || !login ){
            alert("Há campos vazios")
            //console.log(`nome: ${nome}, endereco: ${endereco}, bairro: ${bairro}, cel:${celular}, login: ${login}, senha: ${senha}`)
        }
            
        else {
            console.log(e)
            accept()
            await onAdd({ nome, endereco, bairro, celular, login, senha })
            setNome('')
            setEndereco('')
            setBairro('')
            setLogin('')
            setSenha('')
            setTimeout(() => {
                window.location.href = "/main"
            }, 2500)
        }
        
    }

    return (
        <div>
            <Toast ref={toast} />
            <nav className="container-account">
            <form className="add-form" onSubmit={onSubmit}>
			    <div className="form-control-account">
				    <label>Nome Completo</label>
				    <input type="text" placeholder="" value={nome} onChange={(e) => setNome(e.target.value)}></input>
			    </div>
			    <div className="form-control-account">
				    <label>Endereço</label>
				    <input type="text" placeholder="Quadra e Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)}></input>
			    </div>
                <div className="form-control-account">
				    <label>Bairro</label>
				    <input type="text" placeholder="Ex: Taguatinga Norte" value={bairro} onChange={(e) => setBairro(e.target.value)}></input>
			    </div>
                <div className="form-control-account">
				    <label>Celular</label>
				    <input type="tel" placeholder="+55 (DDD) 9 1234-5678 "  value={celular} onChange={(e) => setCelular(e.target.value)}></input>
			    </div>
                <div className="form-control-account">
				    <label>Login</label>
				    <input type="text" placeholder="" value={login} onChange={(e) => setLogin(e.target.value)}></input>
			    </div>
			    <div className="form-control-account">
				    <label>Senha</label>
                    <Password value={senha} className="p-password-input" onChange={(e) => setSenha(e.target.value)} toggleMask />
                    {<span className="info">Tamanho mínimo de 6 caracteres</span>}
			    </div>
                <input type="submit" value="Criar conta" className="btn btn-block"></input>
            </form>
            <div className="button-demo">
                <div className="card">
                    <Button label="Voltar" onClick={() => window.location.href="/"} className="p-button-raised p-button-danger" style={{display: "block", float:"left"}}/>
                </div>
            </div>
        </nav>
        </div>
    )
}

CreateAccount.propTypes = {
    onAdd: PropTypes.func
}

export default CreateAccount
