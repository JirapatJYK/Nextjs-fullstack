import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

const Loader = ({isLoading}:{isLoading: boolean}) => {
    console.log(isLoading)
    return (
        <>
            {isLoading ? <div id="loader-bg">
                <div id="loader"></div>
            </div> : ""}
            
        </>
    )
}

export default Loader