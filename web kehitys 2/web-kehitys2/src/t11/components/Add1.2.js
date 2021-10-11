import {React, useState} from 'react'
import './Add.css'

function checkName(name){
    const promise = new Promise((resolve, reject) => {
    })
}

const isEmpty = new InputValidator(
    (input) => {
    return input.length === 0;
    }, 
    (inputName) => {
        return `${inputName} cannot be empty.`
    },
    ["onBlur", "onSubmit"]
)

const onlyLetters = new InputValidator(
    (input) => {
    return input.length === 0;
    }, 
    (inputName) => {
        return `Only alpha-numeric characters.`
    },
    ["onChange", "onSubmit"]
)

class LengthValidator extends InputValidator{
    constructor(min, max){
        const checkLength = (input) => {
            return input >= min && input <= max;
        }
        const errorText = (inputName) => {
            `${inputName} must be ${min} to ${max} characters long.`
        }
        super(checkLength, errorText, ["onBlur"])
    }
}


class InputValidatorComposer{
    constructor(validators, input){
        this.validators = validators;
        this.input = input;
    }

    validate(){
        return new Promise((resolve, reject) => {
            const failures = this.validators
                .filter(v => v.predicate)
                .map(v => v.errorText);

            if(failures.length === 0){
                resolve(this.input);
            }else{
                reject(failures);
            }
        })
    }
}


class InputValidator{
    constructor(predicate, errorText, event){
        this.predicate = predicate;
        this.errorText = errorText;
        this.event = event;
    }

    check(promise){
        promise.then((input) => {
            if(predicate){
                return input;
            }
            throw new Error(errorText);
        })
    }
}

const InputWithValidation = ({validators}) => {
    const [valid, setValid] = useState();
    const [input, setInput] = useState('');
    const [errorText, setErrorText] = useState();

    const validators = ["onBlur", "onChange"].reduce((prev, cur) => {
        const filtered = validators
        .filter(validator => validator.events.contains(cur));
        const validator = new InputValidatorComposer(changeValidators, filtered)
        prev[cur] = (input) => {
            validator.forEach(v => {
                v.validate(input).catch(reason => {
                    setErrorText([reason].flat());
                })
            });
        }
    }, {})

    const onChange = (e) => {
        const value = e.target.value;
        setInput(value);
        validator.onChange(value);
    }

    const onBlur = (e) => {
        validator.onBlur(input);
    }

    if(!valid){
        alert(errorText);
    }

    return (
        <input {...{onChange, onBlur}}></input>
    )
}


const Add = ({addUser}) => {
    const fields = [
        ["nimi", useState(''), "name"], 
        ["puhelin", useState(''), "number"], 
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