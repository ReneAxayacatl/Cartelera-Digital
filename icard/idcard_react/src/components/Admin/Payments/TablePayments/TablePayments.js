import React, {useState} from 'react'
import {Table, Button, Icon} from "semantic-ui-react";
import {map} from "lodash";
import moment from "moment";
import {BasicModal} from "../../../Common";
import {PaymentProductList} from "../../../Admin";
import "./TablePayments.scss";

export function TablePayments(props) {
    const {payments} = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);


    const getIconPaymentName = (key) =>{
        if(key === "CARD") return "credit card outline";
        if(key === "CASH") return "money bill alternate outline";
        return null;
    }

    const opentCloseModal = () => setShowModal((prev) => !prev);
    const showDetails = (payment) =>{
        setTitleModal(`Pedidos de la Mesa ${payment.table_data.number}`);
        setContentModal(<PaymentProductList payment={payment} />);
        opentCloseModal();
    }

    return (
        <>
        <Table className='table-payments-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.Cell>ID</Table.Cell>
                    <Table.Cell>Mesa</Table.Cell>
                    <Table.Cell>Total</Table.Cell>
                    <Table.Cell>Tipo de pago</Table.Cell>
                    <Table.Cell>Fecha</Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(payments, (payment, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{payment.id}</Table.Cell>
                        <Table.Cell>{payment.table_data.number}</Table.Cell>
                        <Table.Cell>$ {payment.totalPayment}</Table.Cell>
                        <Table.Cell>
                            <Icon name={getIconPaymentName(payment.paymentType)} />
                        </Table.Cell>
                        <Table.Cell>
                            {moment(payment.created_at).format("DD/MM/YYYY - HH:mm")}
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            <Button icon onClick={() => showDetails(payment)}>
                                <Icon name='eye' />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>

        <BasicModal 
            show={showModal}
            onClose={opentCloseModal}
            title={titleModal}
            children={contentModal}
        />
        </>
    )
}
