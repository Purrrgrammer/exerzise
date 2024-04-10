import { useEffect, useRef, useState } from "react";
import { BTN, Input, StyleForm } from "../styled";
import { getInitialFormObjects } from "../../function";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/slices/userDataSlice";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/api/apiSlice";

interface formprops {
  setPageState: any;
  pageState: string;
  name: string;
}
import { useNavigate } from "react-router-dom";
import AlertBox from "../AlertBox";
import { toast } from "react-toastify";
const Form = ({ setPageState, pageState }: formprops) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<any>();
  const [login, { isLoading: isUpdating }] = useLoginMutation();
  const [register] = useRegisterMutation();

  useEffect(() => {
    formRef.current.reset();
  }, [pageState]);
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (pageState === "login") {
      // console.log("formValue", formValue);
      login(formValue)
        .unwrap()
        .then((loginResponse) => {
          // console.log("loginResponse successresponse", loginResponse);
          const resolveAfter3Sec = new Promise((resolve) => {
            setTimeout(resolve, 3000);
          });
          if (loginResponse.success === true) {
            toast.promise(resolveAfter3Sec, {
              pending: "Loggin in...",
              success: loginResponse.message,
              error: "Please login again",
            });
            dispatch(setUser(loginResponse));
          } else {
            toast.error(loginResponse.message);
          }
          return setTimeout(() => {
            navigate("/home");
          }, 4000);
        })
        .catch((err) => {
          toast.error(err.data.message);

          // alert(err.message);
        });
    } else {
      register(formValue);
    }
    formRef.current.reset();
  };
  const formLink =
    pageState === "register"
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";
  let formArr =
    pageState === "register"
      ? [
          {
            name: "firstname",
            label: "First Name",
            placeholder: "Enter your First Name",
          },
          {
            name: "lastname",
            label: "Last Name",
            placeholder: "Enter your First Name",
          },
          {
            name: "username",
            label: "User Name",
            placeholder: "enter your Username",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Password",
            type: "password",
          },
          { name: "email", label: "Email", placeholder: "Your Email" },
          {
            name: "phonenumber",
            label: "phonenumber",
            placeholder: "Your Phonenumber",
          },
          { name: "role", label: "Register as? ", type: "select" },
        ]
      : [
          {
            name: "username",
            label: "User Name",
            placeholder: "enter your Username",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Password",
            type: "password",
          },
        ];
  const initialFormValue = getInitialFormObjects(formArr);
  const [formValue, setFormvalue] = useState(initialFormValue);

  useEffect(() => {
    setFormvalue(initialFormValue);
    // console.log(initialFormValue);
  }, [pageState]);
  return (
    <>
      <AlertBox />
      {isUpdating ? (
        "Loading"
      ) : (
        <StyleForm id={pageState} onSubmit={submitHandler} ref={formRef}>
          <b className="p-4 text-3xl">{pageState.toUpperCase()}</b>
          {formArr.map((input, index) => (
            <Input
              key={index}
              id={input.name}
              type={input.type}
              placeholder={input.name}
              label={input.name}
              formValue={formValue}
              setFormvalue={setFormvalue}
            />
          ))}
          <div>
            <span>
              {pageState === "register"
                ? "I'm already a member"
                : "I'm new here"}
              <span
                onClick={() => {
                  setPageState(pageState === "register" ? "login" : "register");
                }}
              >
                <b>
                  <u> {pageState === "register" ? "Login" : "Register"}</u>
                </b>
              </span>
            </span>
          </div>
          <BTN type="submit">
            {pageState === "register" ? "Register" : "Login"}
          </BTN>
        </StyleForm>
      )}
    </>
  );
};

export default Form;
