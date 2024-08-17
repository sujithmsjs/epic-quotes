

import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import MyFloatingInput from '../../my-ui/MyFloatingInput';

export default function OffcanvasDemo1() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Toggle static offcanvas
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement='end' backdrop="static" className="custom-offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        Array.from({length : 10}, (_,i)=> i + 1).map(e => <MyFloatingInput label='hello ' />)
                    }
                    
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
