import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <React.Fragment> <Link to="/" className='text-white text-[2rem] font-extrabold font-serif text-center'>
            <span className='text-primary'>CON</span>
            <span>VOVE</span>
        </Link></React.Fragment>
    )
}
