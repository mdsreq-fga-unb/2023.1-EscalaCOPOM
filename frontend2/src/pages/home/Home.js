import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigateTo = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const [listOfEmployees, setListOfEmployees] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:3005/employeeinfo").then((response) => {
        setListOfEmployees(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3005/employeeinfo").then((response) => {
      const sortedEmployees = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setListOfEmployees(sortedEmployees);
    });
  }, []);

  return (
    <div>
      {listOfEmployees.map((value, key) => {
        return (
          <div className="card">
            <div className="name">{value.name}</div>
            <div className="cpf">{value.cpf}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
