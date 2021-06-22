import React, { useState } from 'react';
import { Badge, Toast } from 'react-bootstrap';
import UpdateTodoModal from "./UpdateTodoModal";
import './todo.scss';

export default function TodoList({
  list,
  handleComplete,
  handelDelete,
  handelUpdate
}) {
  const [modalUpdate, setModalUpdate] = useState({
    show: false
  });

  function handleUpdateItem(item, itemId, itemIndex) {
    handleCloseUpdateModal();
    handelUpdate(itemId, item);

  }

  function handleShowUpdateModal(item, itemIndex) {
    console.log(item);
    setModalUpdate({
      item: item,
      itemId: item['_id'],
      itemIndex: itemIndex,
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
    <div className='text-center'>
      <UpdateTodoModal {...modalUpdate} />
      <ul className='list-group todo-list'>
        {list.map((item, index) => (
          <Toast onClose={() => handelDelete(item._id, index)} key={item._id}>
            <Toast.Header>
              <div className="col-3">
                <Badge pill variant={item.complete ? "success" : "danger"} onClick={() => handleComplete(item._id, item.complete)}>
                  {item.complete ? "Complete" : "pending"}
                </Badge>{' '}
              </div>
              <div className="col-4">
                <strong >{item.assignee}</strong>
              </div>
            </Toast.Header>
            <Toast.Body  >
              <div className="d-flex">
                <p className='text-center'>{item.text}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p >{item.dueDate}</p>
                <p >Difficulty : {item.difficulty}</p>
              </div>
              {/* <input type='submit' onClick={() => handelDelete(index)} className='btn btn-danger mr-4  w-25 mt-2 mb-4' value='Delete' /> */}
              <div className="d-flex justify-content-end">
                <input type='submit'
                  className='btn btn-warning  w-25 mt-2 mb-4' value='Update'
                  onClick={() => { handleShowUpdateModal(item, index) }} />
              </div>
            </Toast.Body>
          </Toast>
        ))}
      </ul>
    </div>
  );
}

