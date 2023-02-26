import { FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import {connect, useDispatch} from 'react-redux'
import InfoField from './InfoField'

function AddDetails(props) {


  const dispatch = useDispatch()
  const {details} = props
  const {title, description, price} = details

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
    </Stack>
  )
}

function mapStateToProps(state){
  return{
    details: state.details
  }
}

export default connect(mapStateToProps)(AddDetails);