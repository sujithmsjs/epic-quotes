

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MyFloatingInput from '../../my-ui/MyFloatingInput';
import { MySwitch } from '../../my-ui/MySwitch';
import { saveDept } from '../../util/apis';




export const AddDept = ({ type = 'add', onSubmit = () => { }, register = () => { }, errors = () => { }, show = true, onHide }) => {

    const title = type === 'add' ? 'Create Department' : 'Edit Department'

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit} >
                <Modal.Body>
                    {
                        type === 'edit' && <MyFloatingInput register={register} label='Id' errors={errors} disabled={true} />
                    }
                    <MyFloatingInput register={register} label='Name' errors={errors} />
                    <MyFloatingInput register={register} label='Location' errors={errors} />
                    <MySwitch register={register} label='Active' name='active' />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary">
                        {
                            type === 'add' ? 'Save' : 'Update'
                        }
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
