import { IForm } from "./types"

export const postData = async (data: IForm) => {
  const url:any = process.env.REACT_APP_NETTBUREAU_URL;
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    mode: "no-cors",
    body: JSON.stringify({...data, ...{beste_drik: "kaffe:)"}}),
  })
  .then(res => console.log("res", res))
  .catch(err => console.log("err", err))
}