

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MyFloatingInput from '../../../my-ui/MyFloatingInput';
import { MySwitch } from '../../../my-ui/MySwitch';
import { toast } from 'react-toastify';
import axios from 'axios';
import { saveRole } from '../../../util/apis';






export const AddRole = ({ role, type = 'add', onSubmit, onCreate = () => { }, show = true, onHide, register, errors }) => {

    const title = type === 'add' ? 'Create Role' : 'Update Role';
    const value = { ...register }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>

                    <input type='hidden' {...register('id')} />
                    {/* <MyFloatingInput register={register} label='Id' type='hidden' errors={errors} />  */}

                    <MyFloatingInput register={register} label='Name' errors={errors} />

                    <FloatingLabel className='mb-3' controlId="floatingTextarea2" label="Description">
                        <Form.Control
                            {...register('description')}
                            as="textarea"
                            rows={3}
                            style={{ height: '120px' }}
                            placeholder="Leave a comment here"
                        />
                    </FloatingLabel>


                    <MyFloatingInput register={register} type='number' label='Reporting To' errors={errors} />
                    <MyFloatingInput register={register} type='number' label='Level' errors={errors} />

                    <MySwitch register={register} label='Active' name='active' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary">
                        {type === 'add' ? 'Create Role' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
