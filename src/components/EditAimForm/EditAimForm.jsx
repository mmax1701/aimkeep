import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";

const EditAimForm = ({ aim, onSave, onCancel }) => {
  const [title, setTitle] = useState(aim.title);
  const [description, setDescription] = useState(aim.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...aim, title, description });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Назва цілі"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          required
        />
        <TextField
          label="Опис цілі"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          required
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
          <Button type="submit" variant="contained" size="small">
            Зберегти
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditAimForm;
