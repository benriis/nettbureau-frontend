export type IForm = {
  name: string,
  phone: string,
  email: string,
  applicant: string,
  [key: string]: string
}

export type IErrors = {
  name: string[],
  phone: string[],
  email: string[],
  [key: string]: string[]
}