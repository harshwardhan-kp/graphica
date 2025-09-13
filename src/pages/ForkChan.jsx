import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { adjectives, nouns } from '../data/anonymousNames';

// Function to get or create an anonymous name
const getAnonymousName = () => {
  let name = localStorage.getItem('anonymousName');
  if (!name) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    name = `${adj} ${noun}`;
    localStorage.setItem('anonymousName', name);
  }
  return name;
};

const ForkChan = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName] = useState(getAnonymousName());
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      senderName: senderName,
      createdAt: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <div className="fork-chan-container">
      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.senderName || 'Anonymous'}:</strong>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Chatting as ${senderName}...`}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForkChan;
