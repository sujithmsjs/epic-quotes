import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteDept, deleteRole, getAllDepts, getAllRoles, saveRole, updateRole } from '../../../util/apis';
import { convertFromStringToDate } from '../../../util/utility';
import { MySwitch } from '../../../my-ui/MySwitch';
import { ConfirmDialog } from '../ConfirmDialog';
import { useConfirmDialog } from '../../../context/ConfirmDialogContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from "@hookform/devtools";
import { AddRole } from './AddRole';

const schema = z.object({
    id: z.coerce.number(),
    name: z.string().min(2).max(16),
    description: z.string(),
    reportingTo: z.coerce.number(),
    level: z.coerce.number(),
    active: z.boolean()

});

export const Modelv5 = () => {

    const { showConfirmDialog } = useConfirmDialog();

    const [roles, setRoles] = useState([]);
    const [showRole, setShowRole] = useState(false);
    const [showRoleType, setShowRoleType] = useState(false);

    useEffect(() => {
        setAllRoles();
    }, [])


    const form = useForm({
        resolver: zodResolver(schema)
    });

    const { register, control, handleSubmit, setError, formState, reset } = form;
    const { errors, isDirty, isValid } = formState;

    const onSubmit = async (data, type) => {
        console.info({ data, type });

       

        if (type === 'add') {
            if (await saveRole(data)) {
                toast.success('Role created successfully!!!')
                setShowRole(false);
                refreshRoles();
                reset({});
            } else {
                //reset(data);
                toast.error('Error while creating Role!');
                setError('name', {
                    type: "manual",
                    message: "Sorry! Role name already taken",
                })
            }

        } else {
            if (await updateRole(data)) {
                toast.success('Role updated successfully!!!')
                setShowRole(false);
                refreshRoles();
                reset({});
            } else {
                //reset(data);
                toast.error('Error while updating Role!');
                setError('name', {
                    type: "manual",
                    message: "Sorry! Role name already taken",
                })
            }
        }


    };

    const setAllRoles = async () => {
        const roles = await getAllRoles();
        console.info(roles);
        setRoles(roles);
    }

    const refreshRoles = async () => {
        await setAllRoles();
    }

    const handleOnDeleteRole = async (deptId) => {
        const result = await showConfirmDialog('Delete Role', `Do you want to role ${deptId}?`);
        console.log('User clicked:', result); // true if confirmed, false if canceled
        if (result) {
            const flag = await deleteRole(deptId);
            if (flag) {
                toast.info(`${deptId} role deleted successfully!`);
                refreshRoles();
            }
        }
    }

    const handleEditRole = (body) => {
        console.info('Prompted for edit : ' + JSON.stringify(body));
        reset(body)
        setShowRoleType('edit');
        setShowRole(true);
    }

    const handleCreateRole = () => {
        reset({});
        setShowRoleType('add');
        setShowRole(true);
    }

    const hideRoleDialog = () => {
        reset({});
        setShowRole(false);
    }

    return (
        <div className='container-md'>

            <h1>Model v5</h1>
            <p>{isDirty + ''}</p>
            <Button variant="primary" onClick={handleCreateRole}>
                Add Role
            </Button>
            <DevTool control={control} />
            <AddRole
                onSubmit={handleSubmit((e) => onSubmit(e, showRoleType))}
                show={showRole}
                register={register}
                errors={errors}
                type={showRoleType}
                onHide={hideRoleDialog}
            />
            <RolesTable
                roles={roles}
                onDelete={handleOnDeleteRole}
                onEdit={handleEditRole}
            />

        </div>
    )
}


const RolesTable = ({ roles = [], onDelete, onEdit }) => {
    return (
        <>
            <h2>Roles</h2>
            <table class="table table-hover">
                <thead className='table-warning'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Role</th>
                        <th scope="col">Level</th>
                        <th scope="col">Reporting</th>
                        <th scope="col">Active</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map(role => <tr key={role.id}>
                            <th scope="row">{role.id}</th>
                            <td>{role.name}</td>
                            <td>{role.level}</td>
                            <td>{+role.reportingTo}</td>
                            <td>{role.active.toString()}</td>
                            <td>
                                <button className='btn btn-sm btn-info' onClick={() => onEdit(role)} >Edit</button>
                                <button className='btn btn-sm mx-2 btn-warning' onClick={() => onDelete(role.id)} >Del</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    )
}