import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";
import {TelegramError} from "node-telegram-bot-api/lib/errors";
const Form = () => {
    const physical = "physical"
    const mainButtonClicked = "mainButtonClicked"
    const { tg } = useTelegram()

    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subjects, setSubject] = useState(physical)

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subjects
        }
        tg.sendData(JSON.stringify(data))

    }, [country, street, subjects])

    useEffect(() => {
        tg.onEvent(mainButtonClicked, onSendData)
        return () => {
            tg.offEvent(mainButtonClicked, onSendData)
        }
    }, [onSendData])

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