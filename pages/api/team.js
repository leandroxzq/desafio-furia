import axios from "axios"

export default async function handler(req, res) {
	try {
		const API_KEY = "JiwEgpOO-mFMwTAaKvnXJMaZNDYQU8F1dS4AZOnzhC_d1sUL3D0"

		const api = axios.create({
			baseURL: "https://api.pandascore.co",
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
		})

		const response = await api.get("/csgo/teams?search[slug]=Vitality")

		const data = response.data

		res.status(200).json(data)
	} catch (error) {
		console.error("Erro ao buscar dados da FURIA:", error)
		throw error
	}
}
