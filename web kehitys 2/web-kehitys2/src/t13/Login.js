import {React, useState} from 'react'
import axios from 'axios'

const userInput = () => {

}

const App = () => {

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        const target = e.target;
        const name = target.value;
        const value = target.value;

        setState({
            [name]: value
        })
        
    }
    const onSubmit = (e) => {
        e.preventDefault();

        // formData = new FormData();

        // axios.post('http://localhost:8080/api/user')
        // .then((response) => {
        //     const token = response.data.accessToken;
        //     localStorage.setItem('myToken',
        //         token);
        // console.log("token", token);
        // })
    }

    return (
       <div>
           <form onSubmit={onSubmit}>
                <label htmlFor="email">email:</label><br/>
                <input onChange={onChange} value={state.email}type="text" id="email" name="email"/><br/>
                <label htmlFor="password">password:</label><br/>
                <input onChange={onChange} value={state.password} type="password" id="password" name="password" /><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
       </div> 
    )
}

export default App