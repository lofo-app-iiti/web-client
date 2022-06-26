import React from 'react'
import { Button } from 'react-bootstrap'
import emailjs from '@emailjs/browser'

export default function SendMail() {

    const sendMail = () => {
        emailjs.send("service_5fm302u", "template_79hfmob", {
            name: "Jaisurya",
            object: "bag",
            to_email: "sumanj631@gmail.com"
        }, "bN50q8M2Knnn5yF1i")
            .then(r => console.log(r.status))
            .catch(e => console.log(e))
    }

    return (
        <div>
            <Button onClick={sendMail}>Send</Button>
        </div>
    )
}
