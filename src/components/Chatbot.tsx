"use client"

import { useState } from "react"

import { ArrowUp } from "lucide-react"

import Image from "next/image"
import furiaLogo from "../../public/Furia_Esports_logo.png"

const Chatbot = () => {
	const [question, setQuestion] = useState("")
	const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
		[]
	)

	const buttons = [
		{
			text: "Próximo jogo",
			question: "qual próximo jogo da furia?",
		},
		{
			text: "Fallen",
			question: "quem é o fallen?",
		},
		{
			text: "Molodoy",
			question: "quem é o molodoy?",
		},
	]

	const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuestion(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setMessages((prevMessages) => [
			...prevMessages,
			{ sender: "user", text: question },
		])

		setQuestion("")

		try {
			const response = await fetch("/api/chatbot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question }),
			})

			if (!response.ok) {
				throw new Error("Failed to fetch answer")
			}

			const data = await response.json()

			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "bot", text: data.answer },
			])
		} catch (error) {
			console.log(error)
			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "bot", text: "Houve um erro ao processar sua pergunta." },
			])
		}
	}

	return (
		<div className="flex flex-col h-[70vh]  min-w-[100%] md:min-w-[50%] max-w-2xl mx-auto rounded-lg ">
			<h1 className="text-2xl font-semibold p-4 text-center bg-[#292A2D] text-white rounded-t-lg">
				Furiabot
			</h1>

			{/* Área de chat */}
			<div className="flex-1 overflow-auto p-4">
				<div className="space-y-4">
					{messages.map((message, index) => (
						<div
							key={index}
							className={`flex ${
								message.sender === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
									message.sender === "user"
										? "bg-[#292929] text-white"
										: "bg-white"
								}`}
							>
								<div className="flex gap-2 items-center text-sm whitespace-pre-wrap">
									{message.sender !== "user" && (
										<Image className="" src={furiaLogo} width={30} alt="" />
									)}

									{message.text}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Formulário de input */}
			<form
				onSubmit={handleSubmit}
				className="bg-gray-50 p-4 border-t border-gray-200 rounded-3xl"
			>
				<div className="flex gap-2 relative h-25">
					<input
						type="text"
						value={question}
						onChange={handleQuestionChange}
						placeholder="Digite sua pergunta..."
						className="absolute top-0 left-0 flex-1 px-2 py-2 w-full rounded-lg  outline-none transition-all"
					/>

					<ul className="absolute bottom-0 px-2 flex gap-3">
						{buttons.map((button) => (
							<button
								type="button"
								key={button.text}
								className="cursor-pointer"
							>
								<li className="bg-black rounded-2xl px-4 py-2 text-white text-sm">
									{button.text}
								</li>
							</button>
						))}
					</ul>

					<button
						type="submit"
						className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full transition-colors font-medium"
					>
						<ArrowUp />
					</button>
				</div>
			</form>
		</div>
	)
}

export default Chatbot
