import React from 'react'

const App = () => {
    return (
       <div>
           <form action="http://localhost:8080/api/user" method={"post"}>
                <label for="email">email:</label><br/>
                <input type="text" id="email" name="email"/><br/>
                <label for="password">password:</label><br/>
                <input type="password" id="password" name="password" /><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
       </div> 
    )
}

export default App