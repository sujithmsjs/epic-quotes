
import React from 'react'
import { useEffect } from 'react'
import AddTodo from './AddTodo'
import { TodoTable } from './TodoTable'
import axios from "axios";
import { useState } from 'react';

export const TodoApp = () => {

    const [todos, setTodos] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    const handleOnSubmit = async (data) => {
        console.info(data);
        try {
            console.info('Saving... todos');
            const res = await axios.post('http://localhost:9090/api/todos', data)
            console.info('Result: ', res.data);
            getAllTodos();
        } catch (err) {

        }
    };

    const getAllTodos = async () => {
        try {
            console.info('Calling... htmlFor todos');
            const res = await axios.get('http://localhost:9090/api/todos');
            console.info(res.data);
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {


        getAllTodos();
        return () => {

        }
    }, [])

    const hanldeShowForm = (event) => {
        setShowAdd(event.target.checked);
    }

    const handleAction = () => {
        getAllTodos();
    }

    return (
        <>
            <h2>Task Table</h2>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={hanldeShowForm} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Show Add Todo Form
                </label>
            </div>
            {
                showAdd && <AddTodo onSubmit={handleOnSubmit} />
            }

            <TodoTable todos={todos} onAction={handleAction} />
        </>

    )
}
