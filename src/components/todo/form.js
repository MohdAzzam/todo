import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

export default function TodoForm({ handleAddNewItem }) {

  // validation schema.
  const validation = Yup.object().shape({
    text: Yup.string()
      .required('task is required'),
    difficulty: Yup.string()
      .required('difficulty is required'),
    assignee: Yup.string().required('You should assign a task to one'),
    dueDate: Yup.string().required('You should pic up a date to finish the task')
  });

  //Form hooks
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      difficulty: '1'
    }
  });

  useEffect(() => {
    register('text');
    register('difficulty');
    register('assignee');
    register('dueDate')

  })

  function onSubmit(form,e) {
    handleAddNewItem(form);
    e.target.reset();
  }
  return (
    <>
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={(e) => setValue('text', e.target.value)}
          />
          {
            !!errors?.text?.message &&
            <label>
              {errors?.text?.message}
            </label>
          }
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input defaultValue="1" type="range" min="1" max="5" name="difficulty"
            onChange={(e) => setValue('difficulty', e.target.value)} />
        </label>

        <label>
          <span>Assigned To</span>
          <input type="text" name="assignee" placeholder="Assigned To" onChange={(e) => setValue('assignee', e.target.value)} />
        </label>
        {
          !!errors?.assignee?.message &&
          <label>
            {errors?.assignee?.message}
          </label>
        }
        <input className='mt-2 mb-4' type='date' name='dueDate' onChange={(e) => setValue('dueDate', e.target.value)} />
        {
          !!errors?.dueDate?.message &&
          <label>
            {errors?.dueDate?.message}
          </label>
        }
        <button  className='btn btn-primary'  >Add Item</button>
      </form>
    </>
  );
}