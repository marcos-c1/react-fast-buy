// import { GMap } from 'primereact/gmap'
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import applePay from '../imgs/apple-pay.png';
import '../css/ToastDemo.css';
import '../css/DataTableDemo.css';
import cupom from '../imgs/cupom.png';

const Pagamento = () => {
    const [compras, setCompra] = useState([]);
    const [pagamento, setPagamento] = useState(false);
    const [cep, setCEP] = useState('');
    const toast = useRef(null);

    const showSuccess = (e) => {
        e.preventDefault()
        toast.current.show({severity:'success', summary: 'Pagamento aceito!', detail:'Seu pagamento foi aceito e será encaminhado em alguns minutos.', life: 3000});
        setTimeout(() => {
            window.location.href = "/main"
        }, 2500)
        
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    useEffect(() => {
        const getCompras = async () => {
            const ComprasFromServer = await fetchCompras();
            setCompra(ComprasFromServer);
        } 
        
        getCompras();
    }, []);

    /* O backend ainda não está implementado nessa parte
    os dados retornos são apenas um esboço */
    const fetchCompras = async () => {
        const res = await fetch('http://localhost:5000/compras');
        const data = await res.json();

        return data;
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
            totalPrice += quantity * price;
        })
        return formatCurrency(totalPrice);
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge`}>{rowData.quantity}</span>;
    }

    const header = (
        <div className="table-header" >
            Lista de Compras
        </div>
    );
    const footer = `Total: ${priceTotal()}`;

    const checkInput = (e) => {
        const optionOne = document.getElementById("buttonOne");
        const optionTwo = document.getElementById("buttonTwo");
        const optionThree = document.getElementById("buttonThree");

        if (optionOne === e.target)
            { optionTwo.checked = false; optionThree.checked = false }
        else if (optionTwo === e.target)
            { optionOne.checked = false; optionThree.checked = false }
        else
            { optionOne.checked = false; optionTwo.checked = false }
        
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
            <form onSubmit={showSuccess}>
                <div className="container-paymentMethods">
                    <div className="adress">
                        <label>Endereço de entrega</label>
                        <p style={{textAlign: "center", marginBottom: "10px", fontWeight: "bold", fontSize: "18px"}}>Dados Pessoais</p>
                        <ul style={{marginLeft: "60px"}}>
                            <li style={{paddingBottom: "10px"}}>Username</li>
                            <li style={{paddingBottom: "20px"}}>CEP:<input type="text" style={{marginLeft: "10px", borderRadius: "3px", borderWidth: "1px", height: "25px"}}onChange={(e) => setCEP(e.target.value)}></input><i className="pi pi-send" style={{display: "inline-flex", marginLeft: "10px", marginTop: "10px"}} /></li>
                            <li style={{paddingBottom: "20px"}}><small>Quando o usuário inserir o CEP vai aparecer uma tela abaixo com a localização da sua quadra e rua a partir da API do Correios</small></li>
                        </ul>
                    </div>
                    <div className="paymentMethods">
                        <label>Método de Pagamento</label>
                        <small>Selecione uma das opções abaixo: </small>
                        <ul style={{marginTop: "15px"}}>
                            <li style={{margin: "10px", paddingBottom: "5px", borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}>
                                <input type="checkbox" id="buttonOne" onChange={checkInput} style={{marginRight: "10px"}}></input>
                                Cartão de Crédito 
                                <img alt="Visa & MasterCard" title="Visa & MasterCard" src="http://www.credit-card-logos.com/images/multiple_credit-card-logos-2/credit_card_logos_28.gif" style={{width: "100px", height: "30px", marginLeft: "20px"}} border="0" />
                                </li>
                            <li style={{margin: "10px", paddingBottom: "5px", borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}><input type="checkbox" id="buttonTwo" onChange={checkInput} style={{marginRight: "10px"}}></input>
                            Apple Pay 
                            <img alt="Apple Pay" title="Apple Pay" style={{width: "70px", height: "30px", marginLeft: "20px"}} src={applePay} />
                            </li>
                            <li style={{margin: "10px", paddingBottom: "5px", borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}><input type="checkbox" id="buttonThree" onChange={checkInput} style={{marginRight: "10px"}}></input>
                            Dinheiro
                            <i className="pi pi-money-bill" style={{fontSize: "20px", marginLeft: "20px"}}></i>
                            </li>
                        </ul>
                    </div>
                    <div className="promotionalCode">
                        <label>Cupons Disponíveis</label>
                        <img src={cupom} style={{width: "70px", marginLeft: "20px", cursor: "pointer"}}alt="Cupom de Desconto"></img>
                        <h4 style={{display: "inline-block", position: "absolute", marginLeft: "20px", marginTop: "25px"}}>Nenhum cupom disponível</h4>
                    </div>
                </div>
                 <Button label="Finalizar Pagamento" type="submit" style={{marginTop: "20px", marginBottom: "40px"}} className="p-button-success" />
            </form>
            <Button label="Voltar" className="p-button-danger" style={{marginTop: "20px", marginBottom: "40px"}} onClick={() => window.location.href = "/main"}/>
        </nav>
    )
}

export default Pagamento
