import { io } from 'socket.io-client';
import { Chat } from './components/chat';

// const socket = io('http://localhost:3000');
// const userSocket = io('http://localhost:3000/user');
const userSocket = io('http://localhost:3000/user', { auth: { token: 'Test Token' } });

function App() {
	return (
		<div className="App">
			{/* <Chat socket={socket} /> */}
			<Chat socket={userSocket} />
		</div>
	);
}

export default App;
