import { OwnID, ownidReactService } from "@ownid/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../firebase/client";
import { Link } from "react-router-dom";

const Register = () => {
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const onRegister = async () => {
    if (emailField.current && passwordField.current) {
      await createUserWithEmailAndPassword(
        auth,
        emailField.current.value,
        passwordField.current.value
      );
    }
    await ownidReactService.enrollDevice();
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl text-center">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={onRegister}>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold mr-1 cursor-pointer">
            email
          </span>
          <input
            className="p-2 rounded-md"
            ref={emailField}
            type="email"
            name="email"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold mr-1 cursor-pointer">
            password
          </span>
          <input
            className="p-2 rounded-md"
            ref={passwordField}
            type="password"
            name="password"
          />
        </label>
        <button className="bg-slate-600" type="submit">
          Register
        </button>
        <OwnID
          type="register"
          options={{
            variant: "button-fingerprint",
            infoTooltip: true,
            language: "ja",
            infoTooltipPosition: "bottom",
          }}
          loginIdField={emailField}
          passwordField={passwordField}
          onError={(error) => console.error(error)}
          onRegister={onRegister}
        />
      </form>
      <Link to="/login">Navigate to Login</Link>
    </div>
  );
};

export default Register;
