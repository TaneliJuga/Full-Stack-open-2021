import React from 'react'

const Header = ({text}) => {
    return (
        <h2>{text}</h2>
    )
}

const Content = ({parts}) => {
    return  parts.map((part) => {
        return (
        <div key={part.id}>
            <Part part={part}></Part>
        </div>
        )
    });
}

const Total = ({exercises}) => {
    return (
        <p>Number of exercises {
                exercises.reduce((a, b) => a+b)
            }
        </p>
    )
}

const Part = ({part}) => {
    const {name, exercises} = part;
    return (
        <p>{name} {exercises}</p>
    )
}

const Course = ({course}) => {
    const {name, parts} = course;
    return (
    <div>
        <Header text={name} />
        <Content parts={parts} />
        <Total exercises={parts.map(p => p.exercises)}/>
    </div>
    )
}

export default Course