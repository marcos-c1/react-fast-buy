import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'

const Main = ({ onAdd }) => {
    const [value, setValue] = useState('')

    // const redefineBack = () => {
    //     let body = document.querySelector("body")
    //     body.setAttribute("style", "background-image: none;")
    //   }
    
    const onClick = (e) => {
	    window.location.href = "https://github.com/marcos-c1"
	}
    return (
    <nav>
        <div className="container-menu">
            <i className="pi pi-bars p-toolbar-separator p-mr-2" style={{marginLeft: "30px"}}/>
            <span className="p-input-icon-left" style={{display: "inline-block"}}></span>
            <ul className="menu-content">
                <li>Início</li>
                <li>Promoções</li>
                <li>Mercado</li>
                <li style={{marginRight: "300px"}}>Contato</li>
            </ul>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="Pesquise.." />
            </span>
            <div className="social-media-menu"> 
			    <i className='pi pi-facebook' style={{ display: "inline-block", paddingLeft: "10px"}}></i>
				<i onClick={onClick} className='pi pi-github' style={{ display: "inline-block", paddingLeft: "10px"}}></i>
				<i className='pi pi-twitter' style={{ display: "inline-block", paddingLeft: "10px"}}></i>
			</div>
        </div>
        
        <div className="container-slider">
            <div style={{ textAlign:"center", paddingTop: "240px"}}>
                <span className="dot" ></span>
                <span className="dot" ></span>
                <span className="dot"></span>
            </div>
        </div>
        <main>
            <div className="container-mercado">
                <div className="container-mercado2"></div>
            </div>
        </main>
        <footer>
            <div className="container-footer">
                <p style={{textAlign: "center", marginTop: "10px"}}>Copyright &copy; 2021</p>
                <p style={{textAlign: "center"}}>Todos os direitos reservados. </p>
            </div>
        </footer>
    </nav>
    )
}

export default Main
