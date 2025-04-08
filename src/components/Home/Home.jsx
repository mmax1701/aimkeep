import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import AimList from '../AimList/AimList';
import EditAimForm from '../EditAimForm/EditAimForm'; // Импортируем форму
import { nanoid } from 'nanoid';
import AddAim from '../AddAim/AddAim';

import { db } from '../../firebase';
import {
  getDocs,
  collection,
  doc,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';

Modal.setAppElement('#root');

const Home = ({ user, handleSignOut }) => {
  const [aims, setAims] = useState();
  const [editingAim, setEditingAim] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getAllAims = async () => {
    try {
      const aimsQuery = query(
        collection(db, 'aims'),
        orderBy('createdAt', 'desc')
      );
      const aimsCollection = await getDocs(aimsQuery);
      const aimsData = aimsCollection.docs.map(aim => ({
        id: aim.id,
        ...aim.data(),
      }));
      setAims(aimsData);
    } catch (error) {
      console.error('Error fetching aims:', error);
    }
  };

  useEffect(() => {
    getAllAims();
  }, []);

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

  // const handleAddAim = newAim => {
  //   const aimWithId = { ...newAim, id: nanoid() };
  //   setAims(prevAims => [aimWithId, ...prevAims]);
  //   setIsAddModalOpen(false);
  // };

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

      {aims && aims.length > 0 ? (
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
          // onAddAim={handleAddAim}

          onCancel={() => setIsAddModalOpen(false)}
          getAllAims={() => {
            getAllAims();
            setIsAddModalOpen(false);
          }}
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
