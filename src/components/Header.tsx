"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
})

export default function Header() {
	const router = useRouter()

	const handleLogoClick = () => {
		router.refresh()
	}

	return (
		<header className="w-full flex flex-col md:flex-row justify-center items-center shadow h-[8vh]">
			<h1
				className={`flex items-center font-extrabold text-2xl cursor-pointer ${bebas.className}`}
				onClick={handleLogoClick}
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
	)
}
