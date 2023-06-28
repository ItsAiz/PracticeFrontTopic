import React, { useState, useEffect,Fragment } from 'react';
import TopicIndex from '../Components/TopicIndex';
import TopicCreate from '../Components/TopicCreate';
import topicService from '../Services/topicService';
import NavComponent from '../Components/Nav';

const TopicContainer = () => {
    const [topics, setTopics] = useState([]);
  
    useEffect(() => {
      const getTopics = async () => {
        try {
          const response = await topicService.getTopics();
          const topics = response.data;
          setTopics(topics);
        } catch (error) {
          console.error('Error al obtener los temas:', error);
        }
      };
  
      getTopics();
    }, [topics]);
  
    const updateTopics = (newTopic) => {
      setTopics([...topics, newTopic]);
    };
  
    return (
      <>
      <div className='container'>
        <NavComponent brand={'Test_APP'}/>
      </div>
      <div className='container'>
        <TopicIndex topics={topics} />
      </div>
      <div className='container'>
        <TopicCreate updateTopics={updateTopics} />
      </div>
      </>
    );
  };
  
  export default TopicContainer;