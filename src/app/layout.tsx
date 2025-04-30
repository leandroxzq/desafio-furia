import "./globals.css"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body cz-shortcut-listen="true" className={`antialiased`}>
				{children}
			</body>
		</html>
	)
}
