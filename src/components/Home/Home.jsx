import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import AimAccordion from '../AimAccordion/AimAccordion';
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

import logo from '../../assets/logo.png';

Modal.setAppElement('#root');

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
    <Container maxWidth="sm">
      <div>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <img
            src={logo}
            alt="Логотип"
            style={{
              width: isMobile ? '32px' : '44px',
              height: isMobile ? '32px' : '44px',
            }}
          />
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            component="h1"
            fontWeight="bold"
          >
            AimKeep
          </Typography>
        </Box>
        <div>
          {user.photoURL && (
            <Avatar
              alt="avatar"
              src={user.photoURL}
              sx={{ width: 24, height: 24 }}
            />
          )}

          <div>{user.displayName}</div>
          <Button
            onClick={handleSignOut}
            size="small" // уменьшает внутренние отступы
            sx={{
              textTransform: 'none',
              fontSize: '0.75rem', // чуть меньше шрифт
              padding: '3px 7px', // уменьшенные отступы
              minWidth: 'unset', // убирает минимальную ширину
            }}
            variant="outlined"
            startIcon={<LogoutIcon fontSize="small" />} // уменьшить и иконку
          >
            Вийти
          </Button>
        </div>
        <div>
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Додати ціль
        </Button>
      </div>

      {aims && aims.length > 0 ? (
        <div>
          {aims.some(aim => !aim.completed) && (
            <>
              <div>Заплановані цілі</div>
              <AimAccordion
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
              <AimAccordion
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
    </Container>
  );
};

export default Home;
