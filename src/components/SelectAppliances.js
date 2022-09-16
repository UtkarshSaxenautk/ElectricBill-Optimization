import React, {useEffect, useState} from "react";
import { Box, Button} from "@mui/material";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from "axios";

const SelectAppliances = () => {
  const [columns, setColumns] = useState([]);
  console.log(columns);
  const [appliance, setAppliance] = useState(
    {
      qty: 0,
      name: '',
      type:'',
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
    console.log(consumption.consumption*appliance.qty)
    //let result = appliance.qty*applianceType;
  }



  const API = axios.create({ baseURL: 'http://localhost:3030/user/' });

  const handleAddMore = ( ) => {
    let consumption;
    applianceType?.map((type) => {
      if(type.title == appliance.type){
        consumption = type;
      }
    })
     

    API.post('postshowAppliance/', {
        // name: appliance.name,
        // quantity:appliance.qty,
        // brand:appliance.type,
        name: 'bulb',
        quantity:3,
        brand:'Havels',
        powerconsumption: 20
       // powerconsumption: consumption?.consumption*appliance.qty
      }).then((res) =>{
        
        const arr  = columns;
        arr.push(res.data);
        setColumns(arr);
        console.log(res.data)
      });
  }

  useEffect(()=>{
    
    API.get('appliance/'+appliance.name).then((res) =>{
      setApplianceType(res.data[0]?.brands);
      console.log(res.data[0]?.brands);

    });

    let consumption;
    applianceType?.map((type) => {
      if(type.title == appliance.type){
        consumption = type;
      }
    })
     

    // API.post('postshowAppliance/', {
    //     // name: appliance.name,
    //     // quantity:appliance.qty,
    //     // brand:appliance.type,
    //     // powerconsumption: consumption?.consumption*appliance.qty
    //     name: 'bulb',
    //     quantity:3,
    //     brand:'Havels',
    //     powerconsumption: 20
    //   }).then((res) =>{
        
    //     const arr  = columns;
    //     arr.push(res.data);
    //     setColumns(arr);
    //     console.log(res.data)
    //   });
    
  },[appliance]);
  

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
                <em>Select Appliance type</em>
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
      {
        columns.map(col =>{
          return (
            <Box>
              {col.quantity}
              {col.name}
              {col.brand}
            </Box>
          )
        })
      }
    </div>
  );
};

export default SelectAppliances;