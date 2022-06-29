import React from 'react'
import LoginButton from '../components/LoginButton'

export default function Home() {
    return (
        <div style={{
            height: "83%"
        }}>
            <div className="row m-0">
                <div className="col-12 col-lg-8 d-flex align-items-center p-0">
                    <img src="bg.jpg" className='my-auto' style={{ width: "100%" }} alt="" />
                </div>
                <div className="col-12 col-lg-4" style={{
                    padding: "50px 30px 50px 30px"
                }}>
                    <div className="d-flex px-0 gap-2 h-100 flex-column bg-light justify-content-center align-items-center"
                        style={{
                            // backgroundColor: "#01268f",
                            borderRadius: 20,
                            marginBottom: 100,

                        }}>
                        <img src="/LoFo2.webp" className='mb-3' alt="" width={100} />
                        <div className='h4 text-center'>Welcome to Lost/Found Portal</div>
                        <p>IIT Indore</p>
                        <div className="login">
                            <LoginButton text={'login'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
