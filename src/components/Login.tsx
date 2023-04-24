import { useRef } from "react";
import { OwnID } from "@ownid/react";
import { auth } from "../firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const onLogin = async () => {
    if (emailField.current && passwordField.current) {
      await signInWithEmailAndPassword(
        auth,
        emailField.current.value,
        passwordField.current.value
      );
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl text-center">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={onLogin}>
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
          LogIn
        </button>
        <OwnID
          type="login"
          options={{
            variant: "button-fingerprint",
            infoTooltip: true,
            language: "ja",
            infoTooltipPosition: "bottom",
          }}
          loginIdField={emailField}
          passwordField={passwordField}
          onError={(error) => console.error(error)}
          onLogin={onLogin}
        />
      </form>
      <Link to="/register">Navigate to Register</Link>
    </div>
  );
};

export default Login;
