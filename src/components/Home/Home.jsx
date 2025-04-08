import React, { useState } from 'react';
import Modal from 'react-modal';

import aim from '../../aim.json';
import AimList from '../AimList/AimList';
import EditAimForm from '../EditAimForm/EditAimForm'; // Импортируем форму
import { nanoid } from 'nanoid';
import AddAim from '../AddAim/AddAim';

Modal.setAppElement('#root');

const Home = ({ user, handleSignOut }) => {
  const [aims, setAims] = useState(aim);
  const [editingAim, setEditingAim] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleComplete = aimId => {
    setAims(prevAims =>
      prevAims.map(aim =>
        aim.id === aimId ? { ...aim, completed: true } : aim
      )
    );
  };

  const handleDelete = aimId => {
    setAims(prevAims => prevAims.filter(aim => aim.id !== aimId));
  };

  const handleAddAim = newAim => {
    const aimWithId = { ...newAim, id: nanoid() };
    setAims(prevAims => [aimWithId, ...prevAims]);
    setIsAddModalOpen(false);
  };

  const handleEditStart = aimId => {
    const aimToEdit = aims.find(aim => aim.id === aimId);
    if (aimToEdit) {
      setEditingAim(aimToEdit);
    }
  };

  const handleEditCancel = () => {
    setEditingAim(null);
  };

  const handleEditSave = updatedAim => {
    setAims(prevAims =>
      prevAims.map(aim => (aim.id === updatedAim.id ? updatedAim : aim))
    );
    setEditingAim(null);
  };

  return (
    <div>
      <div>
        <div>logo</div>
        <div>search</div>
        <div>
          <div>photo_user</div>
          <div>{user}</div>
          <button onClick={handleSignOut}>Вийти</button>
        </div>
      </div>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>Додати ціль</button>
      </div>

      {aims.length > 0 ? (
        <div>
          {aims.some(aim => !aim.completed) && (
            <>
              <div>Заплановані цілі</div>
              <AimList
                aims={aims.filter(aim => !aim.completed)}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEditStart={handleEditStart}
              />
            </>
          )}

          {aims.some(aim => aim.completed) && (
            <>
              <div>Виконані цілі</div>
              <AimList
                aims={aims.filter(aim => aim.completed)}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEditStart={handleEditStart}
              />
            </>
          )}
        </div>
      ) : (
        <div>Наразі цілі відсутні</div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <AddAim
          onAddAim={handleAddAim}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={!!editingAim} onRequestClose={() => setEditingAim(null)}>
        {editingAim && (
          <EditAimForm
            aim={editingAim}
            onSave={updatedAim => {
              setAims(prev =>
                prev.map(aim => (aim.id === updatedAim.id ? updatedAim : aim))
              );
              setEditingAim(null);
            }}
            onCancel={() => setEditingAim(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;
