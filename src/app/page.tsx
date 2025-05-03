import Load from "@/components/Load"
import PlayCards from "@/components/PlayersCards"
import Chatbot from "@/components/Chatbot"
import Chat from "@/components/Chat"
import Header from "@/components/Header"

import { Roboto } from "next/font/google"

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
})

export default function Home() {
	return (
		<div
			className={`flex flex-col min-h-dvh w-full relative ${roboto.className}`}
		>
			<Header />
			<main className="flex flex-col lg:flex-row h-[92vh] lg:pt-0 mx-4 gap-4">
				<PlayCards />
				<Chatbot />
				<Chat />
			</main>
			<Load />
		</div>
	)
}
