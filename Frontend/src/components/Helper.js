// src/App.js

import React, { useState } from 'react'
import './styles/Helper.css'

function App() {
	const [url, setUrl] = useState('')
	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleCheck = async () => {
		setLoading(true)
		setResult(null)
		try {
			const response = await fetch('http://127.0.0.1:5000/api/check', {
				// Use server's public IP
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url }),
			})
			const data = await response.json()
			setResult(data.result)
		} catch (error) {
			console.error('Xato yuz berdi:', error)
			setResult({ message: 'Saytni tekshirishda xatolik yuz berdi.' })
		} finally {
			setLoading(false)
		}
	}

	const renderResult = () => {
		if (!result) return null

		return (
			<div className='result'>
				<h2>Tekshiruv natijalari</h2>
				<p>
					<strong>URL:</strong> {result.url}
				</p>
				<p>
					<strong>Status:</strong> {result.status}
				</p>
				{result.dns_info && result.dns_info.error ? (
					<div>
						<h3>DNS xatosi:</h3>
						<p>{result.dns_info.error}</p>
					</div>
				) : (
					result.dns_info && (
						<div>
							<h3>DNS ma'lumotlari:</h3>
							<pre>{JSON.stringify(result.dns_info, null, 2)}</pre>
						</div>
					)
				)}
				{result.whois_info && (
					<div>
						<h3>WHOIS ma'lumotlari:</h3>
						<pre>{JSON.stringify(result.whois_info, null, 2)}</pre>
					</div>
				)}
				{result.ssl_info && result.ssl_info.error ? (
					<div>
						<h3>SSL xatosi:</h3>
						<p>{result.ssl_info.error}</p>
					</div>
				) : (
					result.ssl_info && (
						<div>
							<h3>SSL ma'lumotlari:</h3>
							<pre>{JSON.stringify(result.ssl_info, null, 2)}</pre>
						</div>
					)
				)}
				{result.subdomains && (
					<div>
						<h3>Subdomainlar:</h3>
						<pre>{JSON.stringify(result.subdomains, null, 2)}</pre>
					</div>
				)}
				{result.open_ports && (
					<div>
						<h3>Ochiq portlar va xizmatlar:</h3>
						<pre>{JSON.stringify(result.open_ports, null, 2)}</pre>
					</div>
				)}
				{result.vulnerabilities && result.vulnerabilities.error ? (
					<div>
						<h3>Zaiflik xatosi:</h3>
						<p>{result.vulnerabilities.error}</p>
					</div>
				) : (
					result.vulnerabilities && (
						<div>
							<h3>Zaifliklar:</h3>
							<pre>{JSON.stringify(result.vulnerabilities, null, 2)}</pre>
						</div>
					)
				)}
				{result.blacklist_info && result.blacklist_info.errors ? (
					<div>
						<h3>Qora ro'yxat xatosi:</h3>
						<p>{result.blacklist_info.errors[0].detail}</p>
					</div>
				) : (
					result.blacklist_info && (
						<div>
							<h3>Qora ro'yxat ma'lumotlari:</h3>
							<pre>{JSON.stringify(result.blacklist_info, null, 2)}</pre>
						</div>
					)
				)}
			</div>
		)
	}

	return (
		<div className='App'>
			<h1>Pentester Yordamchi Sayti</h1>
			<div className='row-item form-item'>
				<input
					type='text'
					placeholder='Sayt manzilini kiriting'
					value={url}
					onChange={e => setUrl(e.target.value)}
				/>
				<button
					className='helper-btn'
					onClick={handleCheck}
					disabled={loading || !url}
				>
					{loading ? 'Tekshirilmoqda...' : 'Tekshirish'}
				</button>
			</div>
			{loading && <p>Yuklanmoqda...</p>}
			{renderResult()}
		</div>
	)
}

export default App
