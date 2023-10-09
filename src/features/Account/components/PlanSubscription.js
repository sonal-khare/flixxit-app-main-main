import React, { useEffect, useState } from 'react'
import "../../../Styles/PlanSubscription.css"
import Header from '../../Dashboard/components/Header';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../data/hooks/useLoader';
import PlanTable from './PlanTable';

export const PlanSubscription = () => {
    const { setShowSearch, setShowMenu } = useLoader();
    const navigate = useNavigate()

    // Hide search box and menu bar in header
    useEffect(() => {
        setShowMenu(false);
        setShowSearch(false);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }, [])

    // navigate to payment after selecting plan subscription
    const handleContinue = () => {
        navigate('/payment')
    }

    return (
        <>
            <Header black={true} />
            <div className='plan-container'>
                <h3>Choose the plan that's right for you</h3>
                <p>Downgrade or upgrade at any time</p>
                <div className='plans'>
                    <PlanTable />
                </div>
                <p className='plan-p'>Full HD (1080p), Ultra HD (4K) and HDR availability subject to your
                    internet service and device capabilities. Not all content available in HD, Full HD, Ultra HD
                    or HDR. See Terms of Use for more details.
                </p>
                <div className='plan-button'>
                    <button onClick={handleContinue}>CONTINUE</button>
                </div>

            </div >

        </>
    )
}