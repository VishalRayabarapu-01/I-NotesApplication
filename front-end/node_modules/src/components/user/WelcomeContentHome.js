import React from 'react'

function WelcomeContentHome(props) {

    const animated=props.getAnimatedValue;
    return (
        <>
            <div className="col px-3">
                <h5 className={`mt-2 p-3 px-0 texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "Rubik", fontWeight: 'bold' }}>&#9733; Secure and private.</h5>
                <h5 className={`texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "Rubik", fontWeight: 'bold' }}>&#9733; Effortless Note-Taking</h5>
                <p className={`mt-3 texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "poppins" }}>Introducing NotesApp, the ultimate digital companion for capturing, organizing, and remembering your thoughts. Whether you're brainstorming, making to-do lists, or simply jotting down ideas, NotesApp offers a seamless and versatile note-taking experience that adapts to your needs. <br />
                    With multi-device synchronization, your notes are available wherever you are, be it on your smartphone during your commute, on your laptop at work, or on your tablet at home. The app's intuitive interface makes note-taking a breeze, and you can effortlessly categorize and tag your notes for easy retrieval.
                </p>
            </div>
            <div className="col img"></div>
        </>
    )
}

export default WelcomeContentHome
