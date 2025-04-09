import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import AimList from '../AimList/AimList';
import EditAimForm from '../EditAimForm/EditAimForm';
import AddAim from '../AddAim/AddAim';

import { db } from '../../firebase';
import {
  getDocs,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import Search from '../Search/Search';

Modal.setAppElement('#root');

const Home = ({ user, handleSignOut }) => {
  const [aims, setAims] = useState([]);
  const [originalAims, setOriginalAims] = useState([]);
  const [editingAim, setEditingAim] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getAllAims = async () => {
    try {
      const aimsQuery = query(
        collection(db, 'aims'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const aimsCollection = await getDocs(aimsQuery);
      const aimsData = aimsCollection.docs.map(aim => ({
        id: aim.id,
        ...aim.data(),
      }));
      setAims(aimsData);
      setOriginalAims(aimsData); // сохраняем оригинальные цели
    } catch (error) {
      console.error('Error fetching aims:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getAllAims();
    }
  }, [user?.uid]);

  const handleComplete = async aimId => {
    const updatedAims = aims.map(aim =>
      aim.id === aimId ? { ...aim, completed: true } : aim
    );
    const updatedOriginal = originalAims.map(aim =>
      aim.id === aimId ? { ...aim, completed: true } : aim
    );
    setAims(updatedAims);
    setOriginalAims(updatedOriginal);
    await updateDoc(doc(db, 'aims', aimId), { completed: true });
  };

  const handleDelete = async aimId => {
    try {
      await deleteDoc(doc(db, 'aims', aimId));
      setAims(prev => prev.filter(aim => aim.id !== aimId));
      setOriginalAims(prev => prev.filter(aim => aim.id !== aimId));
    } catch (error) {
      console.error('Error deleting aim:', error);
    }
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

  const handleEditSave = async updatedAim => {
    try {
      await updateDoc(doc(db, 'aims', updatedAim.id), {
        title: updatedAim.title,
        description: updatedAim.description,
      });

      setAims(prevAims =>
        prevAims.map(aim => (aim.id === updatedAim.id ? updatedAim : aim))
      );
      setOriginalAims(prevAims =>
        prevAims.map(aim => (aim.id === updatedAim.id ? updatedAim : aim))
      );
      setEditingAim(null);
    } catch (error) {
      console.error('Error updating aim:', error);
    }
  };

  const handleSearch = value => {
    if (value.trim() === '') {
      setAims(originalAims); // если строка пустая — вернуть все цели
    } else {
      const filteredAims = originalAims.filter(aim =>
        aim.title?.toLowerCase().includes(value.toLowerCase())
      );
      setAims(filteredAims);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>logo</div>
          <p>AimKeep</p>
        </div>
        <div>
          <Search onSearch={handleSearch} />
        </div>
        <div>
          <div>{user.photoURL && <img src={user.photoURL} alt="photo" />}</div>
          <div>{user.displayName}</div>
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
          onCancel={() => setIsAddModalOpen(false)}
          getAllAims={() => {
            getAllAims();
            setIsAddModalOpen(false);
          }}
          userId={user.uid}
        />
      </Modal>

      <Modal isOpen={!!editingAim} onRequestClose={handleEditCancel}>
        {editingAim && (
          <EditAimForm
            aim={editingAim}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;
