import React, {useEffect, useState} from "react";
import { Box, Button} from "@mui/material";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from "axios";

const SelectAppliances = () => {

  const [appliance, setAppliance] = useState(
    {
      qty: '',
      name: '',
      type:''
    }
  );

  const [applianceType, setApplianceType] = useState();

  console.log(appliance)

  const handelChange = (e) => {

    const {name, value} = e.target
    setAppliance({...appliance, [name]:value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let consumption;
    applianceType.map((type) => {
      if(type.title == appliance.type){
        consumption = type;
      }
     
    });
    console.log(consumption.consumption)
    //let result = appliance.qty*applianceType;
  }

  const handleAddMore = async (event) => {
    event.preventDefault();
  }

  const API = axios.create({ baseURL: 'http://localhost:3030/user/' });

  useEffect(()=>{
    API.get('appliance/'+appliance.name).then((res) =>{
      setApplianceType(res.data[0]?.brands);
      console.log(res.data[0]?.brands);
    });
  },[appliance])
  
  return (
    <div className='text-center mt-10'>
      <p className='text-xl'>Select Appliances</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className = 'flex justify-bewteen mt-5 mb-10'>
        <Box style={{ width: "80%", margin: "auto" }}>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='qty'
              value={appliance.qty}
              onChange={handelChange}
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
              name='name'
              value={appliance.name}
              onChange={handelChange}
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
              name='type'
              value={appliance.type}
              onChange={handelChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              <MenuItem value="" className = 'inputGeneralStyle'>
                <em>Select Appliance Type</em>
              </MenuItem>
              {
                applianceType?.map((type) =>{
                  return(
                        <MenuItem value={type.title} >{type.title}</MenuItem>
                    )
                })
              }
            </Select>
          </Box>
        </div>
        <Box className="mb-3"><Button onClick={handleAddMore} variant="contained">Add More Appliance</Button></Box>
        <Box><Button type="submit" variant="contained" >Submit</Button></Box>
      </form>
    </div>
  );
};

export default SelectAppliances;