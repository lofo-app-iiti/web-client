import React from 'react'
import './AboutUs.css'

export default function AboutUs() {
    return (
        <>
            <div className="container-fluid mt-2 py-4 px-3">
                <div className="container d-flex box p-0 right">
                    <div className='py-3'>
                        <h2 className="display-5 ">The LoFo App</h2>
                        <p className="">LoFo is a network developed by a group of undergraduate students from IIT Indore. It is an app which resolves the problem of buying/selling and lost/found in college life of students and residents.
                            It Is developed by Suman Kumar Jaiswal and Jai Surya Katla.
                        </p>
                        <br />
                        <h4>Future Plans</h4>
                        <p>
                            Future plans are to make customization and  modifications by extending the backend to be compatible for web clients and to make a convenient and easily operated android app (Further in ios).
                        </p>
                        <br />
                        <h4>Join our Team</h4>
                        <p>
                            Anyone interested in joining the team is welcomed. Here you will get opportunities for future development.
                        </p>
                    </div>
                    <div className='py-3'>
                        <img className="col" alt="" src="about-us4.jpg" />
                    </div>
                </div>
            </div>

            <div className="container-fluid deep my-2 py-4 px-3">
                <div className="container d-flex box p-0 right">
                    <div className='py-3'>
                        <img className="" alt="" src="about-us2.jpg" />
                    </div>
                    <div className='py-3'>
                        <h2 className="display-5">Lost and Found</h2>
                        <p className="">Students in their restless schedule are likely expected to misplace or forget some of their stuff.
                            Most of the time it gets lost and if even found, the object might be damaged and not in the right condition preferred by the owner. This creates crucial concerns for the students.
                        </p>
                        <br />
                        <h4>Instructions</h4>
                        <p>To register yourself on the site, login to the site using your institute email.</p>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>You found something:</span> Navigate to the <span style={{ fontWeight: 'bold' }}>Lost</span> section and check if the item you found has been listed by the owner or not.
                            <ul>
                                <li>
                                    If the item is present, you can click/tap the <span style={{ fontWeight: 'bold' }}>I found</span> button which would then send and automated email to the owner.
                                </li>
                                <li>
                                    If the item is not present, tap on the <span style={{ fontWeight: 'bold' }}>Add +</span> button and enter the item details accordingly. Select the <span style={{ fontWeight: 'bold' }}>found</span> option for the item status.
                                </li>
                            </ul>
                        </p>

                        <p>
                            <span style={{ fontWeight: 'bold' }}>You lost something: </span>Navigate to the <span style={{ fontWeight: 'bold' }}>found</span> section and check if your belonging has been listed as found by any resident of the institute or not.
                            <ul>
                                <li>
                                    If the item has been listed tap/click on the <span style={{ fontWeight: 'bold' }}>It's mine</span> button to claim it. An automated email would be sent to the the person who found it.
                                </li>
                                <li>
                                    If the item has not been listed, tap/click on the <span style={{ fontWeight: 'bold' }}>Add +</span> button and fill in the item's details. Select the status to be <span style={{ fontWeight: 'bold' }}>lost</span>. Wait for someone to find the item; you'd get an email once the person claims to have found it.
                                </li>
                            </ul>
                        </p>

                    </div>
                </div>
            </div>

            <div className="container-fluid my-2 py-4 px-3">
                <div className="container d-flex box p-0 left">
                    <div className='py-3'>
                        <h2 className="display-5  ">Buying and Selling</h2>
                        <p className=""> Students can sell their stuff to new students and residents if it’s not useful to them further or they are passing out of college. This will help students to get products at a budget price without having any inconvenience.
                        </p>
                    </div>
                    <div className='py-3'>
                        <img className="bg-light" alt="" src="about-us3.jpg" />
                    </div>
                </div>
            </div>

            <div className="container-fluid deep mb-2 py-4 px-3">
                <div className="container d-flex box p-0 left">
                    <div className='py-3'>
                        <img className="" alt="" src="about-us1.png" />
                    </div>
                    <div className='py-3'>
                        <h1 className="col display-5">IIT Indore</h1>
                        <p className="">
                            Indian Institute of Technology Indore is an Institute of national importance located in Indore,  Madhya Pradesh, India. IIT Indore was founded in the year 2009. The campus sprawls across 501.42 acres. Since its inception, IIT Indore has been able to deliver outstanding performance in   all aspects.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
