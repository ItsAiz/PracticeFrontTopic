import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'bulma/css/bulma.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import topicService from '../Services/topicService';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'; // Importa el hook para la navegación
import { Button, Container } from 'react-bulma-components';

const TopicCreate = ({ isUpdate, topicId, onModalClose }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const navigate = useNavigate(); // Hook de navegación

  const createNewTopic = async () => {
    try {
      const topicData = {
        title,
        description,
        creationDate,
      };

      const response = await topicService.createTopic(topicData);
      Swal.fire({
        title: 'Successful',
        text: JSON.stringify(response.data.message),
        icon: 'success',
      });

      navigate('/'); // Navegar de vuelta a la página principal después de crear un tema

      setTitle('');
      setDescription('');
      setCreationDate('');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'The topic has not been created, check required fields',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (topicId) {
      setId(topicId);
    }
  }, [topicId]);

  const updateTopic = async () => {
    try {
      const topicData = {
        id,
        title,
        description,
        creationDate,
      };
      const response = await topicService.updateTopic(topicData);
      Swal.fire({
        title: 'Successful',
        text: JSON.stringify(response.data.message),
        icon: 'success',
      });

      navigate('/'); // Navegar de vuelta a la página principal después de actualizar un tema

      setId('');
      if (onModalClose) {
        onModalClose();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'The topic has not been updated ->' + error,
        icon: 'error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      updateTopic();
    } else {
      createNewTopic();
    }
  };

  return (
    <>
    <Container>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            className='form-control'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            type='text'
            className='form-control'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required />
        </div>
        <div className='form-group'>
          <label htmlFor='creationDate'>Creation Date:</label>
          <DatePicker
            className='form-control'
            id='creationDate'
            selected={creationDate}
            dateFormat='dd/MM/yyyy'
            onChange={(date) => setCreationDate(date)}
            placeholderText='Select a date'
            isClearable />
        </div>
        <button type='submit' className='btn btn-primary col-12'>
          {isUpdate ? 'Update Topic' : 'Create Topic'}
        </button>
        <br />
        <br />
      </form>
      <Link to='/'>
          <Button color='primary'>Volver a la Lista</Button>
      </Link>
    </Container>
    </>
  );
};

export default TopicCreate;
