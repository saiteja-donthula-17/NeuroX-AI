import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'
import "./Intro.css"

const Intro = () => {
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.text1', {
          opacity: 0,
          duration: 0.01,
        }
        )
        tl.from('.text1', {
          duration: 1,
          y: 200,
        }
        )
        tl.to('.text1', {
          opacity: 1,
          duration: 0.01
        })
        tl.to('.text1', {
          duration: 1,
        },'ani')
        tl.from('.load',{
          width:0,
          duration:1.5,
        },'ani')
        tl.to('.text1', {
          duration: 1,
          y: -100,
        },'one')
        tl.to('.load',{
          x:350,
          duration:1,
        },'one')
        tl.to('.intro', {
          y: -2000,
          duration: 0.5,
          
          ease: 'circ.in',
        })
        tl.to('.text1', {
          opacity: 0,
        })
      })
  return (
     <div className="fixed left-0 top-0 h-screen w-full bg-slate-200 z-50 intro">
  <div className="text-black flex flex-col gap-4 justify-center items-center h-screen relative overflow-hidden">
    <div className="overflow-hidden flex justify-center items-center gap-2 flex-col">
    <h1 className="text1  text-5xl md:text-8xl text-black font-bold animate-text gradient-text">NeuroX AI</h1>
    <div className="h-1 w-60 md:w-80 rounded-full overflow-hidden">
      <div className="load h-1 w-full bg-slate-600"></div>
    </div>
    </div>
  </div>
</div> 
  )
}

export default Intro