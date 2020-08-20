import { validate, isEmptyString, isEmptyList, ValidateForm } from "../common/validation"
import { IForm, IErrors } from "../common/types"

const input:IForm = {
  name: "hey do",
  phone: "34343434",
  email: "hey@det.com",
  applicant: ""
}

const errors:IErrors = {
  name: [],
  phone: [],
  email: []
}

test('validate name inputfield', () => {
  expect(validate("name", "firstname lastname")).toBeNull()
  expect(validate("name", "firstname middlename lastname")).toBeNull()
  expect(typeof validate("name", "hey you 1234")).toBe("string")
  expect(typeof validate("name", "duder r")).toBe("string")
  expect(typeof validate("name", "123 123")).toBe("string")
  expect(typeof validate("name", "a b")).toBe("string")
})

test('validate phone inputfield', () => {
  expect(validate("phone", "004723456789")).toBeNull()
  expect(validate("phone", "+4723456789")).toBeNull()
  expect(validate("phone", "4723456789")).toBeNull()
  expect(validate("phone", "23456789")).toBeNull()
  expect(typeof validate("phone", "text")).toBe("string")
  expect(typeof validate("phone", "12345678")).toBe("string")
  expect(typeof validate("phone", "00452345678")).toBe("string")
  expect(typeof validate("phone", "+452345678")).toBe("string")
})

test('validate email inputfield', () => {
  expect(validate("email", "hey@example.com")).toBeNull()
  expect(validate("email", "hey-you@example.com")).toBeNull()
  expect(validate("email", "hey-you+there.com@example.com")).toBeNull()
  expect(validate("email", "hey-you+there@example.com")).toBeNull()
  expect(typeof validate("email", "@gmail.com")).toBe("string")
  expect(typeof validate("email", "hey@.com")).toBe("string")
  expect(typeof validate("email", "hey@gmail")).toBe("string")
})

test('Check if string is empty', () => {
  expect(isEmptyString("")).toBeTruthy()
  expect(isEmptyString("34")).toBeFalsy()
})

test('Check if list is empty', () => {
  expect(isEmptyList([])).toBeTruthy()
  expect(isEmptyList(["hey", "you"])).toBeFalsy()
})

test('Validates the fields name, phone and email', () => {
  expect(ValidateForm(input)).toStrictEqual(errors);
})