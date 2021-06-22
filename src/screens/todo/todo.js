import React, { useEffect, useState, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { TodoHelper } from "../../api/TodoHelper";
import AppContext from "../../context/AppContext";

export default function Todo() {
  const { isShowCompletedItem,numberOfItemsPerScreen } = useContext(AppContext.Context);
  const [list, setList] = useState([]);
  const [listCount,setListCount] = useState(0);

  /**
   * When load page need to call api to get todo itms
   */
  useEffect(() => {
    TodoHelper.list().then((response) => {
      setList(response.data.results);
      setListCount(response.data.count);
    })
  }, []);

  /**
   * Handle add new todo item
   * 
   * @param {Object} item 
   */
  const handleAddItem = (item) => {
    TodoHelper.add(item)
      .then((response) => {
        setList([...list, response.data])
      })
      .catch(console.error);
  };

  /**
   * Handle toogle complete value
   * 
   * @param {string} id 
   * @param {boolean} completeValue 
   */
  const handleToggleComplete = (id, completeValue) => {
    let data = {
      complete: !completeValue
    }
    TodoHelper.update(id, data).then((response) => {
      let updatedItem = response.data;
      setList(list.map(listItem => listItem._id === id ? updatedItem : listItem));
    })
  };

  /**
   * Handle update todo item
   * 
   * @param {string} id 
   * @param {Object} data 
   */
  const handelUpdate = (id, data) => {
    TodoHelper.update(id, data).then((response) => {
      let updatedItem = response.data;
      setList(list.map(listItem => listItem._id === id ? updatedItem : listItem));
    })
  };


  /**
   * Handle delete todo item
   * 
   * @param {string} id 
   * @param {number} itemIndex 
   */
  const handelDelete = (id, itemIndex) => {
    TodoHelper.delete(id).then((response) => {
      let temp = [...list];
      temp.splice(itemIndex, 1);
      setList(temp)
    });
  }

  return (
    <article>
      {isShowCompletedItem ? (
        <header>
          <h2>
            There are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
        </header>
      ) : []}

      <section className="todo">

        <div>
          <TodoForm handleAddNewItem={handleAddItem} />
        </div>

        <div>
          <TodoList
            baseList={list}
            listCount={listCount}
            numberOfItemsPerScreen={numberOfItemsPerScreen}
            handleComplete={handleToggleComplete}
            handelDelete={handelDelete}
            handelUpdate={handelUpdate}
          />
        </div>
      </section>
    </article>
  );
}