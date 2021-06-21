import React from 'react';


export default function TodoList({ list,
  handleComplete,handelDelete
}) {
  // function del (id){ 
  //   handelDelete(id)s
  // }
  return (  
    <ul className='list-group'>
      {list.map((item,indx) => (
        <div  key={item._id} className='text-center'>
          <li onClick={() => handleComplete(item._id)}
            className={`complete-${item.complete.toString()} list-group-item`}
           
          >
            {`${item.text} Assign to ---> ${item.assignee} ----> Difficulty ${item.difficulty} ----> DueDate ${item.dueDate}`}
          </li>
          <input type='submit' onClick={()=>handelDelete(indx)} className='btn btn-danger  w-25 mt-2 mb-4' value='Delete'/>   

        </div>
      ))}
    </ul>
  );
}