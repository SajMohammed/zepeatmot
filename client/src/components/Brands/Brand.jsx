import React from 'react';

const Brand = ({ id, image, handleBrandOnClick }) => {
    const handleOnClick = () => {
        handleBrandOnClick(id, image);
        localStorage.setItem("brandFirestoreId", id);
    }
  return (

    <div style={{display:'flex',justifyContent:'center',margin:0}} onClick={handleOnClick}>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', width:'145px',height:'209px',backgroundColor:'#F3F6F8', borderRadius:'32px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
            <img src={image} style={{ maxWidth:"100px", maxHeight:"100px", width:"auto", height:"auto"}} />
        </div>
    </div>
      
)};

export default Brand;
