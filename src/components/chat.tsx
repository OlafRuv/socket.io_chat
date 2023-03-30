// import moment from 'moment';
import { useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatProps {
	socket: Socket;
}

interface MessageProps {
	content: string;
	time?: number;
	timeMetric?: string;
	type?: 'received' | 'sended' | 'server-connection' | 'room-connection' | 'error';
	color?: string;
}

export const Chat = (props: ChatProps) => {
	const { socket } = props;
	const [messages, setMessages] = useState<MessageProps[]>([]);
	const [roomToSend, setRoomToSend] = useState<string>('');
	const [messageToSend, setMessageToSend] = useState<string>('');

	socket.on('connect', () => {
		console.log('Connected to server');
		setMessages([
			...messages,
			{ content: `Connected to server with Id: ${socket.id}`, type: 'server-connection' },
		]);
	});

	socket.on('connect_error', (error: any) => {
		console.log('Error connecting to server: ', error);
		setMessages([...messages, { content: error.message, type: 'error' }]);
	});

	socket.on('receive-message', (message: string) => {
		console.log('Message recieved: ', message);
		setMessages([...messages, { content: message, type: 'received' }]);
	});

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			setMessages([...messages, { content: event.target.value, time: 2, timeMetric: 'hrs' }]);
			setMessageToSend('');
			socket.emit('send-message', messageToSend, roomToSend);
			// ! guardarEnBaseDatos()
			// ? Los mensajes con volatile no se reciben en el servidor si ocurre una desconexión
			// socket.volatile.emit('send-message', messageToSend, roomToSend);
		}
	};

	const handleRoomChange = (event: any) => {
		if (Boolean(roomToSend)) {
			socket.emit('join-room', roomToSend, (response: any) => {
				setMessages([...messages, { content: response, type: 'room-connection' }]);
			});
		} else alert('Porfavor ingrese un nombre de sala');
	};

	const renderMessages = () => {
		return messages.map((message) => {
			switch (message.type) {
				case 'received':
					return recievedMessage({
						content: message.content,
						time: 2,
						timeMetric: 'mins',
					});
				case 'server-connection':
					return connected({ content: message.content });
				case 'room-connection':
					return connected({
						content: message.content,
						color: '#9510DD',
					});
				case 'error':
					return connected({
						content: message.content,
						color: '#C70039',
					});
				default:
					return sendedMessage({ content: message.content, time: 2, timeMetric: 'mins' });
			}
		});
	};

	const recievedMessage = (props: MessageProps) => {
		const { content, time, timeMetric } = props;
		return (
			<div className="flex w-full mt-2 space-x-3 max-w-xs">
				<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
				<div>
					<div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p className="text-sm">{content}</p>
					</div>
					<span className="text-xs text-gray-500 leading-none">
						{time || 0} {timeMetric || ''} {'ago'}
					</span>
				</div>
			</div>
		);
	};

	const sendedMessage = (props: MessageProps) => {
		const { content, time, timeMetric } = props;
		return (
			<div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p className="text-sm">{content}</p>
					</div>
					<span className="text-xs text-gray-500 leading-none">
						{time || 0} {timeMetric || ''} {'ago'}
					</span>
				</div>
				<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
		);
	};

	const connected = (props: MessageProps) => {
		const { content, color } = props;
		return (
			<div className={'flex w-full mt-2 space-x-3 max-w-sm ml-auto mr-auto justify-center'}>
				<div>
					<div
						className="bg-green-700 text-white p-3 rounded-lg"
						style={color ? { background: `${color}` } : {}}
					>
						<p className="text-sm">{content}</p>
					</div>
				</div>
			</div>
		);
	};

	function timeDifference(current: number, previous: number) {
		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;
		var elapsed = current - previous;
		if (elapsed < msPerMinute) {
			return Math.round(elapsed / 1000) + ' seconds ago';
		} else if (elapsed < msPerHour) {
			return Math.round(elapsed / msPerMinute) + ' minutes ago';
		} else if (elapsed < msPerDay) {
			return Math.round(elapsed / msPerHour) + ' hours ago';
		} else if (elapsed < msPerMonth) {
			return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
		} else if (elapsed < msPerYear) {
			return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
		} else {
			return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
		}
	}

	return (
		// <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800">
		<div className="bg-slate-500 min-w-screen min-h-screen flex flex-col justify-center items-center text-gray-800 m-0 p-0">
			<div className="flex flex-col flex-grow w-full max-w-xl shadow-xl rounded-lg overflow-hidden h-5/6 mt-4 mb-4 bg-slate-100">
				<div className="flex flex-col flex-grow h-0 bg-red p-4 overflow-auto">
					{renderMessages()}
				</div>
				<div className="bg-gray-300 pt-4 pl-4 pr-4 pb-1 flex flex-row gap-2">
					<input
						value={roomToSend}
						className="flex items-center h-10 w-full rounded px-3 text-sm bg-white"
						type="text"
						placeholder="Ingresar a una sala..."
						onChange={(e) => setRoomToSend(e.target.value)}
					/>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleRoomChange}
					>
						Unirse
					</button>
				</div>
				<div className="bg-gray-300 pt-1 pl-4 pr-4 pb-4">
					<input
						value={messageToSend}
						className="flex items-center h-10 w-full rounded px-3 text-sm bg-white"
						type="text"
						placeholder="Escribe tu mensaje..."
						onKeyDown={handleKeyDown}
						onChange={(e) => setMessageToSend(e.target.value)}
					/>
				</div>
			</div>
		</div>
		// </div>
	);
};
