import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebase';

import {
  Box,
  Button,
  TextField,
  Stack,
} from '@mui/material';

const AddAim = ({ onCancel, getAllAims, userId }) => {
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
        userId,
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
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Назва цілі"
          name="title"
          required
          fullWidth
          size="small"
        />
        <TextField
          label="Опис"
          name="description"
          required
          fullWidth
          multiline
          rows={4}
        />

        <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
          <Button
            type="button"
            onClick={onCancel}
            variant="outlined"
            size="small"
          >
            Скасувати
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
          >
            Додати ціль
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddAim;
