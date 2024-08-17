import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MyFloatingInput from '../../my-ui/MyFloatingInput';

const schema = z.object({
    name: z.string().min(2).max(16),
    location: z.string().min(4).max(16)
});

function Modelv2() {
    const form = useForm({
        resolver: zodResolver(schema)
    });

    const { register, control, handleSubmit, formState,  reset } = form;
    const { errors, isDirty, isValid } = formState;

    const onSubmit = (data) => {
        console.info('Submitted data: ', data);
        setShow(false);
        reset({
            name : '',
            location : ''
        });
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Department</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <MyFloatingInput register={register} label='Name' errors={errors} />
                        <MyFloatingInput register={register} label='Location' errors={errors} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>


        </>
    );
}

export default Modelv2;