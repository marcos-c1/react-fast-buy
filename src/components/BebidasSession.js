import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import '../css/DataScrollerDemo.css';

const BebidasSession = ({ onAdd }) => {
    const [bebidas, setBebidas] = useState([]);
    const ds = useRef(null);
    const [carrinho, setCarrinho] = useState([])
    const [qtdProduto, setQtd] = useState(1)

    useEffect(() => {

        const getBebidas = async () => {
            const BebidasFromServer = await fetchBebidas()
            setBebidas(BebidasFromServer)
        } 
        
        getBebidas()
    }, []); 

    //console.log(...bebidas)

    const fetchBebidas = async () => {
        const res = await fetch('http://localhost:5000/bebidas')
        const data = await res.json()

        return data
    }

    const itemTemplate = (data) => {

        const computeCart = async (e) => {
            const productItem = e.target.parentElement.parentElement.parentElement
            let productName = productItem.children[0].alt

            //console.log(productDescription)
            if (productName === undefined){
                //console.log(productItem.children[0].children[1].children[0].outerText)
                productName = productItem.children[0].children[1].children[0].outerText
            }
    
            setQtd(qtdProduto + 1)
            setCarrinho({product: productName, qtd: qtdProduto})
            onAdd({ carrinho })

            window.location.href = "/pagamento"
        }

        return (
            <div className="product-item">
                <img src={`showcase/demo/images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                <div className="product-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.description}</div>
                    <Rating value={data.rating} readOnly cancel={false}></Rating>
                    <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                </div>
                <div className="product-action">
                    <span className="product-price">${data.price}</span>
                    <Button icon="pi pi-shopping-cart" label="Adicione ao carrinho" onClick={computeCart} disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                </div>
            </div>
        );
    }
    
    const footer = <Button type="text" icon="pi pi-plus" label="Carregar" onClick={() => ds.load()} />;

    return (
        <nav>
            <div className="datascroller-demo">
                <div className="card">
                    <DataScroller ref={ds} value={bebidas} itemTemplate={itemTemplate} rows={5}
                    loader footer={footer} header="Clique em Carregar para mostrar todos os items" />
                </div>
            </div>
        </nav>
    )
}

export default BebidasSession
