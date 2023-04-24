import { signOut } from "firebase/auth";
import { auth } from "../firebase/client";

const AccountPage = () => {
  const onLogout = () => {
    signOut(auth).then(() => {
      alert("ログアウトしました");
    });
  };

  return (
    <>
      <h2>AccountPage</h2>
      <button className="px-4 py-2 rounded-md" onClick={onLogout}>
        Logout
      </button>
    </>
  );
};

export default AccountPage;
