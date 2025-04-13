import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AimAccordion from '../AimAccordion/AimAccordion';

const AimsSection = ({
  aims,
  setIsAddModalOpen,
  handleComplete,
  handleDelete,
  handleEditStart,
  onSearch, // Добавляем пропс для обработки поиска
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 2,
        px: 2,
        py: 3,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Поле поиска и кнопка добавления цели */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          id="search-aim"
          label="Пошук по назві цілі"
          variant="outlined"
          size="small"
          onChange={e => onSearch(e.target.value)}
          sx={{
            width: '100%',
            maxWidth: 400,
            fontSize: '0.8rem',
          }}
          InputProps={{
            sx: {
              height: 36,
              fontSize: '0.8rem',
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: '0.75rem',
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Додати ціль
        </Button>
      </Box>

      {/* Секция с целями */}
      {aims && aims.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={3}>
          {aims.some(aim => !aim.completed) && (
            <Box>
              <Typography variant="h6" mb={1}>
                Заплановані цілі
              </Typography>
              <AimAccordion
                aims={aims.filter(aim => !aim.completed)}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEditStart={handleEditStart}
              />
            </Box>
          )}

          {aims.some(aim => aim.completed) && (
            <Box>
              <Typography variant="h6" mb={1}>
                Виконані цілі
              </Typography>
              <AimAccordion
                aims={aims.filter(aim => aim.completed)}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEditStart={handleEditStart}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Наразі цілі відсутні
        </Typography>
      )}
    </Box>
  );
};

export default AimsSection;
