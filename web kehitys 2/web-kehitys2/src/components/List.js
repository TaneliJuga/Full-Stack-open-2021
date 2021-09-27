import React from 'react'

const List = ({items}) => {
  return (
    <ul>
        {items.map((item, i) => {
            console.log(item);
            const itemKey = (item.id ? item.id : i).toString();
            return (
                Object.entries(item).map(([key, value]) => {
                    return (
                            <li key={itemKey + key}>{key}: {value}</li>
                        )
                })
            )
        })}
    </ul>
    )
}

export default List;
