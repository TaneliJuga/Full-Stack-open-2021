import {React, useState} from 'react'

const User = ({name, number, address}) => {
    return (
<table>
    <thead>
        <tr>
            <th>nimi</th>
            <th>numero</th>
            <th>osoite</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{name}</td>
        </tr>
    </tbody>
</table>
    )
}