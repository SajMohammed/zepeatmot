import { Grid } from "@material-ui/core";
import React from "react";
import BrandOffer from './BrandOffer/BrandOffer';

const items = [
    {id: 1, name: "Nivya Body Cream", category: "Self Grooming", price: "250"},
    {id: 2, name: "Vim Bar", category: "Home Care", price: "50"},
    {id: 3, name: "Rite Bite", category: "Self Grooming", price:"306"},
]

const BrandOffers = () => {
  return (
    <Grid container justifyContent="center" spacing={1}>
      {items.map((item) => (
        <Grid item key={item.id} xs={12}>
          <BrandOffer item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BrandOffers;
