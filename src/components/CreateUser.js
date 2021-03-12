import { Link } from 'react-router-dom'

const CreateUser = () => {

	const onClick = (e) => {
		window.location.href = "https://github.com/marcos-c1"
	}

	return (
		<footer>
			<div className="link-block">
				<Link to="/esqueceu">Esqueceu a senha?</Link>
			</div>
			<div className="link-block">
				<Link to="/criar">Criar conta</Link>
			</div>
			<div className="social-media"> 
				<i className='pi pi-facebook' style={{ display: "inline-block", paddingLeft: "5px"}}></i>
				<i onClick={onClick} className='pi pi-github' style={{ display: "inline-block", paddingLeft: "5px"}}></i>
				<i className='pi pi-twitter' style={{ display: "inline-block", paddingLeft: "5px"}}></i>
			</div>
		</footer>
	)
}

export default CreateUser