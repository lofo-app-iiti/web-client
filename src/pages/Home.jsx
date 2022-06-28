import React from 'react'
import LoginButton from '../components/LoginButton'

export default function Home() {
    return (
        <div className='' style={{
            height: "100vh"
        }}>
            <div className="row m-0 h-100">
                <div className="col-12 col-md-8 d-flex align-items-center p-0">
                    <img src="bg.jpg" className='my-auto' style={{ width: "100%" }} alt="" />
                </div>
                <div className="col-12 col-md-4" style={{
                    backgroundColor: "#01268f"
                }}>
                    <div className="d-flex h-100 gap-2 flex-column justify-content-center align-items-center">
                        <img src="/LoFo.webp" className='mb-3' alt="" width={150} />
                        <div className='h4 text-light text-center'>Welcome to Lost/Found Portal of IIT Indore</div>
                        <div className="login">
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
