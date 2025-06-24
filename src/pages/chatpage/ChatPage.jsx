// src/pages/chat/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoom from '../../pages/chatroom/ChatRoom';
import UserList from '../../pages/userlist/UserList';
import { fetchMessages } from '../../redux/reducers/messageSlice';
import { fetchMe } from '../../redux/reducers/userSlice'; // ✅ əlavə edildi
import socket from '../../socket/Socket';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { items: messages, loading } = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user.user);

  // ✅ Komponent yüklənəndə istifadəçi məlumatını Redux-a yüklə
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // ✅ Redux user gəldikdən sonra socket emit et
  useEffect(() => {
    if (user?._id) {
      console.log('📡 addUser göndərilir:', user._id);
      socket.emit('addUser', user._id);
    }
  }, [user]);

  // ✅ Seçilən istifadəçiyə görə mesajları yüklə
  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.userListWrapper}>
        <UserList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
      </div>

      <div className={styles.chatRoomWrapper}>
        {selectedUserId ? (
          loading ? (
            <p>Yüklənir...</p>
          ) : (
            <ChatRoom receiverId={selectedUserId} messages={messages} />
          )
        ) : (
          <p className={styles.selectPrompt}>Zəhmət olmasa, istifadəçi seçin</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
