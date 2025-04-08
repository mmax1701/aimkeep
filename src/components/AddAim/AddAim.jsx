import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebase';

const AddAim = ({ onCancel, getAllAims }) => {
  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAim = {
      title: formData.get('title'),
      description: formData.get('description'),
    };

    try {
      await addDoc(collection(db, 'aims'), {
        ...newAim,
        completed: false,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding aim:', error);
      alert('Виникла помилка під час додавання цілі. Спробуйте ще раз.');
      return;
    }

    getAllAims();
    event.target.reset();
  };

  return (
    <div>
      <h1>Додати ціль</h1>
      <form onSubmit={handleSubmit}>
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
