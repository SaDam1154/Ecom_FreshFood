import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import {
    sendMessage,
    getMessages,
    updateLastMessage,
} from '../../configs/firebase/firebaseUtils.js';
import { Timestamp } from 'firebase/firestore';

export default function ChatBox({ onClose, senderId, conversationId, customerId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [firstOpen, setFirstOpen] = useState(true);
    useEffect(() => {
        const unsubscribe = getMessages(conversationId, (fetchedMessages) => {
            setMessages(fetchedMessages);
        });

        return () => unsubscribe(); // Hủy đăng ký khi component unmount
    }, [conversationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        console.log(firstOpen, 'đây là FO');
        const messagesContainer = document.querySelector('.messages-container');
        if (firstOpen) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight - 280;
            if (
                messagesContainer.scrollTop > 100 &&
                messagesContainer.scrollTop >= messagesContainer.scrollHeight - 300
            ) {
                setFirstOpen(false);
            }
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                conversations: conversationId,
                senderId: senderId,
                text: message,
                timestamp: Timestamp.now(),
            };
            setMessages([...messages, newMessage]);
            setMessage('');
            sendMessage(newMessage);
            updateLastMessage(conversationId, newMessage);

            setTimeout(() => {
                const opponentMessage = {
                    text: 'Vui lòng chờ trong giây lát',
                    timestamp: Timestamp.now(),
                };
                setMessages((prevMessages) => [...prevMessages, opponentMessage]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    const formattedTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return moment(date).format('HH:mm');
    };
    return (
        <div className="fixed bottom-4 right-4 z-50 flex h-[440px] w-80 flex-col rounded-lg border border-gray-300 bg-white shadow-lg">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-600 p-2 text-white">
                <h2 className="text-lg">ADMIN</h2>
                <button
                    onClick={onClose}
                    className="h-6 w-6 transform text-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="messages-container flex-1 overflow-y-auto p-2">
                {messages
                    ?.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
                    .map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${msg.senderId === customerId ? 'text-right' : 'text-left'}`}
                        >
                            <div
                                className={`inline-block rounded-lg p-2 ${msg.senderId === customerId ? 'bg-blue-100' : 'bg-gray-300'}`}
                            >
                                <span>{msg.text}</span>
                                <span className="block text-xs text-gray-500">
                                    {formattedTimestamp(msg.timestamp)}
                                </span>
                            </div>
                        </div>
                    ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-gray-300 p-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full rounded-lg border border-gray-300 p-2"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="mt-2 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
