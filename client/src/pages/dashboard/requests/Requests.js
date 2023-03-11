import React, { useEffect } from 'react'

export default function Requests({setSelectedLink, link}) {
    
    useEffect(()=>{
        setSelectedLink(link)
    }, [])

    return (
        <div>Requests</div>
    )
}
