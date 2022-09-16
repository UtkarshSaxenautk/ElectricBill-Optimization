import React, {useEffect, useState} from "react";
import { Box, Button} from "@mui/material";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from "axios";

const ShowAppliances = () => {
    const [final, setFinal] = useState([]);
    const[quantity, setQuantity] = useState(0);
    const[item, setItem] = useState("");
    const[brands, setBrands] = useState([]);
    const[brand, setBrand] = useState("");
    const[rows,setRows] = useState([]);
    console.log(rows);
    const API = axios.create({ baseURL: 'http://localhost:3030/user/' });

    const handleSubmit = (e) =>{
        console.log(e)
    }

    const handelQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const handelItemChange = (e) => {
        setItem(e.target.value)
    }

    const handelBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handleAddMore = () =>{
        const arr = [];
        arr.push({quantity: quantity, item: item, brand: brand});
        setRows(arr);
        
    }

    useEffect(()=>{
    
        API.get('appliance/'+item).then((res) =>{
          setBrands(res.data[0]?.brands);
          console.log(res.data[0]?.brands);
        });
        setFinal(rows);
    },[item,quantity]);
      
    

    return (
            <div className='text-center mt-10'>
      <p className='text-xl'>Select Appliances</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className = 'flex justify-bewteen mt-5 mb-10'>
        <Box style={{ width: "80%", margin: "auto" }}>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='quantity'
              value={quantity}
              onChange={handelQuantityChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              <MenuItem value="" className = 'inputGeneralStyle'>
                <em>Select Quantity</em>
              </MenuItem>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
            </Select>
          </Box>

          <Box style={{ width: "80%", margin: "auto" }}>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='item'
              value={item}
              onChange={handelItemChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              <MenuItem value="" className = 'inputGeneralStyle'>
                <em>Select Appliance</em>
              </MenuItem>
              <MenuItem value='bulb'>Bulb</MenuItem>
              <MenuItem value='tube'>Tube</MenuItem>
              <MenuItem value='fan'>Fan</MenuItem>
              <MenuItem value='ac'>Air Conditioner</MenuItem>
            </Select>
          </Box>
    
          <Box style={{ width: "80%", margin: "auto" }} >
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='brand'
              value={brand}
              onChange={handelBrandChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              <MenuItem value="" className = 'inputGeneralStyle'>
                <em>Select Appliance type</em>
              </MenuItem>
              {
                brands?.map((type) =>{
                  return(
                      <MenuItem value={type.title} >{type.title}</MenuItem>
                    )
                })
              }
            </Select>
          </Box>
        </div>
        {
            final?.map((row) =>{
                return(
                    <div>
                         {row.quantity}
                        {row.item}
                        {row.brand}
                    </div>
                )
            })
        }
        <Box className="mb-3"><Button onClick={handleAddMore} variant="contained">Add More Appliance</Button></Box>
        <Box><Button type="submit" variant="contained" >Submit</Button></Box>
      </form>
    </div>
    );
};

export default ShowAppliances;