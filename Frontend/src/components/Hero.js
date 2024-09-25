import React from 'react'
import { FaPython, FaReact } from 'react-icons/fa'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { IoArrowForward } from 'react-icons/io5'
import { SiKalilinux } from 'react-icons/si'
import { Link } from 'react-router-dom'
import osintImage from '../assets/osint2.jpg'
import './styles/Hero.css'

const Hero = () => {
	return (
		<div className='hero-container'>
			<div className='hero-header'>
				<div className='logo'>
					<div className='hero-title'>
						<h1>Pentester Helper</h1>
						<p>An Open-Source Website for Pentesters</p>
					</div>
				</div>
			</div>

			{/* Main Video Tutorial Section */}
			<div className='hero-main-section'>
				<div className='hero-video'>
					<div className='video-tutorials-grid'>
						<div className='video-box'>
							<iframe
								width='560'
								height='315'
								src='https://www.youtube.com/embed/YTGpPwRUbZE?si=tgI0nrjcFn0gLxAG'
								title='YouTube video player'
								frameborder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								referrerpolicy='strict-origin-when-cross-origin'
								allowfullscreen
							></iframe>
							<Link to='/tutorials'>
								Video Tutorials{' '}
								<HiArrowTopRightOnSquare className='info-icon' />
							</Link>
						</div>
					</div>
				</div>

				{/* Information Section */}
				<div className='hero-info'>
					<div className='info-grid'>
						<Link to='https://react.dev/'>
							<FaReact className='info-icon' />
						</Link>
						<Link to='https://www.python.org/'>
							<FaPython className='info-icon' />
						</Link>
						<Link to='https://www.kali.org/'>
							<SiKalilinux className='info-icon' />
						</Link>
					</div>
				</div>

				{/* Projects Section */}
				<div className='hero-projects'>
					<div className='projects-grid'>
						<div className='project-box'>
							<img src={osintImage} />
							<Link to='/projects'>
								OSINT <IoArrowForward />
							</Link>
						</div>
						<div className='project-box'>
							<img
								src='https://c4.wallpaperflare.com/wallpaper/874/76/30/dragon-backtrack-kali-linux-penetration-testing-wallpaper-preview.jpg'
								alt='Project'
							/>
							<Link to='/attackpage'>
								Attack <IoArrowForward />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
