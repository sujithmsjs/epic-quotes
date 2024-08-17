

import React from 'react'
import { formatTime } from '../../util/utility'
import axios from "axios";
import { any } from 'zod';
import { useState } from 'react';
import { getAllTodos } from './TodoApp';
import { useEffect } from 'react';

export const Todo = ({ todo, onAction }) => {

    const [time, setTime] = useState(todo.timeLeft);
    //const [pause, setPause] = useState(todo.status === "PAUSED" || todo.status === "NOT_STARTED");
    const [inProgress, setInProgress] = useState(todo.status === 'IN_PROGRESS');
    const [finished, setFinished] = useState(todo.status === "SUCCESS" || todo.status === 'TIME_OUT');

    useEffect(() => {
        const inverval = setInterval(() => {
            if (inProgress) {
                setTime(prev => prev - 1);
            }
        }, 1000)

        return () => {
            clearInterval(inverval);
        }
    }, [inProgress])


    const handleStart = async (id) => {
        try {
            const res = await axios.get(`http://localhost:9090/api/todos/start/${id}`);
            console.info('handleStart: ', res.data)
            setInProgress(true);
            onAction();
        } catch (err) {
            console.error('handleStart error: ', err);
        }

    }

    const handleStop = async (id) => {
        try {
            const res = await axios.get(`http://localhost:9090/api/todos/stop/${id}`);
            console.info('handleStop: ', res.data)
            setInProgress(false);
            onAction();
        } catch (err) {
            console.error('handleStop error: ', err);
        }

    }

    const handleFinish = async (id) => {
        try {
            const res = await axios.get(`http://localhost:9090/api/todos/finish/${id}`);
            console.info('handleFinish: ', res.data)
            setFinished(true);
            onAction();
        } catch (err) {
            console.error('handleFinish error: ', err);
        }

        console.info('Finish: ', id)
    }


    const status = time > 0 ? todo.status : 'TIME_OUT';

    return (
        <tr key={todo.id} className="bg">
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.priority}</td>
            <td>{formatTime(time)}</td>
            <td>{status}</td>

            <td>
                {
                    !finished &&
                    <>
                        {
                            inProgress ?
                                <button className="btn btn-warning mx-1" onClick={() => handleStop(todo.id)}>Stop</button> :
                                <button className="btn btn-primary mx-1" onClick={() => handleStart(todo.id)}>Start</button>
                        }
                        {
                            !inProgress && <button className="btn btn-success mx-1" onClick={() => handleFinish(todo.id)}>Finish</button>
                        }
                    </>
                }
            </td>
        </tr>
    )
}
