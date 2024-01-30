import React from 'react'
import Header from '../components/Header/Header'


interface TemplateProps {
    App: React.ReactNode;
}
const Template: React.FC<TemplateProps> = ({ App }) => {

    return (
        <div className='w-full ' >
            <div className='w-full'>
                <Header />
            </div>
            <div className='my-40 w-full px-10'>
                {App}
            </div>
        </div>
    )
}

export default Template
