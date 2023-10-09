import React from 'react';
import '../Styles/HomeFAQ.css'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const HomeFAQ = ({ data }) => {

    return (
        <div className="homeFAQ-root">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className="homeFAQ-container"
                    id="panel1a-header"
                >
                    <Typography className="homeFAQ-heading">{data.header}</Typography>
                </AccordionSummary>
                <AccordionDetails className="homeFAQ-container">
                    <Typography>
                        {data.body}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default HomeFAQ;