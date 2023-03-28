import { FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import {connect, useDispatch} from 'react-redux'
import InfoField from './InfoField'

function AddDetails(props) {


  const dispatch = useDispatch()
  const {details} = props
  const { title, description, price, roomType, bathroomType, occupancy, LengthOfStay, phone } = details

  const [costType, setCostType] = useState(price ? 1 : 0)

  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value)
    setCostType(costType)
    if(costType === 0){
      dispatch({type:'UPDATE_DETAILS', payload:{price:0}})
    }else{
      dispatch({type:'UPDATE_DETAILS', payload:{price:15}})
    }
  }

  const handlePriceChange = (e) =>{
    dispatch({type: 'UPDATE_DETAILS', payload:{price: e.target.value}})
  }

  const handleInputChange = (e) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { [e.target.name]: e.target.value } })
  }

  return (
    <Stack sx={{alignItems: 'center', "& .MuiTextField-root":{width:'100%', maxWidth:500, m:1}}}>
      <FormControl>
        <RadioGroup name="costType" value={costType} row onChange={handleCostTypeChange}>
          <FormControlLabel value={0} control={<Radio />} label="Free Stay" />
          <FormControlLabel value={1} control={<Radio />} label="Nominal Fee" />
          {Boolean(costType) && (
            <TextField 
            sx={{width:'7ch !'}} 
            variant='standard' 
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
            inputProps={{type:'number', min:1, max:50}}
            value={price}
            onChange={handlePriceChange}
            name='price'
            />
          )}
        </RadioGroup>
      </FormControl>
      <InfoField mainProps={{name:'title', label:'Title', value:title}} minLength={5}/>
      <InfoField mainProps={{name:'description', label:'Description', value:description}} minLength={10} optionalProps={{multiline:true, rows:4}}/>
      <TextField
        name="phone"
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={handleInputChange}
        inputProps={{ min: 1, maxLength: 10, pattern: "[0-9]*" }}
        sx={{ m: 1, minWidth: 120 }}
      />
      <TextField
        name="occupancy"
        label="Occupancy"
        type="number"
        value={occupancy}
        onChange={handleInputChange}
        inputProps={{ min: 1 }}
        sx={{ m: 1, minWidth: 120 }}
      />
      <TextField
        name="LengthOfStay"
        label="Length of Stay (Days)"
        type="number"
        value={LengthOfStay}
        onChange={handleInputChange}
        inputProps={{ min: 1, max: 14 }}
        sx={{ m: 1, minWidth: 120 }}
      />
      <Stack direction="row" spacing={33}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="roomType-label">Room Type</InputLabel>
          <Select
            labelId="roomType-label"
            name="roomType"
            value={roomType}
            onChange={handleInputChange}
          >
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="shared">Shared</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
          <InputLabel id="bathroomType-label">Bathroom Type</InputLabel>
          <Select
            labelId="bathroomType-label"
            name="bathroomType"
            value={bathroomType}
            onChange={handleInputChange}
          >
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="shared">Shared</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
    
  )
}

function mapStateToProps(state){
  return{
    details: state.details
  }
}

export default connect(mapStateToProps)(AddDetails);