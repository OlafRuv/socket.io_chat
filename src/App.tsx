import './App.css';

interface MessageProps {
	message: string;
	time: string;
}

function App() {
	const recievedMessage = (props: MessageProps) => {
		const { message, time } = props;
		return (
			<div className="flex w-full mt-2 space-x-3 max-w-xs">
				<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
				<div>
					<div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p className="text-sm">{message}</p>
					</div>
					<span className="text-xs text-gray-500 leading-none">{time}</span>
				</div>
			</div>
		);
	};

	const sendedMessage = (props: MessageProps) => {
		const { message, time } = props;
		return (
			<div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p className="text-sm">{message}</p>
					</div>
					<span className="text-xs text-gray-500 leading-none">{time}</span>
				</div>
				<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
		);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800">
			<div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
				<div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
					{recievedMessage({
						message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
						time: '2 min ago',
					})}
					{sendedMessage({
						message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
						time: '2 min ago',
					})}
				</div>
				<div className="bg-gray-300 p-4">
					<input
						className="flex items-center h-10 w-full rounded px-3 text-sm bg-white"
						type="text"
						placeholder="Type your message…"
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
