import React from 'react';

const AimList = ({ aims, handleComplete, handleDelete, handleEditStart }) => {
  return (
    <div>
      <ul>
        {aims.map(aim => (
          <li key={aim.id}>
            <div>{aim.title}</div>
            <div>{aim.description}</div>
            <div>
              <button onClick={() => handleDelete(aim.id)}>Видалити</button>
              {!aim.completed && (
                <button onClick={() => handleEditStart(aim.id)}>
                  Редагувати
                </button>
              )}
            </div>
            <div>
              {!aim.completed && (
                <button onClick={() => handleComplete(aim.id)}>Виконана</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AimList;
