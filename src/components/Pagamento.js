// import { GMap } from 'primereact/gmap'
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../css/ToastDemo.css';
import '../css/DataTableDemo.css';

const Pagamento = () => {
    const [compras, setCompra] = useState([]);
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Pagamento aceito!', detail:'Seu pagamento foi aceito e será encaminhado em alguns minutos.', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    useEffect(() => {
        const getCompras = async () => {
            const ComprasFromServer = await fetchCompras()
            setCompra(ComprasFromServer)
        } 
        
        getCompras()
    }, []);

    /* O backend ainda não está implementado nessa parte
    os dados retornos são apenas um esboço */
    const fetchCompras = async () => {
        const res = await fetch('http://localhost:5000/compras')
        const data = await res.json()

        return data
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const priceTotalBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price * rowData.quantity);
    }

    const priceTotal = () => {
        let totalPrice = 0
        compras.forEach(({quantity, price}) => {
            totalPrice += quantity * price
        })
        return formatCurrency(totalPrice)
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge`}>{rowData.quantity}</span>;
    }

    const header = (
        <div className="table-header">
            Lista de Compras
        </div>
    );
    const footer = `Total: ${priceTotal()}`;

    const checkInput = (e) => {
        const liCheckElements = document.getElementsByTagName("li")
        for (let i = 0; i < liCheckElements.lenght; i++){
            if (liCheckElements[i] === e.target){
                liCheckElements[i].checked = true
            }
            else {
                liCheckElements[i].checked = false
                liCheckElements[i].disabled = true
            }
                
        }
        console.log(liCheckElements, e.target.checked)
    }
    return (
        <nav className="nav-pagamento">
            <Toast ref={toast} />
            <header className="header-pagamento">Forma de Pagamento</header>
            <div className="container-pagamento">
                <div className="lista-compras">
                    <div className="datatable-templating-demo">
                        <div className="card">
                            <DataTable value={compras} header={header} footer={footer}>
                                <Column field="name" header="Item"></Column>
                                <Column header="Produto" body={imageBodyTemplate}></Column>
                                <Column field="category" header="Categoria"></Column>
                                <Column field="price" header="Preço por Unidade" body={priceBodyTemplate}></Column>
                                <Column header="Quantidade" body={statusBodyTemplate}></Column>
                                <Column field="price" header="Preço Total" body={priceTotalBodyTemplate}></Column>
                            </DataTable>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-paymentMethods">
                <div className="adress">
                    <label>Endereço de entrega</label>
                </div>
                <div className="paymentMethods">
                    <label>Método de Pagamento</label>
                    <small>Selecione uma das opções abaixo: </small>
                    <ul style={{marginTop: "15px"}}>
                        <li style={{margin: "10px", paddingBottom: "5px", borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}><input type="checkbox" onChange={checkInput} style={{marginRight: "10px"}}></input>Cartão de Crédito</li>
                        <li style={{margin: "10px", paddingBottom: "5px", borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}><input type="checkbox" style={{marginRight: "10px"}}></input>Apple Pay</li>
                        <li style={{margin: "10px", paddingBottom: "5px", borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}><input type="checkbox" style={{marginRight: "10px"}}></input>Dinheiro</li>
                    </ul>
                </div>
                <div className="promotionalCode">
                    <label>Cupons Disponíveis</label>
                </div>
            </div>
            <footer className="footer-pagamento">
                <Button label="Voltar" className="p-button-danger" onClick={() => window.location.href = "/main"}/>
                <Button label="Finalizar Pagamento" className="p-button-success" onClick={showSuccess} />
            </footer>
        </nav>
    )
}

export default Pagamento
