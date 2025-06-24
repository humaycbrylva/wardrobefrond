// src/pages/chat/ChatRoom.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket/Socket';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ receiverId, messages: initialMessages }) => {
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const [messages, setMessages] = useState(Array.isArray(initialMessages) ? initialMessages : []);
  const [newMessage, setNewMessage] = useState('');

  // Redux mesajları yenilənəndə yerli state-i də yenilə
  useEffect(() => {
    if (Array.isArray(initialMessages)) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // Real-time mesaj qəbul
  useEffect(() => {
    const handleReceive = (data) => {
      // Yalnız aktiv dialoqa aid olan mesajları əlavə et
      if (
        (data.senderId === receiverId && data.receiverId === userId) ||
        (data.senderId === userId && data.receiverId === receiverId)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on('receiveMessage', handleReceive);
    return () => socket.off('receiveMessage', handleReceive);
  }, [receiverId, userId]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: userId,
        receiverId,
        text: newMessage,
        createdAt: new Date().toISOString(),
      };

      socket.emit('sendMessage', messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.messagesContainer}>
        {Array.isArray(messages) && messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageBubble} ${
              msg.senderId === userId ? styles.sender : styles.receiver
            }`}
          >
            {msg.text}
            <div className={styles.timestamp}>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Mesaj yaz..."
        />
        <button onClick={handleSend}>Göndər</button>
      </div>
    </div>
  );
};

export default ChatRoom;



