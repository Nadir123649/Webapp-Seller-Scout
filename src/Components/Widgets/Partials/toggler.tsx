import React from 'react'

const Toggler = () => {
    return (
        <div className="toggler">
            <input
                type="checkbox"
                className="checkbox-desc"
            />
            <label className="unchecked-label seller-description">
                Yes
            </label>
            <label className="checked-label seller-description">
                No
            </label>
            <div className="background checked-background"></div>
            <div className="background unchecked-background"></div>
        </div>
    )
}

export default Toggler