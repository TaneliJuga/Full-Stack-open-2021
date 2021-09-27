import React from 'react'

class Course extends React.Component{
  constructor(props){
    super(props);
    this.name = props.name;
    this.parts = props.parts;

    this.Content = (props) => {
      return  this.parts.map((part) => {
        return (
          <div>
            <Part name={part.name} exercises={part.exercises}/>
          </div>
        )
      });
    }

    this.Part = (props) => {
      return (
        <p>{props.name} {props.exercises}</p>
      )
    }
  }

  Header = (props) => {
    return (
      <h1>{this.name}</h1>
    )
  }

  Content = (props) => {
    return  this.parts.map((part) => {
      return (
        <div>
          Part(part.name, part.exercises)
        </div>
      )
    });
  }

  Total = (props) => {
    return (
      <p>Number of exercises {this.parts.
        map(p => p.exercises).
        reduce((a, b) => a+b)}</p>
    )
  }

  Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }

  render(){
    return (
      <div>
        {/* <Header course={course.name} /> */}
        <Content parts={course.parts} />
        {/* <Total exercises={course.parts.map(p => p.exercises)}/> */}
      </div>
    )
  }
}

const App = () => {
  return (
    <>
      <Course name={'Half Stack application development 1.5.2'} 
      parts={
        [
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
      }/>
    </>
  )
}


export default App