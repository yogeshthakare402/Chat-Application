import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../Firebase-Config/firebaseConfig';
import {VscSend} from 'react-icons/vsc';
import {BiUserPin} from 'react-icons/bi';

function Chat({ room }) {
  const [newMassage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([])
  // call the collection
  const messagesRef = collection(db, "Messages");

  useEffect(() => {
    //for operationg over 2 account but one chat room so we get msg for same room only
    const qeuryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(
      qeuryMessages,
      (snapShot) => {
        // console.log("newmasg");
        let messages = [];
        snapShot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id })
        })
        setMessages(messages);
      });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [])

  // to push msg in database
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(messages);
    if (newMassage === "") {
      return
    }
    await addDoc(messagesRef, {
      text: newMassage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    })

    setNewMessage("");
  }
  return (
    <div className='d-flex flex-column chatRoom'>
      <div className='pt-3 text-center rounded heading'>
        <h2>Welcome to {room.toUpperCase()}</h2>
      </div>
      <div className='pt-3 ms-4 msgBox'>
        {messages.map((msg) => {
          return <div className='mb-3 message' key={msg.id}>
            <div className='mb-2'><BiUserPin className='icon'/><span className='user'>{msg.user}</span></div>
            <div className='ms-4 border rounded msg'>{msg.text}</div>
          </div>
        })}
      </div>
      <form className='d-flex flex-row newmsgForm' onSubmit={handleSubmit}>
          <input type="text" className='rounded new-message-input' placeholder='Type your message here' 
          style={{color:"black"}}
          value={newMassage} 
          onChange={(e) => setNewMessage(e.target.value)} />
          <button type='submit' className='btn btn-outline-primary send-button'><VscSend/></button>
      </form>
      <button type='button' className='btn btn-primary disabledBtn' disabled></button>
    </div>
  )
}

export default Chat