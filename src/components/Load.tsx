"use client"

import { useState, useEffect } from "react"
import furiaLogo from "../../public/Furia_Esports_logo.png"
import Image from "next/image"

export default function Logo() {
	const [display, setDisplay] = useState("flex")
	const [scale, setScale] = useState(0)
	const [rotate, setRotate] = useState(-20)
	const [bgColor, setBgColor] = useState("rgba(9, 9, 11, 1)")

	useEffect(() => {
		const enterTimer = setTimeout(() => {
			setScale(1)
			setRotate(0)
		}, 500)

		const positionTimer = setTimeout(() => {
			setScale(0)
			setRotate(540)
			setBgColor("rgba(9, 9, 11, 0)")
		}, 1500)

		const displayTimer = setTimeout(() => {
			setDisplay("none")
		}, 2000)

		return () => {
			clearTimeout(enterTimer)
			clearTimeout(positionTimer)
			clearTimeout(displayTimer)
		}
	}, [])

	return (
		<>
			<div
				className="min-h-dvh w-full flex justify-center items-center fixed top-0 left-0 z-50"
				style={{
					display: display,
					backgroundColor: bgColor,
					transition: "background-color 1s ease",
				}}
			>
				<Image
					src={furiaLogo}
					alt="FURIA Logo"
					style={{
						transform: `scale(${scale}) rotate(${rotate}deg)`,
						filter: "drop-shadow(0px 0px 10px #ffffff65)",
						transition: "all 0.5s",
					}}
				/>
			</div>
		</>
	)
}
