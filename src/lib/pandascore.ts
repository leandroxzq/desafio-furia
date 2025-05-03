import axios from "axios"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

const api = axios.create({
	baseURL: "https://api.pandascore.co",
	headers: {
		Authorization: `Bearer ${process.env.PANDA_SCORE_KEY}`,
	},
})

interface matchResult {
	team_id: number
	score: number
}

interface matchOpponent {
	opponent: {
		id: number
		name: string
	}
}

interface upcoming {
	opponent: {
		name: string
	}
}

export interface player {
	active: boolean
	id: number
	name: string
	role: string
	slug: string
	modified_at: Date
	birthday: string
	first_name: string
	last_name: string
	nationality: string
	age: number
	image_url: string
}

export async function getFuriaPlayers() {
	const api = axios.create({
		baseURL: "https://api.pandascore.co",
		headers: {
			Authorization: `Bearer ${process.env.PANDA_SCORE_KEY}`,
		},
	})

	const idsRemover = [23618, 17729, 36730]

	const response = await api.get("/csgo/teams?search[slug]=furia")
	const furia = response.data.find((team: player) => team.id === 124530)

	if (!furia) throw new Error("Time FURIA não encontrado.")

	const jogadoresFiltrados = furia.players.filter(
		(player: player) => !idsRemover.includes(player.id)
	)

	const final = jogadoresFiltrados.map((player: player) => {
		if (player.name === "FalleN") {
			player.image_url =
				"https://img-cdn.hltv.org/playerbodyshot/Wf26SO_o8nvnsLh0AqZXc5.png?ixlib=java-2.1.0&w=400&s=36b7189a4ae7b020d0acb087fd44777a"
		}
		if (player.name === "YEKINDAR") {
			player.image_url =
				"https://img-cdn.hltv.org/playerbodyshot/rRclDPBXIMxFv2fv0dV0J0.png?ixlib=java-2.1.0&w=400&s=2b0f6209ca40efa081852b9d1d8e01c1"
		}
		if (player.name === "yuurih") {
			player.image_url =
				"https://img-cdn.hltv.org/playerbodyshot/i6UGhkYxrhutAOmWZT0-8O.png?ixlib=java-2.1.0&w=400&s=2cd696f6ff4baf5680a43d537214b6eb"
		}
		if (player.name === "KSCERATO") {
			player.image_url =
				"https://img-cdn.hltv.org/playerbodyshot/U6t0j2bJDKUR3mTI8rIqv7.png?ixlib=java-2.1.0&w=400&s=b5257c378b8122f415f21985855e95ca"
		}
		if (player.name === "molodoy") {
			player.image_url =
				"https://img-cdn.hltv.org/playerbodyshot/qNyAd_xVHTTmbCAKPx-jPk.png?ixlib=java-2.1.0&w=400&s=b128ede878e462107c70590202b14139"
		}
		return player
	})

	return final
}

export const getUpcomingMatch = async () => {
	try {
		const response = await api.get("/csgo/matches/upcoming", {
			params: {
				"filter[opponent_id]": 124530,
				"filter[future]": true,
				"filter[opponents_filled]": true,
				per_page: 1,
			},
		})

		if (response.data.length === 0) {
			return "Nenhum jogo agendado."
		}

		const match = response.data[0]

		const teams = match.opponents
			.map((o: upcoming) => o.opponent.name)
			.join(" vs ")

		const formatedDate = format(match.begin_at, "PPPP", {
			locale: ptBR,
		})

		return `O próximo jogo é ${teams}. ${formatedDate} pela liga ${match.league.name}.`
	} catch (error) {
		console.error("Erro ao obter jogo:", error)
		return "Desculpe, não consegui obter os detalhes do próximo jogo."
	}
}

export const getLastMatchResult = async () => {
	try {
		const response = await api.get("/csgo/matches/past", {
			params: {
				"filter[opponent_id]": 124530,
				sort: "-begin_at",
				"filter[finished]": true,
				"filter[opponents_filled]": true,
				per_page: 1,
			},
		})

		if (response.data.length === 0) {
			return "Nenhuma partida anterior encontrada."
		}

		const match = response.data[0]

		const teams = match.opponents
			.map((o: matchOpponent) => o.opponent.name)
			.join(" vs ")

		const formatedDate = format(match.begin_at, "PPPP", { locale: ptBR })

		const result = match.results.find(
			(res: matchResult) => res.team_id === 124530
		)

		const furiaScore = result?.score ?? "N/D"

		const opponentResult = match.results.find(
			(res: matchResult) => res.team_id !== 124530
		)
		const opponentScore = opponentResult?.score ?? "N/D"

		const venceu = furiaScore > opponentScore

		return `A última partida foi ${teams}. ${formatedDate}. Resultado: ${furiaScore} x ${opponentScore} — FURIA ${
			venceu ? "venceu" : "perdeu"
		}.`
	} catch (error) {
		console.error("Erro ao obter resultado da última partida:", error)
		return "Desculpe, não consegui obter o resultado da última partida."
	}
}
