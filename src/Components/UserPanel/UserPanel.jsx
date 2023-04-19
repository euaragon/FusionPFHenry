import { useEffect, useState } from "react";
import UserFavs from "./UserFavs";
import UserOrders from "./UserOrders";
import UserAccount from "./UserAccount";
import { getOrdenesCompraId } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

export default function UserPanel() {
  const [activeTab, setActiveTab] = useState("account");
  const loginUser = useSelector((state) => state.loginUser);
  const loginUserId = loginUser.id;

  const dispatch = useDispatch();

// unificamos los useEffect del cart y fav
  useEffect(() => {
    const iniciarOrdenesCompraUser = async () => {
      try {
        await dispatch(getOrdenesCompraId(loginUserId));
      } catch (error) {
        console.log(error.message);
      }
    };
    iniciarOrdenesCompraUser();
  }, []);


  function handleTabClick(tabName) {
    setActiveTab(tabName);
  }

  return (
    <div className="user-panel">
      <ul className="user-menu">
        <li className={activeTab === "account" ? "user-active" : ""} onClick={() => handleTabClick("account")}>MI CUENTA</li>
        <li className={activeTab === "favorites" ? "user-active" : ""} onClick={() => handleTabClick("favorites")}>MIS FAVORITOS</li>
        <li className={activeTab === "orders" ? "user-active" : ""} onClick={() => handleTabClick("orders")}>MIS PEDIDOS</li>
      </ul>


        {activeTab === "account" && <UserAccount />}
        {activeTab === "favorites" && <UserFavs />}
        {activeTab === "orders" && <UserOrders />}

    </div>
  );
}
