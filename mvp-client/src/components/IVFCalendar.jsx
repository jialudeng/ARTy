import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

import { Modal } from './Modal';

const localizer = momentLocalizer(moment);

export function IVFCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/administrations')
      .then(response => {
        // add med name and dosage to each event's title 
        let result = response.data.map((data) => {
          data.title = `${data.medication.brand_name} ${data.medication.dosage}`;
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
    console.log(e.medication);
    setModal(true);
    setContent(e.medication);

  }

  return (
    <div>
      <Calendar
      selectable
      localizer={localizer}
      events = {events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000 }}
      onSelectEvent={handleSelect}
    />
    {modal && <Modal content={content}/>}
  </div>
  )
}