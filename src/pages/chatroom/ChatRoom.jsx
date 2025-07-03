// src/pages/chatroom/ChatRoom.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket/Socket';
import styles from './ChatRoom.module.css';
import axios from '../../services/axiosInstance';
import { FaTrashAlt} from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';

const ChatRoom = ({ receiverId }) => {
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return;
      try {
        const res = await axios.get(`/messages/${receiverId}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Mesajlar yüklənmədi:', err);
      }
    };
    fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    const handleReceive = (data) => {
      const senderId = data.senderId || data.sender?._id || data.sender;
      const receiver = data.receiverId || data.receiver?._id || data.receiver;

      if (
        (senderId === receiverId && receiver === userId) ||
        (senderId === userId && receiver === receiverId)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on('receiveMessage', handleReceive);
    return () => socket.off('receiveMessage', handleReceive);
  }, [receiverId, userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getSenderId = (msg) => msg.senderId || msg.sender?._id || msg.sender;
  const isMyMessage = (msg) => getSenderId(msg) === userId;

  const handleSend = async () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: userId,
        receiverId,
        text: newMessage.trim(),
        createdAt: new Date().toISOString(),
      };

      try {
        await axios.post('/messages', {
          receiverId,
          text: newMessage.trim(),
        });

        setMessages((prev) => [...prev, messageData]);
        socket.emit('sendMessage', messageData);
        setNewMessage('');
      } catch (err) {
        console.error('Mesaj göndərilə bilmədi:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error('Mesaj silinmədi:', err);
    }
  };

  const handleEdit = async (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`/messages/${id}`, { text: editText });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, text: editText, isEdited: true } : msg
        )
      );
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error('Mesaj düzəltilmədi:', err);
    }
  };

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => {
          const myMessage = isMyMessage(msg);
          const isEditing = editingId === msg._id;
          return (
            <div
              key={msg._id || index}
              ref={index === messages.length - 1 ? scrollRef : null}
              className={`${styles.messageBubble} ${myMessage ? styles.sender : styles.receiver}`}
            >
              {isEditing ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(msg._id)}
                    className={styles.editInput}
                  />
                  <button onClick={() => handleEditSubmit(msg._id)} className={styles.saveButton}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  {msg.text}
                  {msg.isEdited && <span className={styles.editedLabel}>(düzənləndi)</span>}
                  <div className={styles.timestamp}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  {myMessage && (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleEdit(msg._id, msg.text)} className={styles.editButton}>
                        <CiEdit />
                      </button>
                      <button onClick={() => handleDelete(msg._id)} className={styles.deleteButton}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.inputArea}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Mesaj yaz..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Göndər</button>
      </div>
    </div>
  );
};

export default ChatRoom;






