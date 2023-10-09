import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "../../../Styles/PlanSubscription.css"
import { useLoader } from '../../../data/hooks/useLoader';


function createData(spec, mobile, basic, standard, premium) {
    return { spec, mobile, basic, standard, premium };
}

// Subscription plans data
const rows = [
    createData('Monthly Price', '12€', '14€', '16€', '19€'),
    createData('Video Quality', 'Good', 'Good', 'Better', 'Best'),
    createData('Resolution', '480p', '480p', '1080p', '4K+HDR'),
    createData('Watch on your TV and computer', 0, 1, 1, 1),
    createData('Watch on your mobile phone and tablet', 1, 1, 1, 1),
    createData('Screens you can watch on at the same time', '1', '1', '2', '4'),
    createData('Unlimited movies and TV shows', 1, 1, 1, 1),
    createData('Cancel Anytime', 1, 1, 1, 1),
];

// Based on the selected plan highligh the data column
const PlanTable = () => {
    const { plan, setPlan } = useLoader();

    let c1, c2, c3, c4;
    if (plan === 'Mobile') {
        c1 = 'red'
        c2 = '#757575'
        c3 = '#757575'
        c4 = '#757575'
    }
    if (plan === 'Basic') {
        c2 = 'red'
        c1 = '#757575'
        c3 = '#757575'
        c4 = '#757575'
    }
    if (plan === 'Standard') {
        c3 = 'red'
        c1 = '#757575'
        c2 = '#757575'
        c4 = '#757575'
    }
    if (plan === 'Premium') {
        c4 = 'red'
        c2 = '#757575'
        c3 = '#757575'
        c1 = '#757575'
    }

    return (
        <table className='plan-table'>
            <thead>
                <tr>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan('Mobile')}>Mobile</th>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan('Basic')}>Basic</th>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan('Standard')}>Standard</th>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan('Premium')}>Premium</th>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row) => (
                        <tr key={row.spec}>
                            <td>{row.spec}</td>
                            <td className='plan_table_td' style={{ color: `${c1}` }}>{typeof (row.mobile) == 'number' ? row.mobile ? <CheckIcon /> : <CloseIcon /> : row.mobile}</td>
                            <td></td>
                            <td className='plan_table_td' style={{ color: `${c2}` }}>{typeof (row.basic) == 'number' ? row.basic ? <CheckIcon /> : <CloseIcon /> : row.basic}</td>
                            <td></td>
                            <td className='plan_table_td' style={{ color: `${c3}` }}>{typeof (row.standard) == 'number' ? row.standard ? <CheckIcon /> : <CloseIcon /> : row.standard}</td>
                            <td></td>
                            <td className='plan_table_td' style={{ color: `${c4}` }}>{typeof (row.premium) == 'number' ? row.premium ? <CheckIcon /> : <CloseIcon /> : row.premium}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table >
    );
}

export default PlanTable