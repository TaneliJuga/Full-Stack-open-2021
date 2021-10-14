import {React, useState} from 'react'
import axios from 'axios'

const inputs = [
    ['email', 'text'], 
    ['password', 'password']
].map(([name, type]) => {
    return {name, type}
});

const tokenName = 'myToken'

const UserInput = ({name, type, onChange, value}) => {
    return (
        <>
        <label htmlFor={name}>{name}</label><br/>
        <input type={type} 
        id={name} name={name}/><br/>
        </>
    )
}

const App = () => {
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
        const tokenObj = localStorage.getItem(tokenName);

        if(tokenObj){
            const bearer = 'Bearer: ' + tokenObj;
            options.headers.Authorization = bearer;
        }

        
        axios(options)
        .then((response) => {
            const token = response.data.accessToken;
            localStorage.setItem(tokenName,
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
                    name={name} type={type} />
                        )
                    })
                }
                <input type="submit" value="Submit"/>
            </form>
       </div> 
    )
}

export default App