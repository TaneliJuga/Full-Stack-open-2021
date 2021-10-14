import {React, useState} from 'react'
import axios from 'axios'

const inputs = [
    ['email', 'text'], 
    ['password', 'password']
].map(([name, type]) => {
    return {name, type}
})

const UserInput = ({name, type, onChange, value}) => {
    return (
        <>
        <label htmlFor={name}>{name}</label><br/>
        <input onChange={onChange} 
        value={value} type={type} 
        id={name} name={name}/><br/>
        </>
    )
}

const App = () => {

    const initialState = inputs.reduce((state, input) => {
        state[input.name] = '';
        return state;
    }, {})
    const [state, setState] = useState(initialState);

    const onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setState({
            ...state,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const searchParams = new URLSearchParams(formData).toString();
        //console.log("searchParams: ", searchParams);
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: searchParams,
            url: 'http://localhost:8080/api/user',
        };
        axios(options)
        .then((response) => {
            const token = response.data.accessToken;
            localStorage.setItem('myToken',
                token);
            //console.log("token", token);
        })
    }

    return (
       <div>
           <form onSubmit={onSubmit}>
                {
                    inputs.map(({name, type}) => {
                        return (
                <UserInput key={name} 
                    name={name} type={type} 
                    onChange={onChange} value={state[name]}/>
                        )
                    })
                }
                <input type="submit" value="Submit"/>
            </form>
       </div> 
    )
}

export default App