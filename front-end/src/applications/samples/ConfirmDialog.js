

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MyFloatingInput from '../../my-ui/MyFloatingInput';
import { MySwitch } from '../../my-ui/MySwitch';
import { toast } from 'react-toastify';
import axios from 'axios';


export const ConfirmDialog = ({ show, onHide, title, message, onConfirm }) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="danger" onClick={onHide}>Cancle</Button>
                <Button onClick={onConfirm}>Okay</Button>
            </Modal.Footer>
        </Modal>
    )
}
