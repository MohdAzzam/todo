import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';

export default function UpdateTodoModal({ item, itemId, itemIndex, show, handelClose, onSubmit }) {
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        setSelectedItem(item);
    }, [item])

    const { register, handleSubmit, watch,setValue, formState: { errors } } = useForm();

    const model = watch();

    useEffect(() => {
        register('text');
        register('difficulty');
        register('assignee');
        register('dueDate')
    }, [])

    function handleSubmitForm(form) {
        onSubmit(form, itemId, itemIndex);
        setSelectedItem({});
    }

    return (
        <Modal show={show} onHide={handelClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <label>To Do</label>

                    <input onChange={(e) => setValue('text', e.target.value  )} name='text' defaultValue={selectedItem?.text} />

                    <label>Range</label>

                    <input type="range" min="1" max="5"
                        onChange={(e) => setValue('difficulty', e.target.value)}
                        defaultValue={parseInt(selectedItem?.difficulty)} name='difficulty' />

                    <label>Assign To </label>
                    <input defaultValue={selectedItem?.assignee}
                        onChange={(e) => setValue('assignee', e.target.value)} name='assignee'
                    />
                    <input className='mt-2 mb-4'
                        type='date'
                        name='dueDate'
                        defaultValue={selectedItem?.dueDate}
                        onChange={(e) => setValue('dueDate', e.target.value)} />
                    <button variant="secondary" onClick={handelClose}>
                        Close
                    </button>
                    <button variant="primary" onClick={handleSubmit(handleSubmitForm)} >
                        Save Changes
                    </button>
                </form>
            </Modal.Body>
        </Modal >
    )
}