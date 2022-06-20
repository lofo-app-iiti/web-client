import React from 'react'
import './AboutUs.css'

export default function AboutUs() {
    return (
        <>
            <div className="container-fluid mb-2 py-4 px-3">
                <div className="container d-flex box p-0 left">
                    <div className='py-3'>
                        <h1 className="col display-5">We are what we deliver</h1>
                        <p className="">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat alias facere adipisci vel voluptate reprehenderit veritatis nostrum obcaecati quas consequatur assumenda accusamus natus nisi suscipit magnam autem, repellat, quidem labore?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quidem fugiat reprehenderit error optio facilis unde incidunt exercitationem rerum, nostrum quos! Magni ducimus ullam quidem excepturi itaque, iure voluptatibus aliquid.
                        </p>
                    </div>
                    <div className='py-3'>
                        <img className="" alt="" src="about-us1.png" />
                    </div>
                </div>
            </div>

            <div className="container-fluid deep my-2 py-4 px-3">
                <div className="container d-flex box p-0 right">
                    <div className='py-3'>
                        <img className="" alt="" src="about-us2.jpg" />
                    </div>
                    <div className='py-3'>
                        <h2 className="display-5">Our Vision</h2>
                        <p className="">We tend to serve the IITI community.Helpful for students to get
                            cost effective products without any trouble or hustle-bustle. Students also profit
                            by getting a chance to sell their used products instead of throwing them in trash.

                        </p>
                    </div>
                </div>
            </div>

            <div className="container-fluid my-2 py-4 px-3">
                <div className="container d-flex box p-0 left">
                    <div className='py-3'>
                        <h2 className="display-5  ">Who we are?</h2>
                        <p className="">We are a group of undergraduates from IIT Indore. We have
                            started 4SALE as a course project with the basic idea to create a website which
                            can solve the most common problems students face during their college life which is
                            buying and selling things
                        </p>
                    </div>
                    <div className='py-3'>
                        <img className="bg-light" alt="" src="about-us3.jpg" />
                    </div>
                </div>
            </div>

            <div className="container-fluid deep mt-2 py-4 px-3">
                <div className="container d-flex box p-0 right">
                    <div className='py-3'>
                        <img className="col" alt="" src="about-us4.jpg" />
                    </div>
                    <div className='py-3'>
                        <h2 className="display-5 ">Join our Team</h2>
                        <p className="">Anyone interested can join our team. Below is the list of
                            our team members. You can contact anyone of us.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
