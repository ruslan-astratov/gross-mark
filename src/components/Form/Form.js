import { useState, useEffect } from 'react'
import check_icon from './../../assets/icons/check_icon_green.svg'
import arrow_icon from './../../assets/icons/select_arrow.svg'
import captcha_icon from './../../assets/icons/captcha_icon.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import InputMask from 'react-input-mask'
import DropzoneComponent from '../DropzoneComponent/DropzoneComponent'
//eslint-disable-next-line
import ReCAPTCHA from 'react-google-recaptcha'

import { fetchErrorHandler } from '../../utils/fetchErrorHandler'
import { submitBlank } from '../../api/api'
import { dateRegex, phoneRegex, emailRegex, urlRegex } from '../../utils/regex'

import './style.css'

const Form = () => {
    const [vacancy, selectVacancy] = useState('')
    const [fio, setFio] = useState('')
    const [dateBorn, setDateBorn] = useState('')
    const [gender, setGender] = useState('Мужской')

    const [phone, setPhone] = useState('')
    const [isPhoneValid, togglePhoneValid] = useState(false)
    const [onBlurPhone, toggleOnBlurPhone] = useState(false)

    const [email, setEmail] = useState('')
    const [isEmailValid, toggleEmailValid] = useState(false)
    const [onBlurEmail, toggleOnBlurEmail] = useState(false)

    const [linkToResume, setLinkToResume] = useState('')
    const [applyCheckboxState, setApplyCheckboxState] = useState(false)
    const [clickOnCaptha, setClickOnCaptha] = useState(false)
    const [files, setFiles] = useState([])

    const [submit, setSubmit] = useState(false)
    const [disabledSubmitButton, toggleDisableSubmitButton] = useState(true)

    useEffect(() => {
        checkFilledPhone(phone)
        if (document.activeElement.type !== 'email') validateEmail(email)
    }, [phone, email])

    useEffect(() => {
        if (
            vacancy &&
            fio &&
            dateBorn &&
            gender &&
            phone &&
            isPhoneValid &&
            (linkToResume || files.length > 0) &&
            clickOnCaptha &&
            applyCheckboxState
        ) {
            toggleDisableSubmitButton(false)
        } else toggleDisableSubmitButton(true)
    }, [
        vacancy,
        fio,
        dateBorn,
        gender,
        phone,
        isPhoneValid,
        linkToResume,
        files,
        clickOnCaptha,
        applyCheckboxState,
    ])

    const options = [
        { label: 'водитель', id: 1 },
        { label: 'кассир', id: 2 },
        { label: 'пекарь', id: 3 },
        { label: 'повар', id: 4 },
        { label: 'приемщик', id: 5 },
        { label: 'продавец', id: 6 },
        { label: 'товаровед', id: 7 },
    ]

    function onChange() {
        setClickOnCaptha(true)
    }

    function checkFilledPhone(val, isBlur) {
        if (isBlur) toggleOnBlurPhone(true)

        if (phoneRegex.test(val)) {
            togglePhoneValid(true)
        } else if (val === '') {
            togglePhoneValid(true)
        } else togglePhoneValid(false)
    }

    function validateEmail(email) {
        toggleOnBlurEmail(true)
        if (email.match(emailRegex)) {
            toggleEmailValid(true)
        } else toggleEmailValid(false)
    }

    function validateDateBorn() {
        const dateBornArr = dateBorn.split('.')

        const enteredDate = new Date(dateBornArr.reverse().join('-'))
        const currentDate = new Date()

        const day = Number(dateBornArr[2])
        const month = Number(dateBornArr[1])
        const year = Number(dateBornArr[0])

        if (
            day > 0 &&
            day <= 31 &&
            month <= 12 &&
            year > 1900 &&
            currentDate >= enteredDate
        ) {
            return true
        }
        return false
    }

    function validatelinkToResume(linkToResume) {
        if (!urlRegex.test(linkToResume)) {
            fetchErrorHandler('Укажите корректную ссылку на резюме')
            return false
        }
    }

    function submitForm(e) {
        e.preventDefault()
        if (
            vacancy &&
            fio &&
            dateBorn &&
            gender &&
            phone &&
            isPhoneValid &&
            (linkToResume || files.length > 0) &&
            clickOnCaptha &&
            applyCheckboxState
        ) {
            if (validatelinkToResume(linkToResume)) return

            let data = new FormData()
            const selectedVacancie = options.find(
                (opt) => opt.label === vacancy
            )
            data.append('vacancy_id', selectedVacancie.id)
            data.append('fio', fio)
            const formattedBirthdate = dateBorn.split('.').reverse().join('-')
            data.append('birthdate', formattedBirthdate)
            data.append('phone', phone)
            if (email) {
                data.append('email', email)
            }

            data.append('sex', gender === 'Мужской' ? 1 : 0)
            if (linkToResume) {
                data.append('resume_link', linkToResume)
            } else data.append('resume_file', files[0])

            submitBlank(data)
                .then((response) => {
                    if (response.data === '') {
                        setSubmit(true)
                        toast.success('Анкета успешно отправлена', {
                            position: toast.POSITION.TOP_LEFT,
                        })
                    } else {
                        fetchErrorHandler(
                            'Возникли проблемы при отправке анкеты'
                        )
                    }
                })
                .catch(() => {
                    fetchErrorHandler('Возникли проблемы при отправке анкеты')
                })
        } else {
            fetchErrorHandler(
                'Пожалуйста, проверьте правильность заполненных обязательных полей'
            )
        }
    }

    return (
        <section className="form-blank">
            <div className="inner-container">
                {!submit ? (
                    <>
                        <p className="form-heading">Работа твоей мечты</p>
                        <form className="main-content d-flex space-between">
                            <div className="main-content__left-block">
                                <div className="vacancy-block">
                                    <p>
                                        <span>Вакансия *</span>
                                        {vacancy && (
                                            <img
                                                className="check_icon"
                                                alt="Поле заполнено"
                                                src={check_icon}
                                            />
                                        )}
                                    </p>
                                    <div className="select-wrapper">
                                        <select
                                            value={vacancy}
                                            className="vacancy-select"
                                            onChange={(event) =>
                                                selectVacancy(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            {!vacancy && (
                                                <option className="default-select-option">
                                                    Выберите вакансию
                                                </option>
                                            )}
                                            {options.map((opt) => (
                                                <option key={opt.label}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        <img
                                            className="arrow_icon"
                                            alt="Поле заполнено"
                                            src={arrow_icon}
                                        />
                                    </div>
                                </div>

                                <div className="fio-block">
                                    <p>
                                        <span>ФИО *</span>
                                        {fio && (
                                            <img
                                                className="check_icon"
                                                alt="Поле заполнено"
                                                src={check_icon}
                                            />
                                        )}
                                    </p>
                                    <input
                                        type="text"
                                        value={fio}
                                        onChange={(event) =>
                                            setFio(event.target.value)
                                        }
                                    ></input>
                                </div>

                                <div className="date-and-gender-wrapper d-flex space-between">
                                    <div className="date-block">
                                        <p>
                                            <span>Дата рождения *</span>
                                            {dateBorn !== '' &&
                                                dateRegex.test(dateBorn) &&
                                                validateDateBorn() && (
                                                    <img
                                                        className="check_icon"
                                                        alt="Поле заполнено"
                                                        src={check_icon}
                                                    />
                                                )}
                                        </p>
                                        <InputMask
                                            mask="99.99.9999"
                                            value={dateBorn}
                                            onChange={(event) =>
                                                setDateBorn(event.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="gender-block">
                                        <p>
                                            <span>Пол *</span>
                                            <img
                                                className="check_icon"
                                                alt="Поле заполнено"
                                                src={check_icon}
                                            />
                                        </p>
                                        <div className="gender-block__radio-buttons">
                                            <input
                                                className="custom-radio"
                                                name="radio"
                                                type="radio"
                                                id="color-1"
                                                value={gender}
                                                onChange={() =>
                                                    setGender('Мужской')
                                                }
                                                defaultChecked
                                            />
                                            <label htmlFor="color-1">
                                                мужской
                                            </label>

                                            <input
                                                className="custom-radio"
                                                name="radio"
                                                type="radio"
                                                id="color-2"
                                                value={gender}
                                                onChange={() =>
                                                    setGender('Женский')
                                                }
                                            />
                                            <label htmlFor="color-2">
                                                женский
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="phone-and-email-wrapper d-flex space-between">
                                    <div className="phone-block">
                                        <p>
                                            <span>Контактный телефон *</span>
                                            {phone !== '' &&
                                                phoneRegex.test(phone) && (
                                                    <img
                                                        className="check_icon"
                                                        alt="Поле заполнено"
                                                        src={check_icon}
                                                    />
                                                )}
                                        </p>
                                        <InputMask
                                            mask="+7 (999) 999-99-99"
                                            value={phone}
                                            placeholder="+7 ("
                                            onChange={(event) =>
                                                setPhone(event.target.value)
                                            }
                                            onBlur={(event) =>
                                                checkFilledPhone(
                                                    event.target.value,
                                                    true
                                                )
                                            }
                                            onFocus={() =>
                                                toggleOnBlurPhone(false)
                                            }
                                            className={
                                                !isPhoneValid && onBlurPhone
                                                    ? 'invalid-input'
                                                    : ''
                                            }
                                        />
                                        {!isPhoneValid && onBlurPhone && (
                                            <span className="validation-error-message">
                                                поле не заполнено до конца
                                            </span>
                                        )}
                                    </div>

                                    <div className="email-block">
                                        <p>
                                            <span>Электронная почта</span>
                                            {email !== '' &&
                                                emailRegex.test(email) && (
                                                    <img
                                                        className="check_icon"
                                                        alt="Поле заполнено"
                                                        src={check_icon}
                                                    />
                                                )}
                                        </p>
                                        <input
                                            placeholder="example@mail.com"
                                            className={
                                                email &&
                                                !isEmailValid &&
                                                onBlurEmail
                                                    ? 'invalid-input'
                                                    : ''
                                            }
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            onBlur={(event) =>
                                                validateEmail(
                                                    event.target.value
                                                )
                                            }
                                            onFocus={() =>
                                                toggleEmailValid(true)
                                            }
                                        />
                                        {email &&
                                            !isEmailValid &&
                                            onBlurEmail && (
                                                <span className="validation-error-message">
                                                    поле заполнено не корректно
                                                </span>
                                            )}
                                    </div>
                                </div>

                                <div className="resume-and-attachments-wrapper">
                                    <p>Резюме</p>
                                    <input
                                        placeholder="Вставьте ссылку на резюме или прикрепите файл ниже"
                                        type="text"
                                        value={linkToResume}
                                        onChange={(event) =>
                                            setLinkToResume(event.target.value)
                                        }
                                    />
                                    <DropzoneComponent
                                        files={files}
                                        setFiles={setFiles}
                                    />
                                </div>

                                <div className="captcha-block">
                                    <p>Капча</p>

                                    <div className="captcha-and-desc-wrapper d-flex space-between">
                                        <div className="captcha-wrapper">
                                            <ReCAPTCHA
                                                sitekey="6LcXko4fAAAAAMTiiz9NxcOfaAZQ41vcdKjaynD2"
                                                onChange={onChange}
                                            />

                                            <div className="captcha-checkbox d-flex space-between wrapper-for-custom-checkbox-and-label">
                                                <input
                                                    type="checkbox"
                                                    className="custom-checkbox"
                                                    id="captcha"
                                                    name="captcha"
                                                    checked={clickOnCaptha}
                                                />
                                                <label htmlFor="captcha">
                                                    я не робот
                                                </label>
                                            </div>
                                            <img
                                                className="captcha_icon"
                                                alt="Поле заполнено"
                                                src={captcha_icon}
                                            />
                                        </div>

                                        <p className="captcha-desc">
                                            * поля для обязательного заполнения
                                        </p>
                                    </div>

                                    <div className="captcha-checkbox d-flex space-between">
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox"
                                            id="apply"
                                            name="apply"
                                            checked={applyCheckboxState}
                                            onChange={() =>
                                                setApplyCheckboxState(
                                                    !applyCheckboxState
                                                )
                                            }
                                        />
                                        <label htmlFor="apply">
                                            я подтверждаю согласие на обработку
                                            персональных данных и принимаю
                                            условия рассмотрения обращений *
                                        </label>
                                    </div>

                                    <button
                                        className={`submit-button d-flex ${
                                            disabledSubmitButton
                                                ? 'disabled-submit-button'
                                                : ''
                                        }`}
                                        onClick={submitForm}
                                    >
                                        отправить
                                    </button>
                                </div>
                            </div>

                            <div className="main-content__right-block">
                                <h2>Наша суперцель</h2>
                                <p>
                                    — стать любимым магазином для каждой
                                    российской семьи.
                                    <br />
                                    <br />
                                    Сотни тысяч наших сотрудников ежедневно
                                    работают над её достижением.
                                    <br />
                                    <br />
                                    Мы уверены, что в ближайшие годы достигнем
                                    этого и будет здорово,если вместе с тобой.
                                </p>
                                <a
                                    className="link-call"
                                    href="tel:+7(926)433-14-16"
                                >
                                    +7 (926) 433-14-16
                                </a>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="success-submit-block">
                        <p className="success-submit-block__heading">
                            Ждем тебя!
                        </p>
                        <div className="main-content d-flex space-between">
                            <div className="main-content__left-block">
                                <p>
                                    В 2020 году самыми востребованными умениями
                                    и качествами на рынке труда станут:
                                </p>
                                <ul className="skills-list">
                                    <li>
                                        Умение ставить цели, планировать свое
                                        время, инициативность, настойчивость,
                                        высокая мотивация, умение эффективно
                                        общаться, любознательность.
                                    </li>
                                </ul>
                                <p>
                                    А профессиональным навыкам можно научить
                                    любого человека.
                                </p>
                            </div>

                            <div className="main-content__right-block">
                                <h2>Остались вопросы?</h2>
                                <a
                                    className="link-call"
                                    href="tel:+7(926)433-14-16"
                                >
                                    +7 (926) 433-14-16
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </section>
    )
}

export default Form
