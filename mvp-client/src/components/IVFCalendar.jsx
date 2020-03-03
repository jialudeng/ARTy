import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import MedModal from './MedModal';

const localizer = momentLocalizer(moment);
const useStyles = makeStyles(theme => ({
  outerDiv: {
    fontFamily: 'Lato'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function IVFCalendar() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/administrations')
      .then(response => {
        // add med name and dosage to each event's title 
        let result = response.data.map((data) => {
          data.title = `${data.medication.brand_name} ${data.medication.dosage} ${moment.utc(data.start).format('HH:mm')}`;
          data.start = moment.utc(data.start).toDate();
          data.end = moment.utc(data.end).toDate();
          return data;
        })
        setEvents(result)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [content, setContent ] = useState({})

  const handleOpen = (e) => {
    setOpen(true);
    setContent(e)
  };

  const handleClose = () => {
    setOpen(false);
    setContent({});
  };

  return (
    <div className={classes.outerDiv}>
      <Calendar
      selectable
      localizer={localizer}
      events = {events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000 }}
      onSelectEvent={handleOpen}
    />
    {open && <MedModal content={content} onClose={handleClose} open={open}/>}

  </div>
  )
}