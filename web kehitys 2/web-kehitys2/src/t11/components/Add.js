import {React, useState} from 'react'
import './Add.css'


const Add = ({addUser}) => {
    const fields = [
        ["nimi", useState(''), "name", {
            required: true, 
            type: "text", 
            pattern: `[^0-9!"#¤%&/()=?@£$€{[\\]}\\+']+`,
            maxLength: 35}
        ], 
        ["numero", useState(''), "number", {
            required: true, 
            type: "tel", 
            maxLength: 20,
            minLength: 5,
            pattern: "\\+?[0-9]+([\\s-]?[0-9])*"}], 
        ["osoite", useState(''), "address", {
            required: true, 
            type: "text", 
            pattern: `[^!"#¤%&/()=?@£$€{[\\]}\\+']+`,
            maxLength: 35}]
    ].map(([name, [state, setter], prop, attributes]) => {
        attributes.onChange = (e)=> {
            setter(e.target.value);
        };
        attributes.value = state;
        return {
            name, state, setter, prop, attributes
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
                fields.map(({name, state, setter, attributes}) => {
                    const onChange = (e)=> {
                        setter(e.target.value);
                    };
                    return (
                        <input key={name} 
                            {...attributes}
                            onChange={onChange}
                            id={name} value={state}
                        ></input>
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