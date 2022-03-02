import React from "react";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import './brands.css';
import Levis from "../../assets/levis.svg";
import Handm from "../../assets/handm.svg";
import Hymart from "../../assets/hymart.svg";
import Zara from "../../assets/zara.svg";
import Uniqlo from "../../assets/uniqlo.svg";
import Timberland from "../../assets/timberland.svg";
import Brand from "./Brand";
import motLayout from '../../assets/motLayout.svg';
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Cart from "../Cart/Cart";

const items = [
    {id: 1, image:Levis},
    {id: 2, image:Handm},
    {id: 3, image:Zara},
    {id: 4, image:Hymart},
    {id: 5, image:Uniqlo},
    {id: 6, image:Timberland},
    
]

const Brands = ({ partnerFirestoreId}) => {
    let brandId;
    const [brand, setBrand] = useState(true);
    const [layout, setLayout] = useState(false);
    const [brandFirestoreId, setBrandFirestoreId] = useState("");
    const [clickedBrand, setClickedBrand] = useState();
    const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
      
      const getBrands = async () => {
          const brandsCollectionRef = collection( db, `Partners/${partnerFirestoreId}/Brands-MoT` );
          
          const q = query(
              brandsCollectionRef
            //   ,where("BrandBID", "==", "100101")
              );
              const docSnap = await getDocs(q);
              docSnap.forEach((doc) => {
                
                setBrandsList((prev) => [
                    ...prev,
                    {
                        id: doc.id,
                        image: doc.data().ImageURL
                    }
                ])
            console.log(doc.data());
            //All the brand details are fetched here and assigned to setBrandsList

        })
      
    };
    getBrands();
  
    return () => {
      
    }
  }, [])

    const toggleBrand = () => {
        setBrand(true)
        setLayout(false)
            
    }
    const toggleLayout = () => {
        setLayout(true)
        setBrand(false)
    }

    
    const handleBrandOnClick = (id, image) => {
        
        localStorage.setItem("brandId", `${id}`);
        localStorage.setItem("brandImage", `${image}`);
        console.log("clicked Brand : ",id);
    }
    

    

    return (
        
        <div style={{ margin: "24px 26px" }}>
        <div className="brands__container-title" style={{ marginBottom:"32px"}}>
            
            <h2 style={{color:'#20CE88', cursor:'pointer'}} onClick={toggleBrand}>Brands</h2>
            <h2 style={{color:'#20CE88', cursor:'pointer'}} onClick={toggleLayout}>Layout</h2>
        
        </div>
        { brand ?  <Grid container spacing={2}> 
                {brandsList.map((item) => (
                    <Grid item key={item.id} xs={6}>
                        <Link to="/cart"><Brand id={item.id} image={item.image} handleBrandOnClick={handleBrandOnClick} /></Link>
                    </Grid>
                ))}
            </Grid> : 
            <Grid>
                <img src={motLayout}/>
            </Grid>
        }
        
        </div>
        
        
    );
};

export default Brands;
