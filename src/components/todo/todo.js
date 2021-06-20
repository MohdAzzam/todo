import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

export default function ToDo() {
  const [completeCount, setCompleteCount] = useState(0);
  const [inCompleteCount, setInCompleteCount] = useState(0);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList([
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ])
  },[])
  //
  useEffect(() => {
    let tempCompleteCount = list.filter(i => i.complete).length;
    let tempInCompleteCount = list.length - tempCompleteCount;
    setCompleteCount(tempCompleteCount);
    setInCompleteCount(tempInCompleteCount);
  }, [list])

  function toggleComplete(id) {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let todo = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(todo);
    }
  }

  function handleAddNewItem(item) {
    let lastId = parseInt(list[list.length - 1]['_id']);
    item['_id'] = (lastId + 1);
    item['complete'] = false;

    let temporaryList = [...list];
    temporaryList.push(item);

    setList(temporaryList);
  }

  return (
    <section className='container'>
      <Helmet>
        <title>
          {`Complete count : ${completeCount} , Incomplete count : ${inCompleteCount}`}
        </title>
      </Helmet>

      <header className='bg-dark mt-4 p-3'>
        <h2 className='text-light'>
          There are {completeCount} Items To Complete
        </h2>
      </header>

      <section className="todo d-flex">

        <div className='col-4 card mr-4 p-4'>
          <TodoForm  handleAddNewItem={handleAddNewItem} />
        </div>

        <div className='col-6 card ml-4 p-0'>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
          />
        </div>
      </section>
    </section>
  );
}