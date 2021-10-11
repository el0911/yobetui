import React, { Component } from 'react';
import axiosCaller from '../../utils/axios';
import  "./index.module.css";


const FormErrors = ({ formErrors }) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      formErrors: { email: '', password: '', name: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  async handleSubmit (e){
    e.preventDefault();
    const {email, password,name}  = this.state
    try {
       this.setState({
        message:'Loading............'
      })
      const { data } =  await axiosCaller.post('user/signup',{
        email,
        password,
        name
      })
      this.setState({
        message: 'Saved User'
      })

      localStorage.setItem('token',data.token)


      setTimeout(() => {
        this.setState({
          message:false
        })
      }, 10000);

    } catch (error) {
       this.setState({
        message: error.response.data.message
      })

      setTimeout(() => {
        this.setState({
          message:false
        })
      }, 10000);

     }
  }

  render() {
    return (
      <form className="demoForm" style={{
        width: 700,
        maxWidth: '90%',
        margin: '150px auto'
      }}       
      >
        <h2>Sign up</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>


       {this.state.message &&  <div className="panel panel-default">
           {this.state.message}
        </div>}

        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleUserInput} />
        </div>


        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput} />
        </div>


        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput} />
        </div>

        <button   onClick={this.handleSubmit} type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
      </form>
    )
  }
}

export default Form;

