import React, { ReactNode } from 'react'


interface SectionProps {
    children: React.ReactNode
    wrapperStyle?: string;
    sectionStyle?: string
}

function Section({ children, wrapperStyle, sectionStyle }: SectionProps) {
    return (
        <div className={`${wrapperStyle || ''}`}>
            <section
                className={`!max-w-[1000px] m-auto ${sectionStyle || ''}`}
            >
                {children}
            </section>
        </div>

    )
}

export default Section