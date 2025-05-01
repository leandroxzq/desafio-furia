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
			Você é um assistente amigável da equipe de CS2 FURIA.

			Aqui estão os jogadores da lineup atual:
			${players
				.map((p: player) => `- ${p.name}, ${p.age} anos, ${p.nationality}`)
				.join("\n")}

			Instruções:
			- Quando a pergunta for sobre o próximo jogo da FURIA, responda apenas com a palavra-chave: FETCH_MATCH.
			- Se a pergunta for sobre um jogador (ex: Fallen), utilize os dados fornecidos.
			- Seja direto, informal e simpático com o usuário.
			- NUNCA use markdown.

			Pergunta do usuário: """${question}"""
			Responda com a melhor resposta possível ou FETCH_MATCH se for o caso.
			`

		const aiResponse = await ai.models.generateContent({
			model: "gemini-2.5-flash-preview-04-17",
			contents: [{ role: "user", parts: [{ text: contextPrompt }] }],
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
