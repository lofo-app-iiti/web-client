import React from 'react'
import LoginButton from '../components/LoginButton'

export default function Home() {
    return (
        <div className='container-fluid' style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            backgroundColor: "#01268f"
        }}>
            <img src="/LoFo.webp" className='mb-3' alt="" width={250} />
            <div className='display-3 text-light text-center'>Welcome to Lost/Found Portal of IIT Indore</div>
            <h4 className='text-light text-center'>Login with Institude Id (@iiti.ac.in)</h4>
            <div className="login">
                <LoginButton />
            </div>
        </div>
    )
}
