import { useRef, useState } from 'react';
import './App.css';
import MyAuth from './Components/MyAuth';
import Chat from './Components/Chat';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

function App() {
  // if isAUth is true then enter the chat room
  const [isAuth, setIsAuth] = useState(cookie.get("authToken"));
  const [room, setRoom] = useState(null);
  //to get value of input only after clicking button, otherwise after writning single word setRoom will be true and it will disappear
  //to let the client enter complete name of chat room and then go to chat
  const roomRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <MyAuth setIsAuth={setIsAuth}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        {room ? (
          <Chat room={room}/>
        ) : (
          <div className='room'>
            <label htmlFor="roomName">Enter Room Name</label>
            <input type="text" id='roomName' ref={roomRef}/>
            <button onClick={()=>setRoom(roomRef.current.value)}>Enter Chat</button>
          </div>
        )}
      </div>
    );
  }

}

export default App;
