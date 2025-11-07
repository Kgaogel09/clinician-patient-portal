'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Stethoscope, SquarePen, Trash2 } from 'lucide-react';
import { ChatMessage, Chats } from '@/types/types';
import { useAuth } from '@/context/auth';
import { suggestions } from '@/data/data';

const CHAT_STORAGE_KEY = 'chat-histories';

export default function Chat() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [chatId, setChatId] = useState<string>('');
	const [userChats, setUserChats] = useState<Chats[]>([]);
	const { userProfile } = useAuth();

	const [placeholder, setPlaceholder] = useState("Ask about your health concerns...");


	useEffect(() => {
		let index = 0;

		const changePlaceholder = () => {

			setTimeout(() => {
				index = (index + 1) % suggestions.length;
				setPlaceholder(suggestions[index]);

			}, 5000);
		};

		const interval = setInterval(changePlaceholder, 5000);

		return () => clearInterval(interval);
	}, []);


	useEffect(() => {
		if (userProfile?.uid) {
			loadUserChats();
		}
	}, [userProfile]);

	const loadUserChats = useCallback(() => {
		if (!userProfile?.uid) return;

		try {
			const stored = localStorage.getItem(CHAT_STORAGE_KEY);
			const allChats: Chats[] = stored ? JSON.parse(stored) : [];

			const userChats = allChats.filter(chat => chat.userId === userProfile.uid);
			setUserChats(userChats);
		} catch (error) {
			console.error('Error loading chats from local storage:', error);
		}
	}, [userProfile?.uid]);


	const saveChat = useCallback((messages: ChatMessage[], chatId?: string) => {
		if (!userProfile?.uid || messages.length === 0) return;

		const chatTitle = messages[0]?.content?.slice(0, 50) + (messages[0]?.content?.length > 50 ? '...' : '') || 'New Chat';
		const newChatId = chatId || Date.now().toString();

		const chatData: Chats = {
			id: newChatId,
			userId: userProfile.uid,
			title: chatTitle,
			messages: messages,
			lastUpdated: new Date(),
		};

		try {
			const stored = localStorage.getItem(CHAT_STORAGE_KEY);
			const allChats: Chats[] = stored ? JSON.parse(stored) : [];

			const filteredChats = allChats.filter(chat => chat.id !== newChatId);

			const updatedChats = [...filteredChats, chatData];
			localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedChats));

			setChatId(newChatId);
			loadUserChats();
		} catch (error) {
			console.error('Error saving chat to local storage:', error);
		}
	}, [userProfile?.uid, loadUserChats]);

	const loadChat = useCallback((chatId: string) => {
		if (!userProfile?.uid) return;

		try {
			const stored = localStorage.getItem(CHAT_STORAGE_KEY);
			const allChats: Chats[] = stored ? JSON.parse(stored) : [];

			const chat = allChats.find(c => c.id === chatId && c.userId === userProfile.uid);
			if (chat) {
				setMessages(chat.messages);
				setChatId(chat.id);
			}
		} catch (error) {
			console.error('Error loading chat from local storage:', error);
		}
	}, [userProfile?.uid]);

	// Delete a specific chat
	const deleteChat = useCallback((chatId: string, e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent triggering loadChat

		if (!userProfile?.uid) return;

		try {
			const stored = localStorage.getItem(CHAT_STORAGE_KEY);
			const allChats: Chats[] = stored ? JSON.parse(stored) : [];

			const updatedChats = allChats.filter(chat => !(chat.id === chatId && chat.userId === userProfile.uid));
			localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedChats));

			if (chatId === chatId) {
				setMessages([]);
				setChatId('');
			}

			loadUserChats();
		} catch (error) {
			console.error('Error deleting chat from local storage:', error);
		}
	}, [userProfile?.uid, loadUserChats]);


	const clearMessages = useCallback(() => {
		if (!userProfile?.uid) return;

		setMessages([]);
		setInput('');
		setChatId('');
	}, [userProfile?.uid]);

	const handleSubmit = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			role: 'user',
			content: input.trim(),
			timestamp: new Date(),
		};

		const updatedMessages = [...messages, userMessage];
		setMessages(prev => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/ai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: input.trim(), userRole: userProfile?.role }),
			});

			if (!response.ok) throw new Error('Failed to get response');

			const data = await response.json();

			const assistantMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: data.response,
				timestamp: new Date(),
			};

			const finalMessages = [...updatedMessages, assistantMessage];
			setMessages(finalMessages);

			// Save the complete conversation
			saveChat(finalMessages, chatId);
		} catch (error) {
			const errorMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: 'Sorry, I encountered an error. Please try again.',
				timestamp: new Date(),
			};

			console.error("Encountered an error:", error);

			const finalMessages = [...updatedMessages, errorMessage];
			setMessages(finalMessages);

			saveChat(finalMessages, chatId);
		} finally {
			setIsLoading(false);
		}
	}, [chatId, input, isLoading, messages, saveChat, userProfile]);


	return (
		<div className="container flex w-full mx-auto p-4 mt-8">
			<div className='w-1/5 py-5 px-4 border-r border-slate-200 flex flex-col gap-6'>
				<Button onClick={clearMessages}
					variant='ghost' size='icon' className='text-base justify-normal cursor-pointer text-gray-600 ' aria-label='new-chat'>
					<SquarePen className="h-3 w-3" /> New chat
				</Button>

				<div className="space-y-1  overflow-y-auto">
					<p className='font-semibold text-gray-900 mb-2'>Chats</p>
					{userChats.length === 0 ? (
						<p className="text-sm text-gray-600 py-2">No previous chats</p>
					) : (
						userChats.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).map((chat) => (
							<div
								key={chat.id}
								className={`flex items-center justify-between p-1 capitalize rounded-lg cursor-pointer hover:bg-gray-100 ${chat.id === chatId ? 'bg-blue-50' : ''
									}`}
								onClick={() => loadChat(chat.id)}
							>
								<span className="text-sm truncate flex-1">{chat.title}</span>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 text-gray-600"
									onClick={(e) => deleteChat(chat.id, e)}
								>
									<Trash2 className="h-3 w-3 text-red-600" />
								</Button>
							</div>
						))
					)}
				</div>
			</div>
			<Card className="flex-1/2 mx-auto border-0 shadow-none">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Bot className="h-6 w-6" />
						AI Assistant
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-135 overflow-y-auto p-6 space-y-4">
						{messages.length > 0 && (
							messages.map((message) => (
								<div
									key={message.id}
									className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
										}`}
								>
									<div
										className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${message.role === 'user'
											? 'bg-primary text-primary-foreground'
											: 'bg-muted'
											}`}
									>
										{message.role === 'user' ? (
											userProfile?.role === 'patient' ? (<User className="h-4 w-4" />) : (<Stethoscope className="h-4 w-4" />)
										) : (
											<Bot className="h-4 w-4" />
										)}
									</div>
									<div
										className={`rounded-xl px-4 py-2 max-w-[80%] ${message.role === 'user'
											? 'bg-slate-100 text-gray-900'
											: 'bg-muted'
											}`}
									>
										<p className="text-sm">{message.content}</p>
									</div>
								</div>
							))
						)}
						{isLoading && (
							<div className="flex gap-3">
								<div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-muted">
									<Bot className="h-4 w-4" />
								</div>
								<div className="rounded-lg px-4 py-2 bg-muted">
									<div className="flex gap-1">
										<div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
										<div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
										<div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
									</div>
								</div>
							</div>
						)}
					</div>
					{messages.length === 0 && <div>
						<p className='text-center text-gray-600 font-medium text-xl'>How can I help you today?</p>
					</div>}

					<form onSubmit={handleSubmit} className="p-6">
						<div className="input-wrapper relative">
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder={placeholder}
								disabled={isLoading}
								className="flex-1 border-slate-100 focus-visible:ring-2 focus-visible:ring-gray-300 rounded-full p-8 placeholder:text-base placeholder:font-normal placeholder:transition-all placeholder:duration-500 placeholder:ease-in-out"
							/>
							<Button
								type="submit"
								disabled={isLoading || !input.trim()}
								className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
							>
								<Send />
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}