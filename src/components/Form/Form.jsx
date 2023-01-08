import React, {useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";
const Form = () => {
    const physical = "physical"
    const { tg } = useTelegram()

    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subjects, setSubject] = useState(physical)

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить'
        })
    }, [])

    useEffect(() => {
        if(!street || !country){
            tg.MainButton.hide()
        }else{
            tg.MainButton.show()
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите данные</h3>
            <input
                className={"input"}
                type="text"
                placeholder={"Страна"}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={"input"}
                type="text"
                placeholder={"Улица"}
                value={street}
                onChange={onChangeStreet}
            />
            <select
                className={"select"}
                value={subjects}
                onChange={onChangeSubject}
            >
                <option value={physical}>Физ. лицо</option>
                <option value={"legal"}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;