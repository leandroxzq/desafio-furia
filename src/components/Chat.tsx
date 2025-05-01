"use client"

import { useEffect, useState } from "react"
import {
	collection,
	addDoc,
	query,
	orderBy,
	onSnapshot,
	serverTimestamp,
	doc,
	setDoc,
	getDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

import Image from "next/image"
import furiaLogo from "../../public/Furia_Esports_logo.png"

interface Message {
	id: string
	text: string
	senderId: string
	senderName: string
	timestamp?: string
}

export default function Chat() {
	const [userId, setUserId] = useState("")
	const [name, setName] = useState("Anônimo")
	const [newMessage, setNewMessage] = useState("")
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		let uid = localStorage.getItem("uid")
		if (!uid) {
			uid = crypto.randomUUID()
			localStorage.setItem("uid", uid)
		}
		setUserId(uid)

		const loadUserName = async () => {
			const userRef = doc(db, "users", uid!)
			const userSnap = await getDoc(userRef)
			if (userSnap.exists()) {
				const data = userSnap.data()
				if (data.name) setName(data.name)
			}
		}

		loadUserName()
	}, [])

	const handleNameChange = async (newName: string) => {
		setName(newName)
		if (userId) {
			await setDoc(doc(db, "users", userId), { name: newName })
		}
	}

	useEffect(() => {
		const q = query(collection(db, "messages"), orderBy("timestamp", "asc"))

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setMessages(
				snapshot.docs.map((doc) => {
					const data = doc.data()
					return {
						id: doc.id,
						text: data.text,
						senderId: data.senderId,
						senderName: data.senderName,
						timestamp: data.timestamp,
					} as Message
				})
			)
		})

		return () => unsubscribe()
	}, [])

	const sendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!newMessage.trim()) return

		await addDoc(collection(db, "messages"), {
			text: newMessage,
			senderId: userId,
			senderName: name,
			timestamp: serverTimestamp(),
		})

		setNewMessage("")
	}

	return (
		<div className="flex flex-col p-4 border-l-1 border-l-gray-300 min-h-[100vh] lg:min-h-[92vh]">
			{/* Seção de configuração do nome */}
			<div className="flex items-center mb-4 p-3 rounded-lg">
				<span className="text-sm font-medium text-gray-700 mr-2">
					Nick chat:{" "}
				</span>
				<input
					className="border border-gray-300 px-3 py-2 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none flex-1 transition-all"
					value={name}
					maxLength={10}
					onChange={(e) => handleNameChange(e.target.value)}
				/>
			</div>

			{/* Área de exibição de mensagens */}
			<div className="flex-1 overflow-y-auto rounded-lg mb-4 space-y-3">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className="flex p-3 rounded-lg text-black ml-auto gap-1"
					>
						<Image className="" src={furiaLogo} width={25} alt="" />
						<div className="font-medium text-sm">{msg.senderName}: </div>
						<div className="text-sm">{msg.text}</div>
					</div>
				))}
			</div>

			{/* Formulário de envio de mensagem */}
			<form onSubmit={sendMessage} className="flex gap-2">
				<input
					className="flex-1 border bg-white border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
					value={newMessage}
					maxLength={100}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Envie uma mensagem"
				/>
				<button
					type="submit"
					className="cursor-pointer py-2 px-4 bg-black text-white rounded-2xl transition-colors font-medium"
				>
					Enviar
				</button>
			</form>
		</div>
	)
}
