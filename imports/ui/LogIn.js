import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class LogIn extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:''
    };
  }
  onSubmit(e){
    e.preventDefault();
    let email=this.refs.email.value.trim();
    let password=this.refs.password.value.trim();
    Meteor.loginWithPassword({email},password,(err)=>{
      if(err){
      this.setState({error:err.reason});
    }
      else {
      this.setState({error:""});
    }
    });

  }
    render(){
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1> Sign In </h1>
            <p> This is SignIn </p>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref="email" name="email" placeholder="email" />
              <input type="password" ref="password" name="password" placeholder="password" />
              <button className="button"> Log In </button>
            </form>
            <Link to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      );
    }
}