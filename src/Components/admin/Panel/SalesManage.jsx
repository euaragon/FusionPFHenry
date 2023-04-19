import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdenesCompra } from "../../../Redux/Actions";
import ExportExcel from "react-export-excel";
const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelFile.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelFile.ExcelColumn;

export default function SalesManage(){
  const dispatch = useDispatch();
  //const ventasProductos = useSelector((state) => state.ordenesCompra);
  const user = useSelector((state) => state.loginUser);
  const userId = user.id;
  const allVentas = useSelector((state) => state.allOrdenesCompras)
  console.log(allVentas);

  useEffect(() => {
    const orden = async () => {
      await dispatch(getAllOrdenesCompra());
    };
    orden();
  }, [dispatch]);


  return(
    <div className="admin-content">
    <h1>VENTAS</h1>
    {allVentas && (
        <ExcelFile
          element={<button>Exportar a Excel</button>}
          filename="Productos"
        >
          <ExcelSheet data={allVentas} name="Ventas">
            <ExcelColumn label="ID" value={(col) => col.id} />
            <ExcelColumn label="PROMOCION" value={(col) => col.promotion} />
            <ExcelColumn label="FORMA DE PAGO" value={(col) => col.payment} />
            <ExcelColumn label="FECHA" value={(col) => col.fecha} />
            <ExcelColumn label="TOTAL" value={(col) => col.total} />
            <ExcelColumn label="CANTIDAD" value={(col) => col.qty} />
            <ExcelColumn label="MODELO" value={(col) => col.title} />
            <ExcelColumn label="CODIGO" value={(col) => col.code} />
            <ExcelColumn label="PRECIO UNITARIO" value={(col) => col.comprasProducto[0].price} />
            <ExcelColumn label="TALLE" value={(col) => col.talle} />
            
          </ExcelSheet>
        </ExcelFile>
      )}
    <table className="ventas">
      <thead>
        <tr>
          <th>ID</th>
          <th></th>
          <th></th>
          <th>PROMOCIÓN</th>
          <th></th>
          <th></th>
          <th>FORMA DE PAGO</th>
          <th></th>
          <th></th>
          <th>FECHA</th>
          <th></th>
          <th></th>
          <th>TOTAL</th>
          <th></th>
          <th></th>
          <th>CANTIDAD</th>
          <th></th>
          <th></th>
          <th>MODELO</th>
          <th></th>
          <th></th>
          <th>CÓDIGO</th>
          <th></th>
          <th></th>
          <th>PRECIO UNITARIO</th>
          <th></th>
          <th></th>
          <th>TALLE</th>
        </tr>
      </thead>
      <tbody>
        {allVentas?.map((av) => (
          <tr key={av.id}>
            <td>{av.id}</td>
            <th></th>
            <th></th>
            <td>{av.promotion ? 'Sí' : 'No'}</td>
            <th></th>
            <th></th>
            <td>{av.payment}</td>
            <th></th>
            <th></th>
            <td>{av.fecha}</td>
            <th></th>
            <th></th>
            <td>${av.total.toLocaleString('de-DE')}</td>
            <th></th>
            <th></th>
            <td>{av.comprasProducto[0].qty}</td>
            <th></th>
            <th></th>
            <td>{av.comprasProducto[0].title}</td>
            <th></th>
            <th></th>
            <td>{av.comprasProducto[0].code}</td>
            <th></th>
            <th></th>
            <td>${av.comprasProducto[0].price.toLocaleString('ar-EG')}</td>
            <th></th>
            <th></th>
            <td>{av.comprasProducto[0].talle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}