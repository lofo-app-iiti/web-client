import React from 'react'
import LoginButton from '../components/LoginButton'

export default function Home() {
    return (
        <div>
            <div className="row m-0">
                <div className="col-12 col-lg-8 d-flex align-items-center p-0">
                    <img src="bg.jpg" className='my-auto' style={{ width: "100%" }} alt="" />
                </div>
                <div className="col-12 col-lg-4" style={{
                    padding: "50px 30px 50px 30px"
                }}>
                    <div className="d-flex px-2 gap-3 h-100 flex-column bg-light justify-content-center align-items-center"
                        style={{
                            // backgroundColor: "#01268f",
                            borderRadius: 20

                        }}>
                        <img src="logo2.png" alt="" width={140} height={120} />
                        <div className='text-center'>
                            <div className='h5 text-center'>Welcome to Lost / Found Portal</div>
                            <div className='text-secondary h5'>IIT Indore</div>
                        </div>
                        <div className='text-center'>
                            <div className="login">
                                <LoginButton text={'Login with Institude Id'} />
                            </div>
                            <p className='text-secondary my-2'>(iiti.ac.in)</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
