import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import { useInput } from "rooks";
import { useMutation } from "react-apollo-hooks";
import { LOGIN_USER, CREATE_USER, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";
import { useTitle } from "Hooks/useTitle";

export default () => {
  useTitle("Login | The GN");

  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const id = useInput("");
  const password = useInput("");
  const password2 = useInput("");
  const [loginUserMutation] = useMutation(LOGIN_USER, {
    variables: { id: id.value, password: password.value }
  });
  const [createUserMutation] = useMutation(CREATE_USER, {
    variables: {
      id: id.value,
      name: name.value,
      password: password.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (id.value !== "" && password.value !== "") {
        try {
          const {
            data: { loginUser: token }
          } = await loginUserMutation();
          if (!token) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            localLogInMutation({ variables: { token } });
          }
        } catch {
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error("id is required");
      }
    } else if (action === "signUp") {
      if (
        id.value !== "" &&
        name.value !== "" &&
        password.value !== "" &&
        password2.value !== ""
      ) {
        if (password.value !== password2.value) {
          return toast.error("The passwords are different.");
        } else {
          try {
            const {
              data: { createUser }
            } = await createUserMutation();
            if (!createUser) {
              toast.error("Can't create account");
            } else {
              toast.success(
                "Account created. Please wait for administrator approval."
              );
              setTimeout(() => setAction("logIn"), 3000);
            }
          } catch (e) {
            toast.error(e.message);
          }
        }
      } else {
        toast.error("All field are required");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      name={name}
      password={password}
      password2={password2}
      id={id}
      onSubmit={onSubmit}
    />
  );
};
