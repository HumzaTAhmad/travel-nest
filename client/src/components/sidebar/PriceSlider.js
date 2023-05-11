import { Box, Slider, Typography } from '@mui/material'
import { useDispatch, connect } from 'react-redux';

const marks = [
  {value:0, label:'$0'},
  {value:25, label:'$25'},
  {value:50, label:'$50'}
]

function PriceSlider(props) {
    
    const dispatch = useDispatch()
    const priceFilter = props.priceFilter
    const all = props.all
    console.log(all)
  return (
    <Box sx={{mt:5}}>
        <Typography>Max Price: {`$ ` + priceFilter}</Typography>
        <Slider
        min={0}
        max={50}
        defaultValue={50}
        valueLabelDisplay='auto'
        marks={marks}
        value={priceFilter}
        onChange={(e, price)=>dispatch({type:'FILTER_PRICE', payload:{price, all}})}
        />
    </Box>
  )
}


function mapStateToProps(state) {
    console.log(state)
    return {
      priceFilter: state.priceFilter,
      all: state
    };
  }
  
export default connect(mapStateToProps)(PriceSlider);
  
  