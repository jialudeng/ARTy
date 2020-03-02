import React, { useState, useEffect } from 'react';

export function CustomEvent({ events }) {
  return (
    <div>
      <p>My event title: {events.medication}</p>
    </div>
  )
}