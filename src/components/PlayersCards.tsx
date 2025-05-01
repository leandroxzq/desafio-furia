/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"

type Player = {
	nick: string
	name: string
	image_url: string
	age: number
	first_name: string
	last_name: string
	nationality: string
}

export default function PlayersCards() {
	const [players, setPlayers] = useState<Player[]>([])

	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				const response = await fetch("/api/players")
				if (!response.ok) throw new Error("Failed to fetch players")
				const data = await response.json()
				setPlayers(data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchPlayers()
	}, [])

	return (
		<div className="flex lg:flex-col gap-2 flex-wrap justify-center">
			{players.map((player) => (
				<CardContainer
					key={player.name}
					className="inter-var max-w-[135px] py-0"
				>
					<CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-gray-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-3 border">
						<CardItem className="absolute opacity-100">
							<CardItem
								translateZ="60"
								className="text-xl font-bold text-neutral-600 dark:text-white"
							>
								{player.name}
							</CardItem>
						</CardItem>
						<CardItem
							translateZ="100"
							className="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center flex-col opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-xl z-100 p-4"
						>
							<CardItem>
								<strong>
									{player.first_name} {player.last_name}
								</strong>
							</CardItem>
							<CardItem>
								<strong>Idade:</strong> {player.age}
							</CardItem>
							<CardItem>
								<strong>País:</strong> {player.nationality}
							</CardItem>
						</CardItem>

						<CardItem
							translateZ="100"
							className="w-full mt-4 flex items-center  justify-center"
						>
							<img
								src={player.image_url}
								width={1000}
								height={1000}
								className="w-full min-w-[100px] object-cover rounded-xl group-hover/card:shadow-xl group-hover/card:brightness-50 transition-all duration-300"
								alt="thumbnail"
							/>
						</CardItem>
					</CardBody>
				</CardContainer>
			))}
		</div>
	)
}
