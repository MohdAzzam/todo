import React from 'react';


export default function TodoList({ list,
  handleComplete
}) {
  return (
    <ul className='list-group'>
      {list.map(item => (
        <li onClick={() => handleComplete(item._id)}
          className={`complete-${item.complete.toString()} list-group-item`}
          key={item._id}
        >
          {`${item.text} Assign to ---> ${item.assignee}`}
        </li>
      ))}
    </ul>
  );
}