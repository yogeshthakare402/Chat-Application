import React, { useEffect, useState } from 'react';
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore';
import { auth, db} from '../Firebase-Config/firebaseConfig';

function Chat({room}) {
  const [newMassage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([])
  // call the collection
  const messagesRef = collection(db,"Messages");

  useEffect(()=>{
    //for operationg over 2 account but one chat room so we get msg for same room only
    const qeuryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

   const unsubscribe = onSnapshot(
    qeuryMessages,
    (snapShot)=>{
      // console.log("newmasg");
      let messages = [];
      snapShot.forEach((doc)=>{
        messages.push({...doc.data(), id:doc.id}, orderBy("createdAt"))
      })
      setMessages(messages);
    });
    return ()=>unsubscribe();
  },[])

  // to push msg in database
  const handleSubmit = async(event)=>{
    event.preventDefault();
    console.log(newMassage);
    if(newMassage === ""){
      return
    }
    await addDoc(messagesRef,{
      text:newMassage,
      createdAt:serverTimestamp(),
      user:auth.currentUser.displayName,
      room,
    })

    setNewMessage("");
  }
  return (
    <div className='chatRoom'>
      <div>
        <h1>Welcome to {room.toUpperCase()}</h1>
      </div>
      <div>
        {messages.map((msg)=>{
          return <div className='message' key={msg.id}>
            <span className='user'>{msg.user} </span>
            {msg.text}
            </div>
        })}
      </div>
        <form action="" className='newmsgForm' onSubmit={handleSubmit}>
          <input type="text" className='new-message-input' placeholder='Type your message here' value={newMassage} onChange={(e)=>setNewMessage(e.target.value)}/>
          <button type='submit' className='send-button'>Send</button>
        </form>
    </div>
  )
}

export default Chat