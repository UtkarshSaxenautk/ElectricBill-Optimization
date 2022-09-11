import React, {useState} from "react";
import { Box, List } from "@mui/material";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
const SelectAppliances = () => {
  const bulbs = ["0Watts", "100Watts"];
  const tubes= ["Syska", "Wipro"];
  /*

    fan:["Havells, Orient"],
    ac:["Samsung", "Whirlpool"]
   */


  const [appliance, setAppliance] = useState(
    {
      name: '',
      type:''
    }
  );

  console.log(appliance)

  const handelChange = (e) => {

    const {name, value} = e.target
    setAppliance({...appliance, [name]:value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center mt-10'>
      <p className='text-xl'>Select Appliances</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className = 'flex justify-bewteen '>
          <Box style={{ width: "80%", margin: "auto" }}>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='name'
              value={appliance.applianceType}
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
          {/*{appliance.name === 'bulb' && <Box style={{ width: "80%", margin: "auto" }}>*/}
          {/*  <Select*/}
          {/*    className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"*/}
          {/*    name='name'*/}
          {/*    value={appliance.applianceType}*/}
          {/*    onChange={handelChange}*/}
          {/*    displayEmpty*/}
          {/*    inputProps={{ 'aria-label': 'Without label' }}*/}
          {/*    style ={{height : '50px', borderRadius:'15px', color : 'black'}}*/}
          {/*  >*/}
          {/*    <MenuItem value="" className = 'inputGeneralStyle'>*/}
          {/*      <em>Select Appliance</em>*/}
          {/*    </MenuItem>*/}
          {/*    {*/}
          {/*      bulbs.map((bulb) =>{*/}
          {/*        return (*/}
          {/*          <MenuItem value={bulb}>{bulb}</MenuItem>*/}
          {/*        )*/}
          {/*      })*/}
          {/*    }*/}

          {/*  </Select>*/}
          {/*</Box>}*/}
          {/*{appliance.name === 'tube' && <Box style={{ width: "80%", margin: "auto" }}>*/}
          {/*  <Select*/}
          {/*    className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"*/}
          {/*    name='name'*/}
          {/*    value={appliance.applianceType}*/}
          {/*    onChange={handelChange}*/}
          {/*    displayEmpty*/}
          {/*    inputProps={{ 'aria-label': 'Without label' }}*/}
          {/*    style ={{height : '50px', borderRadius:'15px', color : 'black'}}*/}
          {/*  >*/}
          {/*    <MenuItem value="" className = 'inputGeneralStyle'>*/}
          {/*      <em>Select Appliance</em>*/}
          {/*    </MenuItem>*/}
          {/*    {*/}
          {/*      tubes.map((tube) =>{*/}
          {/*        return (*/}
          {/*          <MenuItem value={tube}>{tube}</MenuItem>*/}
          {/*        )*/}
          {/*      })*/}
          {/*    }*/}

          {/*  </Select>*/}
          {/*</Box>}*/}
        </div>
      </form>
    </div>
  );
};

export default SelectAppliances;