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
    assignee: Yup.string().required('You should assign a task to one')
  });

  //Form hooks
  const { register, handleSubmit, setValue, unregister, formState: { errors } } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      difficulty: '1'
    }
  });
  
  useEffect(() => {
    register('todo');
    register('difficulty');
    register('assignee');

    return () => {
      unregister('todo');
      unregister('difficulty');
      unregister('assignee');
    }
  }, [])

  function onSubmit(form) {
    handleAddNewItem(form);
  }
  return (
    <>
      <h3>Add Item</h3>
      <form >
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={(e) => setValue('text', e.target.value)}
          />
          {
            !!errors?.todo?.message &&
            <label>
              {errors?.todo?.message}
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
        <button onClick={handleSubmit(onSubmit)} className='btn btn-primary'  >Add Item</button>
      </form>
    </>
  );
}