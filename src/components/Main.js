import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import slider1 from '../imgs/img1.jpg'
import slider2 from '../imgs/img2.png'
import slider3 from '../imgs/slider.jpg'
import doces from '../imgs/doces.png'
import bebidas from '../imgs/bebidas.png'
import carnes from '../imgs/carne.png'
import massas from '../imgs/massas.png'

const Main = ({ onAdd }) => {
    const [value, setValue] = useState('')

    const onClick = (e) => {
	    window.location.href = "https://github.com/marcos-c1"
	}

    const searchEvent = (e) => {
        const searchBar = document.getElementsByClassName("p-inputtext")

        setValue(e.target.value)

        if(value){
            searchBar.search.style.outline = "0 none"
            searchBar.search.style.boxShadow = "0 0 0 0.2rem #a6d5fa"
            searchBar.search.style.borderColor = "#2196F3"
        }
    }

    const searchBarEvent = (e) => {
        const searchBar = document.getElementsByClassName("p-inputtext")
        const placeHolder = document.getElementById("search")

        if(value){
            const id = Math.ceil( 10000 * Math.random() + 1)
            onAdd({ id, value })
            // Posso colocar o id no param
            window.location.href = `/search/${value}`
        }

        else {
            placeHolder.placeholder = "Insira na barra de pesquisa"
            searchBar.search.style.outline = "0 none"
            searchBar.search.style.boxShadow = "0 0 0 0.2rem #f5043c"
            searchBar.search.style.borderColor = "#f1f1f1"
        }
    }

        
    
    const showSlides = (e) => {
        const containerSlider = document.getElementsByClassName("container-slider")
        const dots = document.getElementsByClassName("dot")
        const prev = document.getElementsByClassName("prev")
        const next = document.getElementsByClassName("next")
        const slides = document.getElementsByClassName("mySlides")
        let index = 0;

        if (e.target.id == "dotOne"){
            index = 0;
            prev[0].style.color = "white"
            next[0].style.color = "white"
            containerSlider[0].style.backgroundImage = `url(${slider1})`
        } else if (e.target.id == "dotTwo"){
            index = 1;
            prev[0].style.color = "black"
            next[0].style.color = "black"
            containerSlider[0].style.backgroundImage = `url(${slider2})`
        } else {
            index = 2;
            prev[0].style.color = "white"
            next[0].style.color = "white"
            containerSlider[0].style.backgroundImage = `url(${slider3})`
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (let i = 0; i < dots.length; i++){
            if (dots[index].id == e.target.id){
                slides[index].style.display = "block"
            }
            else {
                slides[i].style.display = "none"
            }
        }
    }

    const inicioEvent = (e) => {
        const inicio = document.getElementsByTagName("li")
        inicio[0].style.paddingBottom = "50px"
        inicio[0].style.borderBottom = "4px solid rgba(235, 117, 117, 0.4)"

        for(let i = 1; i < inicio.length; i++){
            inicio[i].style.paddingBottom = "50px"
            inicio[i].style.borderBottom = "none"
            inicio[i].style.borderWidth = "none"
        }
    }
    
    const promoEvent = (e) => {
        const inicio = document.getElementsByTagName("li")
        inicio[1].style.paddingBottom = "50px"
        inicio[1].style.borderBottom = "4px solid rgba(235, 117, 117, 0.4)"

        for(let i = 0; i < inicio.length; i++){
            if (i !== 1){
                inicio[i].style.paddingBottom = "50px"
                inicio[i].style.borderBottom = "none"
                inicio[i].style.borderWidth = "none"
            }
        }
    }

    const mercadoEvent = (e) => {
        const inicio = document.getElementsByTagName("li")
        inicio[2].style.paddingBottom = "50px"
        inicio[2].style.borderBottom = "4px solid rgba(235, 117, 117, 0.4)"

        for(let i = 0; i < inicio.length; i++){
            if (i !== 2){
                inicio[i].style.paddingBottom = "50px"
                inicio[i].style.borderBottom = "none"
                inicio[i].style.borderWidth = "none"
            }
        }
    }

    const contatoEvent = (e) => {
        const inicio = document.getElementsByTagName("li")
        inicio[3].style.paddingBottom = "48px"
        inicio[3].style.borderBottom = "4px solid rgba(235, 117, 117, 0.4)"

        for(let i = 0; i < inicio.length; i++){
            if (i !== 3){
                inicio[i].style.paddingBottom = "50px"
                inicio[i].style.borderBottom = "none"
                inicio[i].style.borderWidth = "none"
            }
        }
    }

    const displaySlide1 = () => {
        setTimeout(() => {
            const containerSlider = document.getElementsByClassName("container-slider")
            const slides = document.getElementsByClassName("mySlides")

            containerSlider[0].style.backgroundImage = `url(${slider1})`
            slides[0].style.display = "block"
        }, 200)
        // slide1[0].style.display = "block"
    }

    const docesEvent = () => {
        window.location.href = "/doces"
    }

    const bebidasEvent = () => {
        window.location.href = "/bebidas"
    }

    const carnesEvent = () => {
        window.location.href = "/carnes"
    }

    const massasEvent = () => {
        window.location.href = "/massas"
    }
    return (
    <nav onLoad={displaySlide1()}>
        <div className="container-menu">
            <i className="pi pi-bars p-toolbar-separator p-mr-2 menu-bar"/>
            <i className="pi pi-shopping-cart"></i>
            <label className="logoName" style={{cursor: "pointer"}}>Fast Buy</label>
            <span className="p-input-icon-left" style={{display: "inline-block"}}></span>
            <ul className="menu-content">
                <li onClick={inicioEvent}>Início</li>
                <li onClick={promoEvent}>Promoções</li>
                <li onClick={mercadoEvent}>Mercado</li>
                <li onClick={contatoEvent}>Contato</li>
            </ul>
            <span className="p-input-icon-left search-bar" style={{marginRight: "20px"}}>
                <i className="pi pi-search" />
                <InputText id="search" value={value} onChange={searchEvent} placeholder="Pesquise.." />
                <i className="pi pi-send" style={{marginLeft: "230px", display: "inline-flex"}} onClick={searchBarEvent}/>
            </span>
            <div className="social-media-menu"> 
			    <i className='pi pi-facebook' style={{ display: "inline-block", paddingLeft: "10px"}}></i>
				<i onClick={onClick} className='pi pi-github' style={{ display: "inline-block", paddingLeft: "10px"}}></i>
				<i className='pi pi-twitter' style={{ display: "inline-block", paddingLeft: "10px"}}></i>
			</div>
        </div>
        
        <div className="container-slider">
            <div className="mySlides fade">
                <div className="numbertext">1 / 3</div>
                <div className="text">Frutas naturais fresquinhas</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">2 / 3</div>
                <div className="text">Ofertas incríveis na Zest</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">3 / 3</div>
                <div className="text">Promoção imperdível</div>
            </div>
            <a className="prev" onClick={showSlides}>&#10094;</a>
            <a className="next" onClick={showSlides}>&#10095;</a>
            <div className="div-dots">
                <span className="dot" id="dotOne" onClick={showSlides}></span>
                <span className="dot" id="dotTwo"onClick={showSlides}></span>
                <span className="dot" id="dotThree" onClick={showSlides}></span>
            </div>
        </div>
        <nav className="scroll-menu">
            <ul className="scrollMenu-content">
                <div className="container-imgs">
                    <div className="div-imgs" onClick={docesEvent}>
                        <img alt="Doces" src={doces}></img>
                        <li>Doces</li>
                    </div>
                    <div className="div-imgs" onClick={bebidasEvent}>
                        <img alt="Bebidas" src={bebidas}></img>
                        <li>Bebidas</li>
                    </div>
                    <div className="div-imgs" onClick={carnesEvent}>
                        <img alt="Carnes" src={carnes}></img>
                        <li>Carnes</li>
                    </div>
                    <div className="div-imgs" onClick={massasEvent}>
                        <img alt="Massas" src={massas}></img>
                        <li>Massas</li>
                    </div>
                </div>
            </ul>
        </nav>
        <main className="container-mercado" style={{paddingTop:"40px", paddingBottom: "40px"}}>
            <div className="container-mercado1">
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
