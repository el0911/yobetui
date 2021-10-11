import React from "react";
import style from "./index.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

export default function index() {
  return (
    <div className={style.app}>
      <p>
        Hi, my name is somto, and this is my hopefully not over engineered Front End React Developer assesment{" "}
      </p>{" "}
      <br />
      <p> Click on the buttons below to take you to the pages</p>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/singlecountry">Single Country Search</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/countries">Country Search</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/casino">Slot Game</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/multicountries">Multy Country Search</Nav.Link>
        </Nav.Item>
      </Nav>
      <br />
      <p>
        Well you can just login or signup

      </p>

      <Nav>
        <Nav.Item>
          <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>

      </Nav>
    </div>
  );
}
