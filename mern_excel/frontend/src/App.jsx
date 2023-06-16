import { useEffect, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);
  const [deduct, setDeduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6654/api/rates/get-all-data")
      .then((res) => setDeduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const array = [{ salary: 20000 }, { salary: 15000 }, { salary: 25000 }];

  const deduct_click = () => {
    const x = array.map((data) => {
      return (
        data.salary -
        (deduct.filter(
          (filter) => data.salary < filter.To && data.salary > filter.From
        )[0].EE +
          deduct.filter(
            (filter) => data.salary < filter.To && data.salary > filter.From
          )[0].Provident_EE)
      );
    });
    console.log(x);
  };

  console.log(cols);

  const handleFile = (e) => {
    const file = e.target.files[0];
    ExcelRenderer(file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setHeader(res.rows[0]);

        let newRows = [];
        res.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined!") {
            newRows.push({
              ID_SSS: row[0],
              From: row[1],
              To: row[2],
              ProvidentFund: row[3],
              MonthSalary: row[4],
              ER: row[5],
              EE: row[6],
              Total: row[7],
              Final_EC: row[8],
              Provident_ER: row[9],
              Provident_EE: row[10],
              Final_ER: row[11],
              Final_EE: row[12],
              Final_Total: row[13],
              EffectivityDate: row[14],
            });
          }
        });

        setCols(newRows);
      }
    });
  };

  const submit_data = () => {
    axios
      .post("http://localhost:6654/api/rates/bulkCreate", { data: cols })
      .then((res) => console.log(res))
      .catch((er) => console.log(er));
  };
  return (
    <div>
      <div style={{ margin: "10px auto" }}>
        <input type="file" onChange={handleFile} />
      </div>
      <br />
      <table
        style={{
          borderCollapes: "collapes",
          margin: "10px auto",
          borde: "1px solid black",
        }}
      >
        <thead>
          <tr>
            {header.map((h, i) => (
              <>
                <th key={i}>{h}</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {cols.map((data, index) => {
            return (
              <>
                {/*  
              ID: row[1],
              From: row[2],
              To: row[3],
              ProvidentFund: row[4],
              MonthSalary: row[5],
              ER: row[6],
              EE: row[7],
              Total: row[8],
              Final_EC: row[9],
              Provident_ER: row[10],
              Provident_EE: row[11],
              Final_ER: row[12],
              Final_EE: row[13],
              Final_Total: row[14],
              EffectivityDate: row[15],
               */}
                <tr>
                  <td>{data.ID_SSS}</td>
                  <td>{data.From}</td>
                  <td>{data.To}</td>
                  <td>{data.ProvidentFund}</td>
                  <td>{data.MonthSalary}</td>
                  <td>{data.ER}</td>
                  <td>{data.EE}</td>
                  <td>{data.Total}</td>
                  <td>{data.Final_EC}</td>
                  <td>{data.Provident_ER}</td>
                  <td>{data.Provident_EE}</td>
                  <td>{data.Final_ER}</td>
                  <td>{data.Final_EE}</td>
                  <td>{data.Final_Total}</td>
                  <td>
                    {moment(data.EffectivityDate).format("MMMM, DD YYYY")}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <button onClick={submit_data}>Submit</button>
      <button onClick={deduct_click}>Deduct</button>
    </div>
  );
}

export default App;
