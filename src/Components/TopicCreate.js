import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import topicService from '../Services/topicService';

const TopicCreate = ({updateTopics}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');

  const createNewTopic = async () => {
    try {
      const topicData = {
        title,
        description,
        creationDate
      };

      const response = await topicService.createTopic(topicData)
      alert(JSON.stringify(response.data.message))
      updateTopics(topicData)

      setTitle('');
      setDescription('');
      setCreationDate('');
    } catch (error) {
      console.error('Error creating Topic:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTopic();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="creationDate">Creation Date:</label>
        <DatePicker
          className="form-control"
          id="creationDate"
          selected={creationDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setCreationDate(date)}
          placeholderText="Select a date"
          isClearable
          
        />
      </div>
      <button type="submit" className="btn btn-primary col-12">Create Topic</button>
      <br></br><br></br>
    </form>
  );
};

export default TopicCreate;
