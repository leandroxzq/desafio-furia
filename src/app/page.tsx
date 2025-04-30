import Load from "@/components/Load"
import PlayCards from "@/components/PlayersCards"
import Chatbot from "@/components/Chatbot"
import Chat from "@/components/Chat"

import furiaLogo from "../../public/Furia_Esports_logo.png"
import Image from "next/image"

export default function Home() {
	return (
		<div className="flex flex-col min-h-dvh w-full relative bg-[#09090b]">
			<header className="w-full flex flex-col md:flex-row justify-around items-center gap-4 p-4 shadow min-h-[20dvh]">
				<Image
					src={furiaLogo}
					alt="FURIA Logo"
					width={50}
					height={50}
					priority
				/>
				<PlayCards />
			</header>
			<main className="flex flex-col items-center justify-center min-h-[70dvh] p-6 gap-4 md:flex-row">
				<Chatbot />
				<Chat />
			</main>
			<Load />
		</div>
	)
}
