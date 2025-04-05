import React, { useState } from 'react';

const EditAimForm = ({ aim, onSave, onCancel }) => {
  const [editedAim, setEditedAim] = useState(aim);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedAim(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(editedAim);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={editedAim.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={editedAim.description}
        onChange={handleChange}
      />
      <button type="submit">Зберегти</button>
      <button type="button" onClick={onCancel}>
        Скасувати
      </button>
    </form>
  );
};

export default EditAimForm;
