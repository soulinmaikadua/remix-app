import React, { useState, useEffect } from 'react'
import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { connectToDatabase } from '~/utils/db.server'
import { Song } from '~/models/Song'
// eslint-disable-next-line import/no-unresolved
// Lazy load the RichTextEditor only in the browser
const RichTextEditor = React.lazy(() => import('~/components/RichTextEditor'))
function toKebabCase(input: string): string {
	return input
		.toLowerCase() // Convert to lowercase
		.replace(/[^a-z0-9\s]/g, '') // Remove special characters
		.trim() // Remove leading/trailing whitespace
		.replace(/\s+/g, '-') // Replace spaces with hyphens
}

// Action function to handle form submissions (server-side logic)
export const action: ActionFunction = async ({ request }) => {
	await connectToDatabase()

	const formData = await request.formData()
	const title = formData.get('title') as string
	const writer = formData.get('writer') as string
	const singer = formData.get('singer') as string
	const genre = formData.get('genre') as string
	const posted_by = formData.get('posted_by') as string
	// const content = formData.get('content') as string
	const url = toKebabCase(singer + ' ' + title)
	const myBody = `<p>Thaum kuv thaum kuv tseem yog koj tus&nbsp;</p>
<p>Koj ntsia koj ntsia kuv tsis tsim nuj</p>
<p>Thaum kuv thaum kuv tseem yog koj li</p>
<p>Koj ntsia koj ntsia kuv tsis tsim nqi</p>
<p>Thaum kuv thaum kuv tseem mloog koj lus</p>
<p>Koj ntsia koj ntsia kuv no tsau ntuj</p>
<p>Koj ntsia koj ntsia kuv no ntxim ntxub</p>
<p>&nbsp;</p>
<p>Thaum kuv thaum kuv tseem nyob koj tes</p>
<p>Koj ntsia koj ntsia kuv no khaum kev</p>
<p>Thaum kuv thaum kuv tseem nyob koj chaw</p>
<p>Koj ntsia koj ntsia kuv no dawm taw</p>
<p>Thaum kuv thaum kuv tseem yog koj li</p>
<p>Koj ntsia koj ntsia kuv no qis qis</p>
<p>Koj ntsia koj ntsia kuv no yooj yim</p>
<p>&nbsp;</p>
<p>Hnub no koj mam nco rov khuv xim</p>
<p>Hnub no ces kuv twb ciaj luag li</p>
<p>Hnub no koj mam ntsia kuv muaj nqi</p>
<p>Tiam sis hnub no ces nws twb lig</p>
<p>Los lus thov txim koj hais tawm los</p>
<p>Nyob rau hnub no nws siv tsis tau lawm mog</p>
<p>&nbsp;</p>
<p>Mam mus mam mus nrhiav dua lwm tus</p>
<p>Siaj loj siab ntev nrog koj sib hlub</p>
<p>Mam mus mam mus nrhiav dua tus tshiab</p>
<p>Muaj kub muaj nyiaj ua koj tus txiv</p>
<p>Thiaj li thiaj li yuav muaj nuj nqis</p>
<p>Thiaj li thiaj li yuav tsis khaum kev</p>
<p>Rau koj lub neej lawm yav tom ntej</p>`
	const data = {
		title,
		writer,
		singer,
		genre,
		posted_by,
		body: myBody,
		url
	}
	console.log({ data })
	await Song.create(data) // Save user to the database
	return redirect('/write')
}

// React component to display users and form
export default function Write() {
	const [content, setContent] = useState('')
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])
	return (
		<div className='max-w-xl mx-auto'>
			<h1>Users</h1>

			<h2>Add a New User</h2>

			{/* Form to add a new user */}
			<Form method='post'>
				<div>
					<label htmlFor='title'>Song title:</label>
					<input type='text' name='title' className='form-input' />
				</div>
				<div>
					<label htmlFor='singer'>Singer:</label>
					<input type='text' name='singer' className='form-input' />
				</div>
				<div>
					<label htmlFor='writer'>Writer:</label>
					<input type='text' name='writer' className='form-input' />
				</div>
				<div>
					<label htmlFor='singer'>Singer:</label>
					<input type='text' name='singer' className='form-input' />
				</div>
				{/* {isClient}
        <RichTextEditor value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} /> */}
				{isClient ? (
					<React.Suspense fallback={<div>Loading editor...</div>}>
						<RichTextEditor value={content} onChange={setContent} />
					</React.Suspense>
				) : (
					<div>Loading...</div>
				)}
				<button type='submit'>Add User</button>
			</Form>
		</div>
	)
}
