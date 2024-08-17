// ConfirmDialogContext.js

import React, { createContext, useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
    }
    return context;
};

export const ConfirmDialogProvider = ({ children }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({});

    const showConfirmDialog = (title, message) => {
        
        setDialogConfig({ title, message });
        setShowDialog(true);


        return new Promise((resolve) => {
            setDialogConfig((prevConfig) => ({
                ...prevConfig,
                onConfirm: (result) => {
                    setShowDialog(false);
                    resolve(result);
                },
            }));
        });
    };

    const handleCancel = () => {
        dialogConfig.onConfirm(false)
    }

    return (
        <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
            {children}
            <Modal
                show={showDialog}
                onHide={handleCancel}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{dialogConfig.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dialogConfig.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleCancel} >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => dialogConfig.onConfirm(true)}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </ConfirmDialogContext.Provider>
    );
};
