import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.min.css';
import { Button, Container } from 'react-bulma-components';
import topicService from '../Services/topicService';
import Swal from 'sweetalert2';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import TopicModal from './TopicModal';
import Nav from './Nav'
import { Link } from 'react-router-dom';
const $ = require('jquery');

const TopicIndex = () => {
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const deleteTopic = async () => {
    try {
      const response = await topicService.deleteTopic(topicId);
      Swal.fire({
        title: 'Successful',
        text: JSON.stringify(response.data.message),
        icon: 'success',
      });
      setTopicId('');
      getTopics(); // Actualiza los temas después de eliminar
      setEditModalOpen(false);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'The topic has not been created' + error,
        icon: 'error',
      });
    }
  };

  const getTopics = async () => {
    try {
      const response = await topicService.getTopics();
      const topicsData = response.data;
      setTopics(topicsData);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error getting topics' + error,
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    if (topics.length > 0) {
      $('#table-main').DataTable();
    }
  }, [topics]);

  const memoizedDeleteTopic = useCallback(deleteTopic, [topicId]);

  useEffect(() => {
    if (topicId) {
      memoizedDeleteTopic();
    }
  }, [topicId, memoizedDeleteTopic]);

  const handleEdit = (topic) => {
    setSelectedTopic(topic);
    setEditModalOpen(true);
  };

  const handleDelete = (e, topicId) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are u sure?',
      text: 'This action can not be undone!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Abort',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTopicId(topicId);
      }
    });
  };

  return (
    <>
    <Nav></Nav>
      <Container>
      <table id='table-main' className='table table-striped table-bordered border-dark'>
        <thead className='table text-center bg-black'>
          <tr>
            <th>ID</th>
            <th>Title</th>
            {/*<th>Description</th>*/}
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {topics.map((topic) => (
            <tr key={topic._id}>
              <td>{topic._id}</td>
              <td>{topic.title}</td>
              {/*<td>{topic.description}</td>*/}
              <td>{new Date(topic.creationDate).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => handleEdit(topic)} color='primary'>
                  Editar
                </Button>
                <Button onClick={(e) => handleDelete(e, topic._id)} color='danger'>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/create'>
        <Button color='success'>Crear Nuevo Tema</Button>
      </Link>
      {selectedTopic !== null && (
        <TopicModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          selectedTopic={selectedTopic}
          updateTopics={getTopics}
        />
      )}
      </Container>
    </>
  );
};

export default TopicIndex;
