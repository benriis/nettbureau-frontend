import { IForm, IErrors } from "./types";

export const ValidateForm = (input: IForm): IErrors => {
  let temp: IErrors = {
    name: [],
    phone: [],
    email: []
  }

  Object.keys(temp).forEach(element => {
    isEmptyString(input[element]) && temp[element].push("Må fylles ut")
    let err_msg = validate(element, input[element])
    !!err_msg && temp[element].push(err_msg)
  });

  return temp;
}


export const validate = (target: string, fieldToValidate: string): string | null => {
  let regex:RegExp = /(?:)/;
  switch (target) {
    case "name":
      regex = /^([a-zA-Z]){2,}([" "]){1}([a-zA-Z" "]){2,}$/g
      if (!fieldToValidate.match(regex)) {
        return "For- og etternavn må ha minst 2 bokstaver"
      }
      break;
    case "phone":
      regex = /^(0047|\+47|47)*[2-9]{1}\d{7}$/g;
      if (!fieldToValidate.match(regex)) {
        return "Ikke gylding telefonnummer"
      }
      break;
    case "email": 
      regex = /^[\w-.+]+@([\w-]+\.)+\w{2,}$/g
      if (!fieldToValidate.match(regex)) {
        return "E-post er ikke gyldig"
      }
      break;
    default:
      break
  }
  return null
}

export const isEmptyString = (field: string): boolean => {
  return field === "";
}


export const isEmptyList = (list: string[]) => {
  return list.length === 0
}