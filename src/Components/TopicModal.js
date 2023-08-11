import React from 'react';
import { Modal } from 'react-bulma-components';
import ReactMarkdown from 'react-markdown';
import TopicCreate from './TopicCreate';

const TopicModal = ({ isOpen, onClose, selectedTopic, updateTopics }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Content>
        <div className="modal-container">
          <table id="table-main" className="table">
            <tbody>
              <tr>
                <td>Title:</td>
                <td>{selectedTopic.title}</td>
              </tr>
              <tr>
                <td>Creation Date:</td>
                <td>
                  <p>{selectedTopic.creationDate}</p>
                </td>
              </tr>
              <tr>
                <td>Description:</td>
                <td style={{ textAlign: 'justify' }}>
                  <ReactMarkdown>{selectedTopic.description}</ReactMarkdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-container col-12">
          <TopicCreate
            updateTopics={updateTopics}
            isUpdate={true}
            topicId={selectedTopic._id}
            onModalClose={onClose}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default TopicModal;
