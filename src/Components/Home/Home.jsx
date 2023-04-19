
import { useEffect, useState } from "react";
import Slider from "../Slider/Slider.jsx";
import Filters from "../Filters/Filters.jsx";
import CardsContainer from "../CardsContainer/CardsContainer.jsx";
import OrderPaginate from "../OrderPaginate/OrderPaginate.jsx";
import { CookiesProvider, useCookies } from "react-cookie";
import popup from "../images/popup.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getDatosUser, getFav, getUserCart } from "../../Redux/Actions";

export default function Home() {
  const loginUser = useSelector((state) => state.loginUser);
  const loginUserId = loginUser.id;

  const dispatch = useDispatch();

// unificamos los useEffect del cart y fav
  useEffect(() => {
    const iniciarTodo = async () => {
      try {
        await dispatch(getUserCart(loginUserId));
        await dispatch(getFav(loginUserId));
        await dispatch(getDatosUser(loginUserId));
      } catch (error) {
        console.log(error.message);
      }
    };
    iniciarTodo();
  }, []);

  const [currentPage, setCurrentPage] = useState(1); // definir estado currentPage aquí
  const [cookies, setCookie] = useCookies(["visited"]);
  if (!cookies.visited) {
    return (
      <div className="popup">
        <a href="#" onClick={() => setCookie("visited", true)}>
          <img src={popup} alt="oferta"></img>
        </a>
      </div>
    );
  }
  return (
    <CookiesProvider>
      <div className="home">
        <Slider />
        <OrderPaginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="home-adentro">
          <Filters />
          <CardsContainer currentPage={currentPage} />{" "}
        </div>
      </div>
    </CookiesProvider>
  );
}
