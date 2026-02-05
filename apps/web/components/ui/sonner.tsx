'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
	console.log({ ...props })

	return (
		<Sonner
			className='toaster group'
			position='top-center'
			{...props}
		/>
	)
}

export { Toaster }