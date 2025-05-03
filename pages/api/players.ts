import type { NextApiRequest, NextApiResponse } from "next"

import { getFuriaPlayers } from "@/lib/pandascore"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const players = await getFuriaPlayers()
		res.status(200).json(players)
	} catch (error) {
		console.error("Erro ao buscar lineup da FURIA:", error)
		throw error
	}
}
