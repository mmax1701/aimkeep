import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  AccordionActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AimAccordion = ({
  aims,
  handleComplete,
  handleDelete,
  handleEditStart,
}) => {
  return (
    <div>
      <ul>
        {aims.map(aim => (
          <Accordion
            key={aim.id}
            defaultExpanded={false}
            style={{ margin: '7px 0' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography
                style={
                  aim.completed
                    ? { textDecoration: 'line-through', color: 'gray' }
                    : {}
                }
                component="span"
              >
                {aim.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{aim.description}</AccordionDetails>
            <AccordionActions>
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
                  <button onClick={() => handleComplete(aim.id)}>
                    Виконана
                  </button>
                )}
              </div>
            </AccordionActions>
          </Accordion>
        ))}
      </ul>
    </div>
  );
};

export default AimAccordion;
