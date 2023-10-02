import React, {useState, useEffect} from 'react'
import {Loader} from "semantic-ui-react";
import {HeaderPage, TableTablesAdmin, AddEditTableForm} from "../../components/Admin";
import {BasicModal} from "../../components/Common";
import {useTable} from "../../hooks";

export function TablesAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const {loading, tables, getTables, deleteTable} = useTable();
// eslint-disable-next-line
    useEffect(() => {getTables()}, [refetch]);
    
    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addTable = () => {
        setTitleModal("Crear Mesa");
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    };

    const updateTable = (data) => {
        setTitleModal("Actualizar mesa");
        setContentModal(
        <AddEditTableForm 
        onClose={openCloseModal} 
        onRefetch={onRefetch} 
        table={data}
        />);
        openCloseModal();
    };

    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Eliminar mesa ${data.number}?`);
        if(result){
            console.log("Eliminar");
            await deleteTable(data.id);
            onRefetch();
        }
    };

    return (
        <>
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa" btnClick={addTable} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <TableTablesAdmin tables={tables} updateTable={updateTable} deleteTable={onDeleteTable}/>
            )}
            <BasicModal 
            show={showModal} 
            onClose={openCloseModal} 
            title={titleModal} 
            children={contentModal} 
            />
        </>
    );
}
