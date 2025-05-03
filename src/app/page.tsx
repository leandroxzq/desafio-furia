import Load from "@/components/Load"
import PlayCards from "@/components/PlayersCards"
import Chatbot from "@/components/Chatbot"
import Chat from "@/components/Chat"

import Image from "next/image"

import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
})

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
			<header className="w-full flex flex-col md:flex-row justify-center items-center shadow h-[8vh]">
				<h1
					className={`flex items-center font-extrabold text-2xl ${bebas.className}`}
				>
					<Image
						src="https://furiagg.fbitsstatic.net/sf/img/logo-furia.svg?theme=main&amp;v=202503171541"
						alt="FURIA Logo"
						width={90}
						height={32}
						priority
					/>
					<p>BOT</p>
				</h1>
			</header>
			<main className="flex flex-col lg:flex-row h-[92vh] lg:pt-0 mx-4 gap-4">
				<PlayCards />
				<Chatbot />
				<Chat />
			</main>
			<Load />
		</div>
	)
}
