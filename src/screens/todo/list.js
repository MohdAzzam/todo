import React, { useState, useEffect, useContext } from 'react';
import { Badge, Toast } from 'react-bootstrap';
import UpdateTodoModal from "./UpdateTodoModal";
import UserRoles from "../User/UserRoles";
import Auth from '../../context/Auth';

export default function TodoList({
  baseList,
  listCount,
  numberOfItemsPerScreen,
  handleComplete,
  handelDelete,
  handelUpdate
}) {
  const { userIsCan } = useContext(Auth.Context);
  const [modalUpdate, setModalUpdate] = useState({
    show: false
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState([]);
  const [enableNextPage, setEnableNextPage] = useState(false);
  const [enablePrevious, setEnablePrevious] = useState(false);

  useEffect(() => {
    if (listCount > numberOfItemsPerScreen) {
      let offset = (pageNumber - 1) * numberOfItemsPerScreen;
      let tempList = [...baseList];
      tempList = tempList.slice(offset, numberOfItemsPerScreen + offset);
      setList(tempList)
      setEnableNextPage(baseList.length > (pageNumber * numberOfItemsPerScreen));
      return;
    }
    setList(baseList)
  }, [listCount, baseList, pageNumber, numberOfItemsPerScreen])

  useEffect(() => {
    setEnablePrevious(pageNumber > 1);
  }, [pageNumber])


  function handleUpdateItem(item, itemId, itemIndex) {
    handleCloseUpdateModal();
    handelUpdate(itemId, item);
  }

  function handleShowUpdateModal(item, itemIndex) {
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

  function handleGoNextPage() {
    setPageNumber(pageNumber + 1);
  }

  function handleGoPrevious() {
    setPageNumber(pageNumber - 1);
  }

  return (
    <div className='text-center'>


      <UpdateTodoModal {...modalUpdate} />
      <ul className='list-group todo-list'>
        {list.map((item, index) => (
          <Toast className={userIsCan(UserRoles.DELETE) ? '' : 'hide-delete'} onClose={() => handelDelete(item._id, index)} key={item._id}>
            <Toast.Header >
              
              {userIsCan(UserRoles.UPDATE) ? (
                <div className="col-3">
                  <Badge pill variant={item.complete ? "success" : "danger"} onClick={() => handleComplete(item._id, item.complete)}>
                    {item.complete ? "Complete" : "pending"}
                  </Badge>{' '}
                </div>
              ) : []}

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
              {userIsCan(UserRoles.UPDATE) ? (
                <div className="d-flex justify-content-end">
                  <input type='submit'
                    className='btn btn-warning  w-25 mt-2 mb-4' value='Update'
                    onClick={() => { handleShowUpdateModal(item, index) }} />
                </div>

              ) : []}
            </Toast.Body>
          </Toast>
        ))}
      </ul>


      <div className="d-flex mt-3 justify-content-between">
        {enablePrevious ? (
          <button className='btn btn-info' onClick={handleGoPrevious}>Previous</button>
        ) : []}
        {enableNextPage ? (
          <button className='btn btn-success' onClick={handleGoNextPage}>Next</button>
        ) : []}
      </div>
    </div>
  );
}

