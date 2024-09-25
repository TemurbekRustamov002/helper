import React, { useState } from 'react'
import './styles/Information.css'

const Information = () => {
	const [activeTopic, setActiveTopic] = useState('React.js')

	const topics = {
		'React.js': {
			title: 'React.js haqida Kirish',
			content: `
       React.js foydalanuvchi interfeyslarini yaratish uchun mashhur JavaScript kutubxonasidir. 2011-yilda Facebook tomonidan ishlab chiqilgan React.js dasturchilarga qayta foydalanish mumkin bo‘lgan UI komponentlarini yaratish va o‘z ilovalari holatini samarali va tushunarli tarzda boshqarish imkonini beradi.

React.js ning asosiy afzalliklaridan biri ma'lumotlar o'zgarishi asosida foydalanuvchi interfeysini samarali yangilash qobiliyatidir. React butun sahifani qayta ko‘rsatish o‘rniga, foydalanuvchi interfeysining faqat kerakli qismlarini yangilash uchun virtual DOM (Hujjat obyekti modeli) dan foydalanadi, bu esa unumdorlikni oshirishi va umumiy foydalanuvchi tajribasini tezlashtirishi mumkin.
      `,
		},
		Python: {
			title: 'Python Dasturlashga Kirish',
			content: `
        Python ([ˈpʌɪθ (ə)n] — payton, piton) — turli sohalar uchun yuqori darajadagi umumiy maqsadli dasturlash tili. Uning dizayn falsafasi muhim chekinishdan foydalangan holda kodning oʻqilishiga urgʻu beradi. Uning til konstruksiyalari va obyektga yoʻnaltirilgan yondashuvi dasturchilarga kichik va yirik loyihalar uchun aniq, mantiqiy kod yozishda yordam berishga qaratilgan. Shuningdek Python sunʼiy intellekt hamda maʼlumotlar muhandisiligi sohalarining tili hisoblanadi.

Python deyarli barcha platformalarda ishlay oladi, xususan Windows, Linux, Mac OS X, Palm OS, Mac OS va boshqalar shular jumlasidandir. Python Microsoft.NET platformasi uchun yozilgan realizatsiyasi ham mavjud boʻlib, uning nomi — IronPython dasturlash muhitidir.

Guido van Rossum 1980-yillarning oxirida ABC dasturlash tilining davomchisi sifatida Python ustida ishlay boshladi va birinchi marta 1991-yilda Python 0.9.0 versiyasini ommaga eʼlon qildi.

Python dasturlash tiliga boʻlgan talab yildan yilga oshib bormoqda. CodingDojo portalining tadqiqotlariga koʻra, 2020—2021-yillarda aynan Python tilida dasturlovchi mutaxassislarga eng koʻp talab boʻlgan.
      `,
		},
		OWASP: {
			title: 'OWASP Top 10 haqida Umumiy Tasavvur',
			content: `
        OWASP hamjamiyatiga butun dunyo bo'ylab korporatsiyalar, ta'lim tashkilotlari va shaxslar kiradi. Hamjamiyat bepul mavjud bo'lgan maqolalar, o'quv qo'llanmalar, hujjatlar, vositalar va texnologiyalar yaratish ustida ishlaydi.

OWASP jamg'armasi OWASP loyihalari va infratuzilmasini qo'llab-quvvatlash va boshqarishni ta'minlaydigan 501(c)(3) xayriya tashkilotidir. Bundan tashqari, Fond 2011 yilning iyun oyidan buyon Yevropada notijorat tashkilot sifatida ro‘yxatdan o‘tgan.

OWASP hech qanday texnologiya kompaniyasi bilan bog'liq emas, lekin u xavfsizlik texnologiyasidan oqilona foydalanishni qo'llab-quvvatlaydi. Loyiha aloqadorlikdan qochadi, chunki u boshqa tashkilotlarning ta'siridan ozod bo'lish dastur xavfsizligi haqida xolis, foydali va arzon ma'lumotlarni tarqatishni osonlashtirishi mumkin, deb hisoblaydi.

OWASP hamjamiyat a'zolari inson omillari va texnologiyalarni hisobga olgan holda ilovalarni xavfsizroq qiladi.

OWASP tomonidan chop etilgan eng mashhur hujjatlarga OWASP qo'llanmasi[1], OWASP kodini ko'rib chiqish bo'yicha qo'llanma[2] va keng tarqalgan OWASP Top 10 loyihasi[3] kiradi.

Eng keng tarqalgan OWASP vositalari bu ta'lim tizimi[4], WebScarab proksi-analizatori[5] va .NET vositalari[6]. OWASP butun dunyo bo'ylab joylashgan 190 ga yaqin mahalliy bo'limlardan[7] va loyihaning pochta ro'yxatlaridagi minglab a'zolardan iborat.

OWASP ilovalar xavfsizligi hamjamiyatini yanada rivojlantirish uchun AppSec[8] konferentsiya seriyasini tashkil qildi.

OWASP standartlarni yaratadi, ulardan birinchisi OWASP Application Security Verification Standard (ASVS) nomi bilan nashr etilgan.[9] OWASP ASVS ning asosiy maqsadi bozorda mavjud bo'lgan xavfsizlik dasturlari ko'lami va qat'iylik darajasini standartlashtirishdir. OWASP ASVS ning maqsadi ixtisoslashgan veb-texnologiyalar uchun mo'ljallangan tijorat muvaffaqiyatli ochiq standartlar to'plamini yaratish edi. Veb-ilovalar to'plami allaqachon nashr etilgan. Ishlab chiqilayotgan veb-xizmatlar uchun to'plam.
      `,
		},
	}

	return (
		<section id='information' className='information'>
			<h2>Ommabop Texnologiyalar Haqida O'rganing</h2>
			<div className='info-buttons'>
				{Object.keys(topics).map(topic => (
					<button
						key={topic}
						className={activeTopic === topic ? 'active' : ''}
						onClick={() => setActiveTopic(topic)}
					>
						{topic}
					</button>
				))}
			</div>

			<div className='info-content'>
				<h3>{topics[activeTopic].title}</h3>
				<p dangerouslySetInnerHTML={{ __html: topics[activeTopic].content }} />
			</div>
		</section>
	)
}

export default Information
