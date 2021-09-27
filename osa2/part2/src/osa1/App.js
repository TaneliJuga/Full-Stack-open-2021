import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return  props.parts.map((part) => {
    return (
      <p>
        {part[0]} {part[1]}
      </p>
    )
  });
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exersises.reduce((a, b) => a+b)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[[part1, exercises1], 
        [part2, exercises2], [part3, exercises3]]} />
      <Total exersises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App