import React from 'react'

const Filter = () => {

    const [nameFilter, setNameFilter] = useState();
    const [numberFilter, setNumberFilter] = useState();
    

    const getChangeHandler = (setter) => {
        return (event) => {
            setter(event.target.value);
        }
    }


    let personsToShow = persons;
    [
        [nameFilter, matchName, (p) => p.name], 
        [numberFilter, matchNumber, (p) => p.number]
    ]
    .forEach(([filter, predicate, mappingFunction]) => {
        if(filter){
            personsToShow = personsToShow.filter(p => predicate(filter, mappingFunction(p)));
        }
    });

    return (
<div>
    <label for={"filter-name"}>filter by name</label><br/>
    <input id={"filter-name"} value={nameFilter} 
        onChange={getChangeHandler(setNameFilter)}/><br/>
        <label for={"filter-name"}>filter by number</label><br/>
    <input id={"filter-number"} value={numberFilter} 
        onChange={getChangeHandler(setNumberFilter)}/><br/>
</div>
    )
}