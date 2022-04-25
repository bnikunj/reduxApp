import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserDetail, editUserDetail } from "../state/action-creaters";

function UserDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail.data);
  const authToken = localStorage.getItem("authToken");

  const handleDeleteClick = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(
      "Are you sure, Do you want to delete this user Detail?"
    );
    if (result === true) {
      dispatch(deleteUserDetail(id));
    }
  };

  const handleUpdateClick = (id) => {
    dispatch(editUserDetail(id));
    navigate(`/updateUserDetail/${id}`);
  }

  useEffect(() => {
    if (authToken === "") {
      return navigate("/");
    }
  }, [authToken, navigate]);
  return (
    <>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10em auto",
        }}
      >
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.length !== 0 &&
              userData.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <i
                        className="fa-solid fa-trash-can p-1"
                        onClick={() => handleDeleteClick(item.id)}
                        style={{ cursor: "pointer" }}
                        data-toggle="tooltip"
                        title="Delete"
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square p-1"
                        onClick={() => handleUpdateClick(item.id)}
                        data-toggle="tooltip"
                        title="Update"
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="fa-solid fa-eye p-1"
                        data-toggle="tooltip"
                        title="View"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default UserDetail;
