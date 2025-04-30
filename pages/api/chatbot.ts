import type { NextApiRequest, NextApiResponse } from "next"

import { GoogleGenAI } from "@google/genai"
import {
	getUpcomingMatch,
	getFuriaPlayers,
	player,
} from "../../src/lib/pandascore"

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { question } = req.body

	try {
		const players = await getFuriaPlayers()

		const contextPrompt = `
            Você é um assistente da equipe de CS2 FURIA. Seja mais amigavel, e mande sugestoes

            Lineup atual da FURIA:
            ${players
							.map(
								(p: player) =>
									`- nick: ${p.name} - idade: ${p.age} - pais: ${p.nationality}`
							)
							.join("\n")}

			Te enviei a lineup atual e json processe ele e use esses dados para respostas expecificas
			

            Se a pergunta for sobre o próximo jogo da FURIA, responda exatamente com a frase "FETCH_MATCH".
            Se a pergunta for sobre jogadores, use as informações acima pra complementar mas voce pode buscar por si proprio.

			Não use nenhum tipo de markdown na respostas
						

            Pergunta: ${question}
        `

		const aiResponse = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			contents: [
				{
					role: "user",
					parts: [
						{
							text: contextPrompt,
						},
					],
				},
			],
		})

		const geminiAnswer = aiResponse.text

		if (geminiAnswer?.trim() === "FETCH_MATCH") {
			const matchResponse = await getUpcomingMatch()
			res.status(200).json({ answer: matchResponse })
		} else {
			res.status(200).json({ answer: geminiAnswer })
		}
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ error: "Ocorreu um erro ao processar sua solicitação" })
	}
}
