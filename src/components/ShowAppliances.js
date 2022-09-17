import React, {useEffect, useState} from "react";
import { Box, Button, Typography} from "@mui/material";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ShowAppliances = () => {
    const [final, setFinal] = useState([]);

    const [id, setId] = useState(0);
    // const[quantity, setQuantity] = useState(0);
    const[item, setItem] = useState("");
    const[brands, setBrands] = useState([]);
    const[brand, setBrand] = useState("");
    const[rows,setRows] = useState([]);
    const [expectedHour, setExpectedHours] = useState(0);
    
    console.log(rows);
    const API = axios.create({ baseURL: 'http://localhost:3030/user/' });

    const handleSubmit = (e) =>{
        console.log(e)
    }

    const handelHoursChange = (e) => {
        setExpectedHours(e.target.value)
    }

    const handelItemChange = (e) => {
        setItem(e.target.value)
    }

    const handelBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handleAddMore = () =>{
        const arr = [...rows];
        let consumption;
        brands?.map((type) => {
          if(type.title == brand){
            consumption = type.consumption;
          }
         
        });
        setId(id+1);
        arr.push({id: id, expectedHour: expectedHour, item: item, brand: brand, consumption: consumption});
        setRows(arr);
        
    }

    const handleDelete = (id) => {
        setRows(rows.filter((row) => row.id !== id));
        console.log(rows);  
    }

    useEffect(()=>{
    
        API.get('appliance/'+item).then((res) =>{
          setBrands(res.data[0]?.brands);
          console.log(res.data[0]?.brands);
        });
    },[item,expectedHour,brand]);
      
    

    return (
            <div className='text-center mt-10'>
      <p className='text-xl'>Select Appliances</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className = 'flex justify-bewteen mt-5 mb-10'>
        <Box style={{ width: "80%", margin: "auto" }}>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='expectedHour'
              value={expectedHour}
              onChange={handelHoursChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              <MenuItem value="" className = 'inputGeneralStyle'>
                <em>Expected Usage</em>
              </MenuItem>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
              <MenuItem value='5'>5</MenuItem>
              <MenuItem value='6'>6</MenuItem>
              <MenuItem value='7'>7</MenuItem>
              <MenuItem value='8'>8</MenuItem>
              <MenuItem value='9'>9</MenuItem>
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='11'>11</MenuItem>
              <MenuItem value='12'>12</MenuItem>
              <MenuItem value='1'>13</MenuItem>
              <MenuItem value='2'>14</MenuItem>
              <MenuItem value='3'>15</MenuItem>
              <MenuItem value='4'>16</MenuItem>
              <MenuItem value='5'>17</MenuItem>
              <MenuItem value='6'>18</MenuItem>
              <MenuItem value='7'>19</MenuItem>
              <MenuItem value='8'>20</MenuItem>
              <MenuItem value='9'>21</MenuItem>
              <MenuItem value='10'>22</MenuItem>
              <MenuItem value='11'>23</MenuItem>
              <MenuItem value='12'>24</MenuItem>
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
        <Box className='justify-center w-9/12 m-auto'>
        {
            <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='text-center'>
              <TableHead>
                <TableRow >
                  <TableCell className='text-center'>Item</TableCell>
                  <TableCell align="right">Brand</TableCell>
                  <TableCell align="right">Expected Hour Usage</TableCell>
                  <TableCell align="right">Consumption</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow> 
              </TableHead>
              <TableBody>
              {rows?.map((row, id) =>{
                return(
                    <>
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                    <TableCell align="right">{row.expectedHour}</TableCell>
                    <TableCell align="right">{row.consumption}W</TableCell>
                    <TableCell align="right"><Button variant="contained" onClick={()=> handleDelete(row.id)}>delete</Button></TableCell>
                  </TableRow>
                    {/* <div className="mt-5 flex" key={id} >
                        <Typography>{row.item}</Typography>
                        <Typography>{row.brand}</Typography>
                        <Typography>{row.expectedHour}</Typography>
                        <Typography>{row.consumption}</Typography>
                        <Button variant="contained" onClick={()=> handleDelete(row.id)}>delete</Button>
                    </div> */}
                    </>
                )
            })}
              </TableBody>
            </Table>
          </TableContainer>
        }
        </Box>
        <Box className="mb-3 mt-5"><Button onClick={handleAddMore} variant="contained">Add More Appliance</Button></Box>
        <Box><Button type="submit" variant="contained" >Submit</Button></Box>
      </form>
    </div>
    );
};

export default ShowAppliances;