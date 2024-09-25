import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import './styles/Navbar.css'

const Navbar = () => {
	const location = useLocation()
	console.log(location)
	return (
		<nav className='navbar'>
			<div className='logo'>
				<Link to={'/'}>
					<img src={logo} alt='logo' style={{ width: '250px' }} />
				</Link>
			</div>
			<ul className='nav-links'>
				<li>
					<Link
						style={
							location.pathname === '/'
								? { color: '#66ff99 ' }
								: { color: '#fff' }
						}
						to='/'
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						style={
							location.pathname === '/tutorials'
								? { color: '#66ff99 ' }
								: { color: '#fff' }
						}
						to='/tutorials'
					>
						Video Tutorials
					</Link>
				</li>
				<li>
					<Link
						style={
							location.pathname === '/information'
								? { color: '#66ff99 ' }
								: { color: '#fff' }
						}
						to='/information'
					>
						Information
					</Link>
				</li>
				<li>
					<Link
						style={
							location.pathname === '/projects'
								? { color: '#66ff99 ' }
								: { color: '#fff' }
						}
						to='/projects'
					>
						OSINT
					</Link>
				</li>
				<li>
					<Link
						style={
							location.pathname === '/attackpage'
								? { color: '#66ff99 ' }
								: { color: '#fff' }
						}
						to='/attackpage'
					>
						Attack
					</Link>
				</li>
				<li>
					<button className='btn-i-primary'>
						<Link to='/registerform'>SignUp</Link>
					</button>
				</li>
				<li>
					<button className='btn-i-primary'>
						<Link to='/loginform'>LogIn</Link>
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
