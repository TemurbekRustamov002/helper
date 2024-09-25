import React, { useState } from 'react'
import { FaApple, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import './styles/LoginForm.css'

const LoginForm = ({ onLogin }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		const data = await response.json()
		if (data.token) {
			localStorage.setItem('token', data.token)
			onLogin()
		} else {
			alert(data.message)
		}
	}

	return (
		<div className='start-page'>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Parol'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type='submit'>Kirish</button>
				<span className='text-separator'>
					<hr />
					Or <hr />
				</span>
				<div className='other-registers'>
					<ul>
						<li>
							<FcGoogle />
						</li>
						<li>
							<FaGithub />
						</li>
						<li>
							<FaApple />
						</li>
					</ul>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
