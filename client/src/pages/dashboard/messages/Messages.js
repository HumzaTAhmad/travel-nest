import React, { useEffect } from 'react'

export default function Messages({setSelectedLink, link}) {

    useEffect(()=>{
        setSelectedLink(link)
    }, [])

    return (
        <div>Messages</div>
    )
}
