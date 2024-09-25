import React, { useState } from 'react'
import './styles/AttackPage.css'

// Himoya darajasi tanlash komponenti
const SecurityLevel = ({ onLevelChange }) => (
	<div className='security-level'>
		<label htmlFor='level'>Himoya darajasini tanlang:</label>
		<select id='level' onChange={onLevelChange}>
			<option value='low'>Quyi</option>
			<option value='medium'>O'rta</option>
			<option value='high'>Yuqori</option>
		</select>
	</div>
)

// Hujumchi oynasi
const AttackBox = () => {
	const [response, setResponse] = useState('')

	const handleAttack = () => {
		// Flask backendga so'rov yuborish
		fetch('/api/attack', { method: 'POST' })
			.then(res => res.json())
			.then(data => setResponse(data.message))
	}

	return (
		<div className='attack-box'>
			<h2>Hujumchi oynasi</h2>
			<div className='form-row-item'>
				<div className='form-item'>
					<label htmlFor='select'>Select Option</label>
					<select name='select' id='select'>
						<option value='val1'>Value</option>
						<option value='val1'>Value</option>
						<option value='val1'>Value</option>
					</select>
				</div>
				<div className='form-item'>
					<label htmlFor='name'>Nomi</label>
					<input type='text' name='name' id='name' />
				</div>
			</div>
			<textarea placeholder='Hujumingizni kiriting' rows='4' />
			<button onClick={handleAttack}>Send</button>
			<p>{response}</p>
		</div>
	)
}

// Kod manbasi tugmasi
const CodeSource = () => {
	const [codeVisible, setCodeVisible] = useState(false)

	const handleToggleCode = () => setCodeVisible(!codeVisible)

	return (
		<div className='code-source'>
			<button onClick={handleToggleCode}>Kod manbasi</button>
			{codeVisible && (
				<pre>
					{`def protect():
      # Himoya kodi
      pass`}
				</pre>
			)}
		</div>
	)
}

// Asosiy sahifa
const AttackPage = () => {
	const handleLevelChange = event => {
		console.log('Tanlangan daraja: ', event.target.value)
	}

	return (
		<div className='main-page'>
			<div className='content'>
				<SecurityLevel onLevelChange={handleLevelChange} />
				<div className='form-container'>
					<AttackBox />
					<CodeSource />
				</div>
			</div>
		</div>
	)
}

export default AttackPage
