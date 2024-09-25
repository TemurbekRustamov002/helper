import React, { useState } from 'react'
import './styles/VideoSection.css'

const lessons = [
	{
		id: 1,
		title: 'Introduction to Pentesting',
		videoUrl: 'https://youtu.be/pd-0G0MigUA?si=e7Uha_V4HB7h8gon',
		isCompleted: false,
	},
	{
		id: 2,
		title: 'Setting Up the Environment',
		videoUrl: 'https://www.youtube.com/embed/your-video2',
		isCompleted: false,
	},
	{
		id: 3,
		title: 'Scanning Networks',
		videoUrl: 'https://www.youtube.com/embed/your-video3',
		isCompleted: false,
	},
	{
		id: 4,
		title: 'Exploiting Vulnerabilities',
		videoUrl: 'https://www.youtube.com/embed/your-video4',
		isCompleted: false,
	},
	{
		id: 5,
		title: 'Post-Exploitation',
		videoUrl: 'https://www.youtube.com/embed/your-video5',
		isCompleted: false,
	},
	{
		id: 6,
		title: 'Maintaining Access',
		videoUrl: 'https://www.youtube.com/embed/your-video6',
		isCompleted: false,
	},
	{
		id: 7,
		title: 'Reporting and Documentation',
		videoUrl: 'https://www.youtube.com/embed/your-video7',
		isCompleted: false,
	},
	{
		id: 8,
		title: 'Penetration Testing Tools',
		videoUrl: 'https://www.youtube.com/embed/your-video8',
		isCompleted: false,
	},
	{
		id: 9,
		title: 'Advanced Techniques',
		videoUrl: 'https://www.youtube.com/embed/your-video9',
		isCompleted: false,
	},
	{
		id: 10,
		title: 'Final Assessment',
		videoUrl: 'https://www.youtube.com/embed/your-video10',
		isCompleted: false,
	},
]

const VideoSection = () => {
	const [currentLesson, setCurrentLesson] = useState(lessons[0])
	const [lessonState, setLessonState] = useState(lessons)

	const handleLessonClick = lesson => {
		setCurrentLesson(lesson)
	}

	const handleCheckClick = lessonId => {
		const updatedLessons = lessonState.map(lesson =>
			lesson.id === lessonId
				? { ...lesson, isCompleted: !lesson.isCompleted }
				: lesson
		)
		setLessonState(updatedLessons)
	}

	const completedLessons = lessonState.filter(
		lesson => lesson.isCompleted
	).length
	const completionPercentage = (completedLessons / lessonState.length) * 100

	return (
		<div className='video-tutorials-page'>
			{/* Video qismi */}
			<div className='video-section'>
				<div className='video-box'>
					<iframe
						width='800'
						height='auto'
						src={currentLesson.videoUrl}
						title={currentLesson.title}
						frameBorder='0'
						allow='accelerometer;  clipboard-write; encrypted-media; autoplay: gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>

				{/* Qo'shimcha ma'lumot qismi */}
				<div className='additional-info-section'>
					<h3>Qo'shimcha ma'lumot</h3>
					<p>
						Hozirgi dars: <strong>{currentLesson.title}</strong>.
					</p>
				</div>
			</div>

			{/* Playlist qismi */}
			<div className='playlist-section'>
				<h3>Playlist</h3>
				<div className='progress-bar'>
					<div
						className='progress'
						style={{ width: `${completionPercentage}%` }}
					></div>
				</div>
				<ul className='playlist'>
					{lessonState.map(lesson => (
						<li
							key={lesson.id}
							className={lesson.isCompleted ? 'completed' : ''}
							onClick={() => handleLessonClick(lesson)}
						>
							{lesson.title}
							<input
								type='checkbox'
								checked={lesson.isCompleted}
								onChange={() => handleCheckClick(lesson.id)}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default VideoSection
