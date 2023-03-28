import React, { useEffect } from 'react'

export default function Rooms({setSelectedLink, link}) {

    useEffect(()=>{
        setSelectedLink(link)
    }, [])

    return (
        <div>Rooms</div>
    )
}
