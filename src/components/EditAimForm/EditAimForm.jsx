import React, { useState } from 'react';

const EditAimForm = ({ aim, onSave, onCancel }) => {
  const [title, setTitle] = useState(aim.title);
  const [description, setDescription] = useState(aim.description);

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...aim, title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Назва цілі"
      />
      <textarea
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Опис цілі"
      />
      <button type="submit">Зберегти</button>
      <button type="button" onClick={onCancel}>
        Скасувати
      </button>
    </form>
  );
};

export default EditAimForm;
