import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Loyalty = () => {
  return (
      
    <Link to="/profile/partners" style={{textDecoration:'none', color:"#20CE88"}}><div style={{marginTop:'24px', marginBottom:'24px'}}>
        <CircularProgress color="primary" variant="determinate" value={75} style={{color:'#20CE88'}} />
        <Typography variant="h5" style={{marginTop:'20px'}}>Loyalty Progress</Typography>
    </div></Link>

  )};

export default Loyalty;
