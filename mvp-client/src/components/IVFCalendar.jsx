import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

import MedModal from './MedModal';

const localizer = momentLocalizer(moment);
const useStyles = makeStyles(theme => ({
  outerDiv: {
    fontFamily: 'Lato'
  }
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

  const [modal, setModal] = useState(false);

  const [content, setContent ] = useState({})

  const handleSelect = e => {
    // prints the information on the selected medication
    setModal(true);
    setContent(e);
  }

  const handleUnselect = e => {
    // if the clicked element doesn't have a title prop, then close the modal
    if (!e.target.title && e.target.className !== 'MedModal') {
      setModal(false);
      setContent({});
    } 
  }

  return (
    <div onClick={handleUnselect} className={classes.outerDiv}>
      <Calendar
      selectable
      localizer={localizer}
      events = {events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000 }}
      onSelectEvent={handleSelect}
    />
    {modal && <MedModal content={content} onClose={handleUnselect} open={modal}/>}
  </div>
  )
}