import React from 'react';
import { Container, Typography } from '@material-ui/core'
import BannerImg from '../../assets/motlogo.svg'

const Banner = () => {
  return (
      
      <div className='banner__container' style={{margin:'48px 26px'}}>
          <Container>
            <img src={BannerImg}></img>
          </Container>
          <Container style={{backgroundColor:'#F3F6F8', borderRadius:'32px', width:'324px', height:'430px', padding:'36px 16px', marginTop:'54px'}}>
              <Typography variant='h4' style={{marginBottom:'42px', fontFamily:'Poppins'}}>
                Your one-stop shop for brands !
              </Typography> 
              <Typography variant='body1' style={{fontFamily:'Poppins'}}>
              The first mall in Trivandrum Located in the heart of Kerala’s capital city, a Malabar group venture, the striking Mall of Travancore, that opened its doors on March 23, 2018, has become the unrivalled destination in Trivandrum, to experience shopping, dining & entertainment under one roof. 
              </Typography>
          </Container>
      </div>
  )
};

export default Banner;
