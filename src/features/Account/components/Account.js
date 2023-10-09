import React, { useEffect, useState } from 'react';
import { useLoader } from '../../../data/hooks/useLoader';
import Header from '../../Dashboard/components/Header';
import Footer from '../../../Components/HomeFooter';
import "../../../Styles/Account.css";
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { setShowSearch, setShowMenu, setPlan } = useLoader();
    const [profile, setProfile] = useState({ ...JSON.parse(localStorage.getItem('userProfile')) })
    const navigate = useNavigate()

    useEffect(() => {
        // Hide search box and menu bar on page load
        setShowMenu(false);
        setShowSearch(false);
        setPlan(profile.plan);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }, [])

    // navigate to plan subscription page when click payment & subscription
    const handlePlanSub = async () => {
        navigate('/plansubscription')
    }


    return (
        <>
            <Header black={true} />
            <div className='account-container'>
                <h1 className="account-header">Account</h1>
                <div className="horizontal-line"></div>
                <div className="account-content">
                    <div className="account-section">
                        <div>
                            <h2 className="account-section-heading">User Details</h2>
                        </div>
                        <div className="account-section-content">
                            <div className="account-section-detail"> Email : {profile.useremail}</div>
                            <div className="account-section-detail"> Name : {profile.username}</div>
                            <div className="account-section-detail account-section-item-disabled">Password : ********</div>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="account-section">
                        <div>
                            <h2 className="account-section-heading">Plan Details</h2>
                        </div>
                        <div className="account-section-content">
                            <div className="account-section-detail">Plan : {profile.plan}</div>
                            <div className="account-section-detail">Payment Method  : {profile.paymentmethod}</div>
                            <div className="account-section-plan" onClick={handlePlanSub} style={{ cursor: 'pointer' }}>Payment & Subscription</div>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    )
}

export default Account