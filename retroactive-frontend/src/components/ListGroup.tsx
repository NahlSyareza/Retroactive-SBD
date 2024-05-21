import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";

function userRegisterEvent(
  namaUser: string,
  emailUser: string,
  passwordUser: string
) {
  axios
    .post("http://localhost:1466/user/register", {
      namaUser: namaUser,
      emailUser: emailUser,
      passwordUser: passwordUser,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function ListGroup() {
  const [getNamaUser, setNamaUser] = useState("");
  const [getEmailUser, setEmailUser] = useState("");
  const [getPasswordUser, setPasswordUser] = useState("");

  const handleNameChange = (event: any) => {
    setNamaUser(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmailUser(event.target.value);
  };

  const handlePasswordChane = (event: any) => {
    setPasswordUser(event.target.value);
  };

  return (
    <>
      <h1>Login Page</h1>
      <form>
        <input
          type="text"
          name="Nama user"
          onChange={handleNameChange}
          placeholder="Nama user"
        />
        <div />
        <input
          type="text"
          name="Email user"
          onChange={handleEmailChange}
          placeholder="Email user"
        />
        <div />
        <input
          type="text"
          name="Password user"
          onChange={handlePasswordChane}
          placeholder="Password user"
        />
      </form>
      <button
        onClick={() => {
          userRegisterEvent(getNamaUser, getEmailUser, getPasswordUser);
        }}
      >
        Register
      </button>
      <div></div>
    </>
  );
}

export default ListGroup;
