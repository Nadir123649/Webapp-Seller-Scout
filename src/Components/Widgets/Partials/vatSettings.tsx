import React, { useState } from 'react'
import Toggler from './toggler';

interface VatSettingProps {
    data: any;
}

const VatSettings = ({ data }: VatSettingProps) => {

    const [selectedOption, setSelectedOption] = useState("Not applicable");

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div>
            <div className='d-flex align-items-center justify-content-between'>
                <p className='seller-description mb-0'>
                    Scheme
                </p>
                <select id="options" value={selectedOption} onChange={handleChange}>
                    <option value="Not applicable">Not Applicable</option>
                    <option value="not registered">Not Registered</option>
                    <option value="standered rate">Standered rate</option>
                    <option value="flat rate">Flat rate</option>

                </select>
            </div>

            {selectedOption === "standered rate" && (
                <>
                    <div className='d-flex align-items-center justify-content-between mt-2'>
                        <p className='seller-description mb-0'>
                            VAT on Cost
                        </p>
                        <Toggler />
                    </div>
                    <div className='d-flex align-items-center justify-content-between mt-2'>
                        <p className='seller-description mb-0'>
                            VAT on Sale
                        </p>
                        <Toggler />
                    </div>
                    <div className='d-flex align-items-center justify-content-between mt-2'>
                        <p className='seller-description mb-0'>
                            VAT Rate
                        </p>
                        <div className="toggler toggler-four">
                            <input
                                type="checkbox"
                                className="checkbox-desc"
                            />
                            <label className="unchecked-label seller-description">
                                5%
                            </label>
                            <label className="checked-label seller-description">
                                20%
                            </label>
                            <div className="background checked-background"></div>
                            <div className="background unchecked-background"></div>
                        </div>
                    </div>
                </>

            )}

            {selectedOption === "flat rate" && (
                <div className='d-flex align-items-center justify-content-between mt-2'>
                    <p className='seller-description mb-0'>
                        Flat Rate
                    </p>
                    <p className='seller-description mb-0'>
                        11.00%
                    </p>
                </div>
            )}

        </div>
    )
}

export default VatSettings