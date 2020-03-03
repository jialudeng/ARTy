import React from 'react';
import axios from 'axios';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import appTheme from '../styles/theme';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontFamily: 'Lato',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectStatus({ content, onSuccess, onError }) {
  const classes = useStyles();
  const [status, setStatus] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {  

    content.taken = event.target.value;
    // need to send axios patch request
    axios.patch(`http://localhost:8000/api/v1/administrations/${content.id}`, {
      data: content
    })
      .then(res => {
        console.log(res)
        setStatus(event.target.value);
      })
      .then(() => {
        onSuccess();
      })
      .catch(err => {
        console.log(err);
        onError();
      })
  };

  return (
    <ThemeProvider theme={appTheme}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={status}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>Pending dose</em>
          </MenuItem>
          <MenuItem value={true}>Taken</MenuItem>
          <MenuItem value={false}>Missed</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  )
}
