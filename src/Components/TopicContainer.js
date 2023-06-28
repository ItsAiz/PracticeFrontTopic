import React, { useState, useEffect,Fragment } from 'react'
import TopicIndex from '../Components/TopicIndex'
import TopicCreate from '../Components/TopicCreate'
import topicService from '../Services/topicService'
import NavComponent from '../Components/Nav'
import Swal from 'sweetalert2'

const TopicContainer = () => {
    const [topics, setTopics] = useState([]);
  
    useEffect(() => {
      const getTopics = async () => {
        try {
          const response = await topicService.getTopics();
          const topics = response.data;
          setTopics(topics);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Error getting topics'+ error,
            icon: 'error',
          })
        }
      }
  
      getTopics()
    }, [])
  
    const updateTopics = async () => {
      try {
        const response = await topicService.getTopics();
        const updatedTopics = response.data;
        setTopics(updatedTopics);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error getting topics'+ error,
          icon: 'error',
        })
      }
    }
  
    return (
      <>
      <div className='container'>
        <NavComponent brand={'Test_APP'}/>
      </div>
      <div className='container'>
        <TopicIndex topics={topics} updateTopics={updateTopics}/>
      </div>
      <div className='container'>
        <TopicCreate updateTopics={updateTopics} />
      </div>
      </>
    );
  };
  
  export default TopicContainer;