import { useState } from 'react';
import './App.css';

interface MessageProps {
	content: string;
	time: number;
	timeMetric?: string;
	type?: 'recieved' | 'sended';
}

function App() {
	const [messages, setMessages] = useState<MessageProps[]>([]);
	const [messageToSend, setMessageToSend] = useState<string>('');

	const recieveMessage = () => {};
	const sendMessage = () => {};

	const renderMessages = () => {
		return messages.map((message) => {
			console.log('Message to render: ', message);
			if (message.type === 'recieved') {
				return recievedMessage({ content: message.content, time: 2, timeMetric: 'mins' });
			} else {
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
		console.log('Message: ', content);
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

	const handleKeyDown = (event: any) => {
		// setMessageToSend(event.target.value);
		if (event.key === 'Enter') {
			setMessages([...messages, { content: event.target.value, time: 2, timeMetric: 'hrs' }]);
			setMessageToSend('');
		}
	};

	return (
		// <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800">
		<div className="bg-slate-500 min-w-screen min-h-screen flex flex-col justify-center items-center text-gray-800 m-0 p-0">
			<div className="flex flex-col flex-grow w-full max-w-xl shadow-xl rounded-lg overflow-hidden h-5/6 mt-4 mb-4 bg-slate-100">
				<div className="flex flex-col flex-grow h-0 bg-red p-4 overflow-auto">
					{renderMessages()}
				</div>
				<div className="bg-gray-300 p-4">
					<input
						value={messageToSend}
						className="flex items-center h-10 w-full rounded px-3 text-sm bg-white"
						type="text"
						placeholder="Escribe tu mensaje…"
						onKeyDown={handleKeyDown}
						onChange={(e) => setMessageToSend(e.target.value)}
					/>
				</div>
			</div>
		</div>

		// </div>
	);
}

export default App;
