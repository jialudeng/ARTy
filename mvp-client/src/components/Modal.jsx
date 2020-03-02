import React, { useState, useEffect } from 'react';

export function Modal({ content }) {
  return (
    <div>
      <p>My event title: {content.storage}</p>
    </div>
  )
}