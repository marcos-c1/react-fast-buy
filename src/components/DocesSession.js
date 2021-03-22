import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import ProductService from '../service/ProductService.js';
import '../css/DataScrollerDemo.css';

const DocesSession = () => {
    const [products, setProducts] = useState([]);
    const ds = useRef(null);
    const productService = new ProductService();

    useEffect(() => {

        const getDoces = async () => {
            const DocesFromServer = await fetchDoces()
            setProducts(DocesFromServer)
        } 
        
        getDoces()
        // this.productService.getProducts().then(data => this.setState({ products: data }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    console.log(products)

    const fetchDoces = async () => {
        const res = await fetch('http://localhost:5000/data')
        const data = await res.json()

        return data
    }

    const itemTemplate = (data) => {
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
                    <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                </div>
            </div>
        );
    }
    
    const footer = <Button type="text" icon="pi pi-plus" label="Load" onClick={() => ds.load()} />;

    return (
        <nav>
            <div className="datascroller-demo">
                <div className="card">
                    <DataScroller ref={ds} value={products} itemTemplate={itemTemplate} rows={5}
                    loader footer={footer} header="Click Load Button at Footer to Load More" />
                </div>
            </div>
        </nav>
    )
}

export default DocesSession
