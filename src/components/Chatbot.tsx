"use client"

import { useState, useRef, useEffect } from "react"

import { ArrowUp } from "lucide-react"

import Image from "next/image"
import furiaLogo from "../../public/Furia_Esports_logo.png"

const Chatbot = () => {
	const endRef = useRef<HTMLDivElement>(null)

	const [question, setQuestion] = useState("")
	const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
		[]
	)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		if (window.innerWidth <= 768) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}

		if (!isMobile && messages.length > 0) {
			endRef.current?.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages, isMobile])

	const buttons = [
		{
			text: "Próximo jogo",
			question: "Qual próximo jogo da furia?",
		},
		{
			text: "Último resultado",
			question: "Qual foi o último resultado da furia?",
		},
		{
			text: "Fallen",
			question: "Quem é o fallen?",
		},
		{
			text: "Molodoy",
			question: "Quem é o molodoy?",
		},
		{
			text: "Lineup",
			question: "Qual é a lineup?",
		},
	]

	const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuestion(e.target.value)
	}

	const handleQuestion = (questionText: string) => {
		handleSubmit(undefined, questionText)
	}

	const handleSubmit = async (
		e?: React.FormEvent,
		overrideQuestion?: string
	) => {
		if (e) e.preventDefault()

		const finalQuestion = overrideQuestion ?? question

		if (finalQuestion.trim() === "") return

		setMessages((prevMessages) => [
			...prevMessages,
			{ sender: "user", text: finalQuestion },
		])

		if (!overrideQuestion) setQuestion("")

		try {
			const response = await fetch("/api/chatbot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question: finalQuestion }),
			})

			if (!response.ok) throw new Error("Failed to fetch answer")

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
		<div className="flex flex-col rounded-lg px-4 py-8 min-h-[50vh] max-h-[100vh] w-[100%] lg:w-[80%] border-1 border-gray-300 lg:border-0">
			{/* Área de chat */}
			<div
				className="flex-1 p-4  overflow-y-auto
				[&::-webkit-scrollbar]:w-0
				[&::-webkit-scrollbar]:h-0
				[&::-webkit-scrollbar-track]:bg-transparent
				[&::-webkit-scrollbar-thumb]:bg-transparent"
			>
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
										? "bg-[#292929] border-2 border-stone-200 text-white"
										: "bg-gray-50 border-2 border-gray-200"
								}`}
							>
								<div className="flex gap-2 items-center text-sm whitespace-pre-wrap">
									{message.sender !== "user" && (
										<Image
											className="self-start"
											src={furiaLogo}
											width={30}
											alt=""
										/>
									)}

									{message.text}
								</div>
							</div>
						</div>
					))}
					<div ref={endRef}></div>
				</div>
			</div>

			{/* Formulário de input */}
			<form
				onSubmit={handleSubmit}
				className="bg-gray-50 p-4 border-2 border-gray-200 rounded-3xl"
			>
				<div className="flex gap-2 relative h-10 lg:h-25">
					<input
						type="text"
						value={question}
						onChange={handleQuestionChange}
						placeholder="Digite sua pergunta..."
						className="absolute top-0 left-0 flex-1 px-2 py-2 w-full rounded-lg  outline-none transition-all"
					/>

					<ul className="absolute bottom-0 px-2 lg:flex gap-3 hidden">
						{buttons.map((button) => (
							<li
								key={button.text}
								className="bg-black rounded-2xl px-4 py-2 text-white text-sm shadow cursor-pointer"
								onClick={() => handleQuestion(button.question)}
							>
								{button.text}
							</li>
						))}
					</ul>

					<button
						onClick={handleSubmit}
						type="submit"
						className="absolute cursor-pointer bottom-0 right-0 p-2 bg-black text-white rounded-full transition-colors font-medium"
					>
						<ArrowUp />
					</button>
				</div>
			</form>
		</div>
	)
}

export default Chatbot
