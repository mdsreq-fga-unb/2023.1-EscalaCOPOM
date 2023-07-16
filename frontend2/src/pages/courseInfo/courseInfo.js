import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./courseInfo.css";
import Header from "../Header/header";
import moment from "moment";

function CourseInfo() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const goToEmployees = () => {
    navigateTo("/employees");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3005/course/${id}`)
        .then((response) => {
          setCourse(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const editCourseData = () => {
    navigateTo(`/editCourse/${id}`);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div>
      <div className="main-table">
        <div className="table-employees">
          <div className="header" onClick={goToEmployees}>
            <Header />
          </div>
          <h2>Informações do Curso</h2>
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Informações</th>
                <th>Data de conclusão</th>
                <th>Data de expiração</th>
              </tr>
            </thead>
            <tbody>
              {course && (
                <tr>
                  <td>
                    <div className="name">{course.course}</div>
                  </td>
                  <td>
                    <div className="info">{course.info}</div>
                  </td>
                  <td>
                    <div className="conclusiondate">{formatDate(course.conclusiondate)}</div>
                  </td>
                  <td>
                    <div className="expirationdate">{formatDate(course.expirationdate)}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="box-bnt-editar">
            <button onClick={editCourseData} className="bnt-editar">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;