import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, filterByCategory } from "../../Redux/Actions";

export default function Categories() {
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.categories);


  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(filterByCategory(e.target.value));
  };

  return (
    <div className="categorias">
      <ul className="cat-ul">
        {allCategories?.map((c) => (
          <li key={c}>
            <button value={c} onClick={(c) => handleCategoryChange(c)}>
              {c}
            </button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
