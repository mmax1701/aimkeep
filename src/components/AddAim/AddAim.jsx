import React from 'react';

const AddAim = ({ onAddAim, onCancel }) => {
  return (
    <div>
      <h1>Додати ціль</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newAim = {
            title: formData.get('title'),
            description: formData.get('description'),
          };
          onAddAim(newAim);
        }}
      >
        <div>
          <label htmlFor="title">Назва цілі:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Опис:</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <button type="submit">Додати ціль</button>
      </form>
      <div>
        <button type="button" onClick={onCancel}>
          Скасувати
        </button>
      </div>
    </div>
  );
};

export default AddAim;
