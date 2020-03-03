import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectStatus({ content }) {
  const classes = useStyles();
  const [status, setStatus] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setStatus(event.target.value);
    content.taken = event.target.value;
    // need to send axios patch request
    axios.patch(`http://localhost:8000/api/v1/administrations/${content.id}`, {
      data: content
    })
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res)
      })
  };

  return (
    <div>
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
    </div>
  )
}