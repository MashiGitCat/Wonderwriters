import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from 'react-dom';
import Hero from "../components/hero/hero";
import Steps from "../components/stepssection/steps";
import SwipeableTextMobileStepper from "../components/wonderwriterscarousel/carousel"

export default function Homepage() {
  return (
    <div><Hero/>
    <SwipeableTextMobileStepper/>
    <Steps/>
    
    </div>

  )
}
