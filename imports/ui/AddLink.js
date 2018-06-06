import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import Modal from "react-modal";

export default class AddLink extends React.Component{

  constructor(props)
  {
    super(props);
    this.state={
      url:"",
      isOpen:false,
      error:""
    };
  }

  onChange(e){
    this.setState({url:e.target.value.trim()});
  }
  onSubmit(e){
    e.preventDefault();
    // const url=this.refs.url.value.trim();
    const url=this.state.url.trim();
    // if(url)
    // { // Links.insert({url,userId:Meteor.userId()});
      Meteor.call('links.insert',url,(err,res)=>{
        if(!err)
        {
          this.setState({url:""});
          this.setState({isOpen:false});
          this.setState({error:""});
        }
        else {
          this.setState({error:err.reason});
        }
      });
    // }
  }

  set(){
    this.setState({isOpen:false});
    this.setState({url:""});
    this.setState({error:""});
  }
  render(){
    return(
      <div>
        <button className="button" onClick={()=>this.setState({isOpen:true})}>Add Link</button>
        <Modal isOpen={this.state.isOpen}
              contentLabel="Add Link"
              onAfterOpen={()=>this.refs.url.focus()}
              onRequestClose={this.set.bind(this)}
              className="boxed-view__box"
              overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p>:undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
          </form>
          <button type="button" className="button button--secondary" onClick={this.set.bind(this)}>Cancel</button>
        </Modal>
      </div>
    );
  }
}
