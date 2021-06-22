import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { TodoHelper } from "../../api/TodoHelper";

const ToDo = () => {

  const [list, setList] = useState([]);

  /**
   * When load page need to call api to get todo itms
   */
  useEffect(() => {
    TodoHelper.list().then((response) => {
      setList(response.data.results);
    })
  }, []);

  /**
   * Handle add new todo item
   * 
   * @param {Object} item 
   */
  const _addItem = (item) => {
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
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleAddNewItem={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={handleToggleComplete}
            handelDelete={handelDelete}
            handelUpdate={handelUpdate}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
