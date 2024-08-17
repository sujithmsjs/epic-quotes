

import React from 'react'
import { useEffect } from 'react';
import { Todo } from './Todo';

export const TodoTable = ({ todos, onAction }) => {
    console.info('Inside Todo Table : ' + todos);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Time Left</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo =>

                            <Todo todo={todo} onAction={onAction} />


                        )
                    }
                </tbody>
            </table>
        </>);
}