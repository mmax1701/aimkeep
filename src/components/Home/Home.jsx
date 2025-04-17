import React, { useEffect, useState } from 'react';
import ModalMui from '../ModalMui.jsx/ModalMui';
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
import {
  Avatar,
  Container,
  Box,
  Typography,
  useMediaQuery,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import PageLayout from '../PageLayout/PageLayout';
import Header from '../Header/Header';
import AimsSection from '../AimsSection/AimsSection';

const Home = ({ user, handleSignOut }) => {
  const [aims, setAims] = useState([]);
  const [originalAims, setOriginalAims] = useState([]);
  const [editingAim, setEditingAim] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    <PageLayout>
      <Header
        user={user}
        onSignOut={handleSignOut}
        onSearch={handleSearch}
      />
      <AimsSection
        aims={aims}
        setIsAddModalOpen={setIsAddModalOpen}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        handleEditStart={handleEditStart}
        onSearch={handleSearch} // Передаем функцию поиска в AimsSection
      />

      <ModalMui
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Додати ціль"
      >
        <AddAim
          onCancel={() => setIsAddModalOpen(false)}
          getAllAims={() => {
            getAllAims();
            setIsAddModalOpen(false);
          }}
          userId={user.uid}
        />
      </ModalMui>

      <ModalMui
        open={!!editingAim}
        onClose={handleEditCancel}
        title="Редагувати ціль"
      >
        {editingAim && (
          <EditAimForm
            aim={editingAim}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        )}
      </ModalMui>
    </PageLayout>
  );
};

export default Home;
