import React, {useState, useEffect} from 'react'
import {Loader} from "semantic-ui-react";
import {useParams} from "react-router-dom";
import {forEach, size} from "lodash";
import {HeaderPage, AddOrderForm} from "../../components/Admin";
import {BasicModal} from "../../components/Common";
import {ListOrderAdmin, PaymentDetail} from "../../components/Admin/TableDetails"
import {useOrder, useTable, usePayment} from "../../hooks";
// import { number } from 'yup';

export function TableDetailsAdmin() {
    const [reloadOrders, setReloadOrders] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const {id} = useParams();
    const {loading, orders, getOrdersByTable, addPaymentToOrder} = useOrder();
    const {table, getTable} = useTable();
    const {createPayment, getPaymentByTable} = usePayment();
    // console.log(table);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getOrdersByTable(id, "", "ordering=-status, created_at");
        // eslint-disable-next-line
    }, [id, reloadOrders]);
        // eslint-disable-next-line
    useEffect(() => {getTable(id)}, [id]);

    useEffect(() => {
        (async () =>{
            const response =  await getPaymentByTable(id);
            if(size(response) > 0) setPaymentData(response[0]);
            
        })()// eslint-disable-next-line
    }, [reloadOrders])
    
    

    const onReloadOrders = () => setReloadOrders((prev) => !prev);
    const openCloseModal = () => setShowModal((prev) => !prev); 
    
    const onCreatePayment = async () => {
        const result = window.confirm('¿Estas seguro de generar la cuenta de la mesa?')

        if (result) {
            let totalPayment = 0;
            forEach(orders, (order) => {
                totalPayment += Number(order.product_data.price)
            })
            const resultTypePaymen = window.confirm(
                "¿Pago con Tarjeta pulsa ACEPTAR, con Efectivo pulsa CANCELAR?"
            )
            
            const paymentData = {
                table: id,
                totalPayment: totalPayment.toFixed(2),
                paymentType: resultTypePaymen ? "CARD" : "CASH",
                statusPayment: "PENDING",
            };

            const payment = await createPayment(paymentData);
            for await (const order of orders){
                await addPaymentToOrder(order.id, payment.id)
            }
            onReloadOrders();
        }
    };

    return (
        <div>
            <HeaderPage title={`Mesa ${table?.number || ""}`} 
            btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
            btnClick={openCloseModal}
            btnTitleTwo={!paymentData ? "Generar cuenta" : null}
            btnClickTwo={onCreatePayment}
            />
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>
            )}

                <BasicModal
                    show={showModal}
                    onClose={openCloseModal}
                    title="Generar pedido"
                >
                    {paymentData ? (
                        <PaymentDetail 
                        payment={paymentData} 
                        orders={orders}
                        openCloseModal={openCloseModal}
                        onReloadOrders={onReloadOrders}
                        />
                    ) : (
                        <AddOrderForm 
                            idTable={id} 
                            openCloseModal={openCloseModal} 
                            onReloadOrders={onReloadOrders}
                        />
                    )}
                </BasicModal>

        </div>
    )
}
