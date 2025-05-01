import Load from "@/components/Load"
import PlayCards from "@/components/PlayersCards"
import Chatbot from "@/components/Chatbot"
import Chat from "@/components/Chat"

import Image from "next/image"

export default function Home() {
	return (
		<div className="flex flex-col min-h-dvh w-full relative">
			<header className="w-full flex flex-col md:flex-row justify-center items-center p-4 shadow h-[8vh]">
				<Image
					src="https://furiagg.fbitsstatic.net/sf/img/logo-furia.svg?theme=main&amp;v=202503171541"
					alt="FURIA Logo"
					width={90}
					height={32}
					priority
				/>
				<p>BOT</p>
			</header>
			<main className="flex flex-col pt-4 lg:flex-row h-[92vh] lg:pl-4 lg:pt-0">
				<PlayCards />
				<Chatbot />
				<Chat />
			</main>
			<Load />
		</div>
	)
}
