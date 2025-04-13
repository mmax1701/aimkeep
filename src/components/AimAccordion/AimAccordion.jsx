import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  AccordionActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AimAccordion = ({
  aims,
  handleComplete,
  handleDelete,
  handleEditStart,
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [aimToDelete, setAimToDelete] = useState(null);

  const handleDeleteClick = (aimId) => {
    setAimToDelete(aimId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (aimToDelete) {
      handleDelete(aimToDelete);
      setAimToDelete(null);
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setAimToDelete(null);
    setOpenConfirmDialog(false);
  };

  return (
    <div>
      {aims.map(aim => (
        <Accordion key={aim.id} defaultExpanded={false} style={{ margin: '7px 0' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography
              sx={{
                textDecoration: aim.completed ? 'line-through' : 'none',
                color: aim.completed ? 'text.disabled' : 'text.primary',
                fontWeight: aim.completed ? 400 : 500,
                fontSize: '1rem',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {aim.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              paddingLeft: '16px', // Обеспечиваем выравнивание текста от левого края
              paddingRight: '16px', // Добавляем отступ справа для симметрии
            }}
          >
            <Typography
              sx={{
                color: aim.completed ? 'text.secondary' : 'text.primary',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                textAlign: 'left', // Убираем выравнивание по центру
              }}
            >
              {aim.description}
            </Typography>
          </AccordionDetails>

          <AccordionActions>
            <div>
              <Button
                onClick={() => handleDeleteClick(aim.id)} // Открыть модальное окно подтверждения
                sx={{
                  color: 'error.main',
                  fontSize: '0.875rem',
                }}
              >
                Видалити
              </Button>

              {!aim.completed && (
                <Button
                  onClick={() => handleEditStart(aim.id)}
                  sx={{
                    color: 'primary.main',
                    fontSize: '0.875rem',
                  }}
                >
                  Редагувати
                </Button>
              )}
            </div>
            <div>
              {!aim.completed && (
                <Button
                  onClick={() => handleComplete(aim.id)}
                  sx={{
                    color: 'success.main',
                    fontSize: '0.875rem',
                  }}
                >
                  Виконана
                </Button>
              )}
            </div>
          </AccordionActions>
        </Accordion>
      ))}

      {/* Модальное окно для подтверждения удаления */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Підтвердження видалення"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Ви впевнені, що хочете видалити цю ціль? Цю дію не можна скасувати.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Скасувати
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AimAccordion;
