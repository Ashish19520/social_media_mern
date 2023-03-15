import react from 'react';
import { TextField,Grid,InputAdornment,IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

 const Input =({name,half,handleChange,label,autoFocus,type,handleshowpassword})=>{
    return(
        <Grid item xs={6} sm={half?6:12}>
        <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        requiured={true}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name==="password"?{
            endAdornment:(
                <InputAdornment position="end">
                    <IconButton onClick={handleshowpassword}>
                        {type==='password' ?<Visibility />:<VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )}:null}
        />
    </Grid>);
 }
 export default Input;