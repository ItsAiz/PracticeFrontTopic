import React, { useState, useEffect } from 'react';
import topicService from '../Services/topicService';

const TopicIndex = ({ topics }) => {
  const [topicId, setTopicId] = useState('');

  const deleteTopic = async () => {
    try {
      const response = await topicService.deleteTopic(topicId);
      alert(JSON.stringify(response.data.message));
      setTopicId('');
    } catch (error) {
      console.error('Error deleting Topic:', error);
    }
  };

  useEffect(() => {
    if (topicId) {
      deleteTopic();
    }
  });

  const handleEdit = () => {
    alert("edit");
  };

  const handleDelete = (e, topicId) => {
    e.preventDefault();
    setTopicId(topicId);
  };

  return (
    <>
      <table className="table table-striped table-bordered border-dark productsTable">
        <thead className="table text-center bg-dark" style={{ color: 'white', alignContent: 'center' }}>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody className="text-center">
          {topics.map((topic) => (
            <tr key={topic._id}>
              <td>{topic._id}</td>
              <td>{topic.title}</td>
              <td>{topic.description}</td>
              <td>{new Date(topic.creationDate).toLocaleDateString()}</td>
              <td>
                <button onClick={handleEdit} className="btn btn-primary" id="button">
                  Editar
                </button>
                <button onClick={(e) => handleDelete(e, topic._id)} className="btn btn-danger" id="button3">
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TopicIndex;
