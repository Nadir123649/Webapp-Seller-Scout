import React from 'react'
import LookUp from './lookupDetails'
import { marketimages, marketplaceheading } from '../../../constants'

const Marketplace = () => {
    return (
        <>
            <LookUp heading={marketplaceheading} data={marketimages}  value="value"/>
            <div className='d-flex justify-content-between align-items-center mt-2'>
                <span className='seller-description pb-0'>
                    European Fulfilment Type
                </span>
                <div className="toggler toggler-two">
                    <input
                        type="checkbox"
                        className="checkbox-desc"
                    />
                    <label className="unchecked-label seller-description">
                        Pan EU
                    </label>
                    <label className="checked-label seller-description">EFN</label>

                    <div className="background checked-background"></div>
                    <div className="background unchecked-background"></div>
                </div>

            </div>
            <p className=' seller-description pb-0 mb-0'>
                Exchange rate:
            </p>
        </>
    )
}

export default Marketplace