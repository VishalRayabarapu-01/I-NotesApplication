import React from 'react'
import './HomeContent.css'

const InstructionsForAddingNote = (props) => {
    const animated=props.textAnimation;
    return (
        <>
            <div className="col addNoteImg"></div>
            <div className="col texts">
                <div className="text-center fs-2 mt-2" style={{ fontFamily: 'Roboto', fontWeight: 'bolder' }}>Steps to add a Note :-</div>
                <p className={`mt-4 texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "poppins" }}>&#9830; First create a category (<b>category name</b>) under which you want to place your notes.</p>
                <p className={` texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "poppins" }}>&#9830; Next while adding a note give the category name to add to that specified category.</p>
                <p className={` texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "poppins" }}>&#9830; please give correct inputs if not there may be issues and adding note will not happen.</p>
                <p className={` texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "poppins" }}>&#9830; To add a note <b>or</b> category scroll down.</p>
                <p className={`mt-2 texts ${animated ? 'animate' : ''}`} style={{ fontFamily: "poppins", fontWeight: 'bold' }}> Note : There may be many categories and each category should have unique name. </p>
            </div>
        </>
    )
}

export default InstructionsForAddingNote
