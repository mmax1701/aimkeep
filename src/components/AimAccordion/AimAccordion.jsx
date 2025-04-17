import React, { useState } from "react";
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
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      {aims.map((aim) => (
        <Box
          key={aim.id}
          sx={{
            margin: "7px 0",
            backdropFilter: "blur(6px)", // Размытый фон для воздушности
            background: "rgba(255, 255, 255, 0.7)", // Полупрозрачный фон
            borderRadius: 2, // Скругленные углы
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Мягкая тень
            transition: "all 0.3s ease", // Плавные переходы для эффекта
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0,0,0,0.2)", // Усиление тени при наведении
              background: "rgba(255, 255, 255, 0.9)", // Более яркий фон при наведении
            },
          }}
        >
          <Accordion defaultExpanded={false} sx={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography
                sx={{
                  textDecoration: aim.completed ? "line-through" : "none",
                  color: aim.completed ? "text.disabled" : "text.primary",
                  fontWeight: aim.completed ? 400 : 500,
                  fontSize: "1rem",
                  fontFamily: "Roboto, sans-serif",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  maxWidth: "100%",
                }}
              >
                {aim.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                paddingLeft: "16px", // Обеспечиваем выравнивание текста от левого края
                paddingRight: "16px", // Добавляем отступ справа для симметрии
              }}
            >
              <Typography
                sx={{
                  color: aim.completed ? "text.secondary" : "text.primary",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxWidth: "100%",
                }}
              >
                {aim.description}
              </Typography>
            </AccordionDetails>

            <AccordionActions>
              <div>
                <Button
                  onClick={() => handleDeleteClick(aim.id)}
                  variant="outlined"
                  color="error"
                  size="small" // Открыть модальное окно подтверждения
                  sx={{
                    fontSize: "0.875rem",
                    marginRight: "7px",
                    padding: "3px 3px",
                    textTransform: "none",
                  }}
                >
                  Видалити
                </Button>

                {!aim.completed && (
                  <Button
                    onClick={() => handleEditStart(aim.id)}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "primary.main",
                      fontSize: "0.875rem",
                      padding: "3px 3px",
                      textTransform: "none",
                    }}
                  >
                    Змінити
                  </Button>
                )}
              </div>
              <div>
                {!aim.completed && (
                  <Button
                    onClick={() => handleComplete(aim.id)}
                    variant="contained"
                    size="small"
                    sx={{
                      fontSize: "0.875rem",
                      textTransform: "none",
                    }}
                  >
                    Виконана
                  </Button>
                )}
              </div>
            </AccordionActions>
          </Accordion>
        </Box>
      ))}

      {/* Модальное окно для подтверждения удаления */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Підтвердження видалення"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Ви впевнені, що хочете видалити цю ціль?
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
