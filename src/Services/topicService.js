import axios from 'axios';

const API_URL = 'http://localhost:4000';

const topicService = {
  createTopic: (topicData) => {
    return axios.post(`${API_URL}/createTopic`, {
      title: topicData.title,
      description: topicData.description,
      creationDate: topicData.creationDate,
    });
  },
  getTopics: () => {
    return axios.get(`${API_URL}/getTopics`);
  },
  deleteTopic: (topicId) =>{
    return axios.delete(`${API_URL}/deleteTopic/${topicId}`)
  },
  updateTopic: (topicData) =>{
    return axios.patch(`${API_URL}/updateTopic/${topicData.id}`, {
      title: topicData.title,
      description: topicData.description,
      creationDate: topicData.creationDate,
    })
  }
};

export default topicService;
