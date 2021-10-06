import {React, useState} from 'react'
import './Add.css'


const Add = ({addUser}) => {
    const fields = [
        ["nimi", useState(''), "name"], 
        ["numero", useState(''), "number"], 
        ["osoite", useState(''), "address"]
    ].map(([name, [state, setter], prop]) => {
        return {
            name, state, setter, prop
        }
    });

    function emptyInputs(){
        fields.forEach(({setter}) => {
            setter('');
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const user = fields.reduce((prev, cur) => {
            const {prop, state} = cur;
            prev[prop] = state
            return prev;
        }, {});

        addUser(user);
        emptyInputs();
    }

    function getChangeHandler(setter){
        return (e)=> {
            setter(e.target.value);
        }
    }

    return (
<form onSubmit={onSubmit} className={"user-form"}>
    <fieldset>
        <legend>Lisää käyttäjä</legend>
        <div className={"form-row"}>
            <div className={"form-column"}>
                {
                    fields.map(({name}) => {
                        return (
                            <label key={name} htmlFor={name}>{name}:</label>
                        )
                    })
                }
            </div>
            <div className={"form-column"}>
            {
                fields.map(({name, state: value, setter: setValue}) => {
                    return (
                        <input key={name} onChange={getChangeHandler(setValue)} id={name} value={value}></input>
                    )
                })
            }
            </div>
        </div>
        <input type={"submit"} value="lähetä"></input>
    </fieldset>
</form>
    )
    
}

export default Add