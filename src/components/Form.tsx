import React, { useState } from 'react';
import { IForm, IErrors } from '../common/types';
import { isEmptyString, ValidateForm, validate, isEmptyList } from '../common/validation';
import { postData } from '../common/httprequests';

const Form = () => {
  const [input, setInput] = useState<IForm>({
    name: "",
    phone: "",
    email: "",
    applicant: "Benjamin Riis"
  })

  const [errors, setErrors] = useState<IErrors>({
    name: [],
    phone: [],
    email: []
  })

  const handleChange = (e: any) => {
    e.persist()
    setInput(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  
  const validateField = (e: any) => {
    e.persist()

    // Check if current input value is valid
    let temp:string[] = []
    isEmptyString(e.target.value) && temp.push("Må fylles ut")
    let err_msg = validate(e.target.id, e.target.value)
    !!err_msg && temp.push(err_msg)

    // Updates current error object with new errors
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: temp
    }))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    setErrors(ValidateForm(input))
    if (isEmptyList(errors.name) && isEmptyList(errors.phone) && isEmptyList(errors.email)) {
      postData(input)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }

  return (
    <form action="" onChange={handleChange}>
      <input type="hidden" id="applicant" name="applicant" value={input.applicant} />
      <div className={!isEmptyList(errors.name) ? "error" : "" }>
        <label htmlFor="name">Fullt navn (for- og etternavn)</label>
        <input onBlur={validateField} type="text" name="name" id="name" />
        {!!errors.name[0] && <p className="err-msg">{errors.name[0]}</p>}
      </div>
      <div className={!isEmptyList(errors.phone) ? "error" : "" }>
        <label htmlFor="phone">Telefon</label>
        <input onBlur={validateField} type="tel" name="phone" id="phone" />
        {!!errors.phone[0] && <p className="err-msg">{errors.phone[0]}</p>}
      </div>
      <div className={!isEmptyList(errors.email) ? "error" : "" }>
        <label htmlFor="email">E-post</label>
        <input onBlur={validateField} type="email" name="email" id="email" />
        {!!errors.email[0] && <p className="err-msg">{errors.email[0]}</p>}
      </div>
      <button onClick={onSubmit}>Submit</button>
    </form>
  )
}

export default Form;
