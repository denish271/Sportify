import React from 'react'

export default function Card(props) {
  return (
    <div>
        <h1>{props.match}</h1>
        Vs
        <h1>GT</h1>
        <button className="btn btn-primary" type='button'>More Details</button>
        <button className="btn btn-primary" type='button'>{new Date().toDateString()}</button>
    </div>
  )
}
