import React, { useState } from 'react';
import UpdateTodoModal from "./UpdateTodoModal";

export default function TodoList({ list,
  handleComplete, handelDelete, handelUpdate
}) {
  const [modalUpdate, setModalUpdate] = useState({
    show: false
  });

  function handleUpdateItem(item, itemId,itemIndex) {
    handleCloseUpdateModal();
    handelUpdate(item,itemId,itemIndex);
  }

  function handleShowUpdateModal(item,itemIndex) {
    setModalUpdate({
      item: item,
      itemId: item['_id'],
      itemIndex : itemIndex,
      show: true,
      handelClose: handleCloseUpdateModal,
      onSubmit: handleUpdateItem
    });
  }

  function handleCloseUpdateModal(e) {
    if (e) {
      e.preventDefault();
    }
    setModalUpdate({});
  }

  return (
    <div>
      <UpdateTodoModal {...modalUpdate} />
      <ul className='list-group'>
        {list.map((item, index) => (
          <div key={item._id} className='text-center'>
            <li onClick={() => handleComplete(item._id)}
              className={`complete-${item.complete.toString()} list-group-item`}

            >
              {`${item.text} Assign to ---> ${item.assignee} ----> Difficulty ${item.difficulty} ----> DueDate ${item.dueDate}`}
            </li>
            <input type='submit' onClick={() => handelDelete(index)} className='btn btn-danger mr-4  w-25 mt-2 mb-4' value='Delete' />
            <input type='submit'
              className='btn btn-warning  w-25 mt-2 mb-4' value='Update'
              onClick={() => { handleShowUpdateModal(item, index) }} />
          </div>

        ))}
      </ul>
    </div>
  );
}