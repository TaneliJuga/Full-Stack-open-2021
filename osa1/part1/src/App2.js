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
        {part}
      </p>
    )
  });
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exersises.reduce((a, b) => a+b)}</p>
  )
}

const Part = (props) => {
  return (
    <>{props.name} {props.exersiseCount}</>
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
      <Content parts={[
        <Part name={part1} exercises={exercises1}/>,
        <Part name={part2} exercises={exercises2}/>,
        <Part name={part3} exercises={exercises3}/>,
]} />
      <Total exersises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App