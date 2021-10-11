import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import spin from "./index.module.css";
const api = "http://localhost:8000/api/country";

function App() {
  const [val, setVal] = useState("");
  const [data, setData] = useState([]);
  const [main, setMain] = useState([]);
  const [laoding, setLoading] = useState(false);
 
 

  const fetchData = async (country) => {
    setLoading(true)
    try {
      const query = {
        url: `${api}?name=${country}`,
        type: "get"
      };
      let result = await Axios(query);
      setLoading(false)

      if (result.data.status) {
        setMain(result.data.response);
        setData([result.data.response]);
      } else {
        setData([]);
      }
    } catch (error) {
      setLoading(false)

    }
  };


  const handleChange = async e => {
    const value = e.target.value;
    setVal(value);
    fetchData(value)
   };

   

  return (
    <div className="">
       
      <div>
        <div className="search">
          <Form.Group md="4" controlId="validationFormikUsername">
            <Form.Label>search for country</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">🔍</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Country"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={val}
                onChange={e => {
                  handleChange(e);
                }}
                // isInvalid={!!errors.username}
              />
              {/* <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>
        </div>

        <div className="customlist">
          <ListGroup defaultActiveKey="#link1">
            {/* <ListGroup.Item action href="#link1">
                Link 1
            </ListGroup.Item> */}

            {data.map(country => {
              return (
                <div key={country.name}>
                  <ListGroup.Item action>{country.name}</ListGroup.Item>
                </div>
              );
            })}
          </ListGroup>
          ,
        </div>
      </div>
      <div className={spin.spinner}>
        {laoding  && (
          <Loader type="Puff" color="#fff" height="100" width="100" />
        )}
      </div>
    </div>
  );
}

export default App;
