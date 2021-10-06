import {React, useState} from 'react'
import Add from './components/Add'
import './UserApp.css'

const UserTable = ({users}) => {
  return (
<table>
    <caption>Käyttäjät</caption>
  <thead>
    <tr>
      <th>nimi</th>
      <th>numero</th>
      <th>osoite</th>
  </tr>
  </thead>
  <tbody>
      {
        users.map(({name, number, address, id}) => {
          return (
          <tr key={id}>
            <td>{name}</td>
            <td>{number}</td>
            <td>{address}</td>
          </tr>
          )
        })
      }
  </tbody>
</table>
  )
}

const testData = [
  {
    name: 'Seppo',
    number: '050 5462237',
    address: 'Huitsikuja 6'
  }
]

const App = () => {
  const [users, setUsers] = useState(testData);
  const addUser = (user) => {
      const userWithId = {
          ...user,
          id: users.length + 1
      }
    setUsers([...users, userWithId]);
  }

  return (
<div className={"user-container"}>
    <Add addUser={addUser}/>
    <UserTable users={users}/>
</div>
  )
}

export default App;
