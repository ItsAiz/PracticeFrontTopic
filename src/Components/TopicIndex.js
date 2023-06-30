import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css'
import { Button, Modal} from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import topicService from '../Services/topicService'
import Swal from 'sweetalert2'
import TopicCreate from './TopicCreate'


const TopicIndex = ({ topics, updateTopics }) => {
  const [topicId, setTopicId] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)

  const deleteTopic = async () => {
    try {
      const response = await topicService.deleteTopic(topicId);
      Swal.fire({
        title: 'Successful',
        text: JSON.stringify(response.data.message),
        icon: 'success',
      })
      setTopicId('')
      updateTopics()
      setEditModalOpen(false)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'The topic has not been created'+ error,
        icon: 'error',
      })
    }
  }

  useEffect(() => {
    if (topicId) {
      deleteTopic()
    }
  });

  const handleEdit = (topic) => {
    setSelectedTopic(topic)
    setEditModalOpen(true)
  }

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
    })
  }

  return (
    <>
      <table className="table table-striped table-bordered productsTable">
        <thead className="table text-center bg-black">
          <tr>
            <th>ID</th>
            <th>Title</th>
            {/*<th>Description</th>*/}
            <th>Creation Date</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody className="text-center">
          {topics.map((topic) => (
            <tr key={topic._id}>
              <td>{topic._id}</td>
              <td>{topic.title}</td>
              {/*<td>{topic.description}</td>*/}
              <td>{new Date(topic.creationDate).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => handleEdit(topic)} color="primary">
                  Editar
                </Button>
                <Button onClick={(e) => handleDelete(e, topic._id)} color="danger">
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      {selectedTopic && (
        <Modal show={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Modal.Content>
            <div className="modal-container">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Title:</td>
                    <td>{selectedTopic.title}</td>
                  </tr>
                  <tr>
                    <td>Creation Date:</td>
                    <td><p>{selectedTopic.creationDate}</p></td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td style={{textAlign: 'justify'}}><ReactMarkdown>{selectedTopic.description}</ReactMarkdown></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-container col-12">
              <TopicCreate
                updateTopics={updateTopics}
                isUpdate={true}
                topicId={selectedTopic._id}
                onModalClose={() => setEditModalOpen(false)}
              />
            </div>
          </Modal.Content>
        </Modal>
      )}
    </>
  )
}

export default TopicIndex;
