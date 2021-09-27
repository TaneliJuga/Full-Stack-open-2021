import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return  props.parts.map((part) => {
    return (
      <div>
        <Part name={part.name} exercises={part.exercises}/>
      </div>
    )
  });
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.
      map(p => p.exercises).
      reduce((a, b) => a+b)}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development 1.4'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App