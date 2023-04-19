import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Actions";
import Card from "../Card/Card";

export default function CardsContainer(props) {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const prodPerPage = 6;
  const indexLastProd = props.currentPage * prodPerPage;
  const indexFirstProd = indexLastProd - prodPerPage;
  
  let currentProd = allProducts;

  currentProd = currentProd.slice(indexFirstProd, indexLastProd);

  return (
    <div className="cards-container">
      {currentProd?.map((p) => {
        return (
          <Card
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            marca={p.MarcaProducts[0].name}
          />
        );
      })}
    </div>
  );
}
