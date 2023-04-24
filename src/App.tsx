import { OwnIDInit } from "@ownid/react";
import { getIdToken, signInWithCustomToken } from "firebase/auth";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import AccountPage from "./components/AccountPage";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import { auth } from "./firebase/client";

const ownAppId = import.meta.env.VITE_OWNID_APP_ID;

const App = () => {
  return (
    <>
      <header className="flex items-center justify-between bg-slate-600 h-14 px-6">
        <Link to="/">
          <h1 className="text-2xl text-slate-200 font-bold">LOGO</h1>
        </Link>
      </header>

      <div className="h-[calc(100vh-216px)] flex items-center justify-center">
        <OwnIDInit
          config={{
            appId: ownAppId,
            sdk: "firebase",
            firebaseAuth: {
              auth,
              getIdToken,
              signInWithCustomToken,
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="bg-gray-400 h-40 text-center flex flex-col">
        <p className="text-sm font-light text-black text-opacity-50 mt-auto mb-2">
          ©kkkkoki 2023
        </p>
      </footer>
    </>
  );
};

export default App;
