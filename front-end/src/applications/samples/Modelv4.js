import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AddDept } from './AddDept'
import { AddRole } from './AddRole';
import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteDept, deleteRole, getAllDepts, getAllRoles, getDeptById, saveDept } from '../../util/apis';
import { convertFromStringToDate } from '../../util/utility';
import { MySwitch } from '../../my-ui/MySwitch';
import { ConfirmDialog } from './ConfirmDialog';
import { useConfirmDialog } from '../../context/ConfirmDialogContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
    id: z.coerce.number(),
    name: z.string().min(2).max(16),
    location: z.string().min(4).max(16),
    active: z.boolean() 
});

const initDept = {
    name: '',
    location: '',
    active: false
}

export const Modelv4 = () => {
    const { showConfirmDialog } = useConfirmDialog();
    const [depts, setDepts] = useState([]);
    const [showDept, setShowDept] = useState(false);
    const [showDeptTable, setShowDeptTable] = useState(true);
  
    const form = useForm({
      resolver: zodResolver(schema),
    });
  
    const { register, control, handleSubmit, formState, reset } = form;
    const { errors, isDirty, isValid } = formState;
  
    const onSubmit = async (data, type) => {
      console.info('Submitted data: ', data);
      const d = await saveDept(data);
      refreshDeparments();
      setShowDept(false);
      console.log('Type received in parent:', type); // Log the type in the parent component
    };
  
    const handleOnHide = () => {
      reset({
        location: 'Sujith',
      });
      setShowDept(false);
    };
  
    const setAllDepts = async () => {
      const departments = await getAllDepts();
      console.info(departments);
      toast.info('handleAddDept :: Rendering');
      setDepts(departments);
    };
  
    useEffect(() => {
      setAllDepts();
    }, []);
  
    const refreshDeparments = async () => {
      await setAllDepts();
    };
  
    const handleOnDeleteDepartment = async (deptId) => {
      const result = await showConfirmDialog('Delete Department', `Do you want to delete ${deptId}?`);
      console.log('User clicked:', result); // true if confirmed, false if canceled
      if (result) {
        const flag = await deleteDept(deptId);
        if (flag) {
          toast.info(`${deptId} department deleted successfully!`);
          refreshDeparments();
        }
      }
    };
  
    const handleShowDialog = (type) => {
      reset({
        name: 'Sujith',
        location: 'Manuguru',
        active: true,
      });
      setShowDept(true);
    };
  
    const handleOnEdit = async (id) => {
      const res = await getDeptById(id);
      reset(res);
      setShowDept(true);
    };
  
    return (
      <div className='container-md'>
        <Button variant="primary" onClick={() => handleShowDialog('add')}>
          Add Dept
        </Button>
  
        <Button variant="primary" onClick={() => handleShowDialog('edit')}>
          Edit Dept
        </Button>
  
        <AddDept
          type='edit'  // Pass the appropriate type here (either 'add' or 'edit')
          onSubmit={(data) => onSubmit(data, 'edit')}
          show={showDept}
          onHide={handleOnHide}
          register={register}
          errors={errors}
        />
        <DeptTable depts={depts} onEdit={handleOnEdit} onDelete={handleOnDeleteDepartment} />
      </div>
    );
  };



const DeptTable = ({ depts = [], onDelete, onEdit }) => {
    return (
        <>
            <h2>Departments</h2>
            <table class="table table-hover">
                <thead className='table-info'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Department</th>
                        <th scope="col">Location</th>
                        <th scope="col">Last Updated</th>
                        <th scope="col">Active</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {

                        depts.map(dept => <tr key={dept.id}>
                            <th scope="row">{dept.id}</th>
                            <td>{dept.name}</td>
                            <td>{dept.location}</td>
                            <td>{convertFromStringToDate(dept.lastUpdated)}</td>
                            <td>{dept.active.toString()}</td>
                            <td>
                                <button className='btn btn-sm btn-success' onClick={() => onEdit(dept.id)}>Edit</button>
                                <button className='btn btn-sm mx-2 btn-danger' onClick={() => onDelete(dept.id)}>Del</button>
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </>
    )
}
