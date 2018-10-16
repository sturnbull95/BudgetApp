import {hot} from "react-hot-loader";
import React, {Component} from "react";
import PaymentEntry from "./PaymentEntry.js";
class Payments extends Component{
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todoname: "",
      todos: [],
      total: 0,
      budget: this.props.total,
      styling : {
        color: 'black'
      },
      message: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }
  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if(document.querySelector('#todoval').value < this.state.budget){
      this.setState({
        message:''
      })
      if(document.querySelector('#todoname').value  && document.querySelector('#todoval').value ){
        this.state.todos.push({todoname:this.state.todoname,todo:this.state.todo})
        var newtotal = 0;
        for(var i = 0; i < this.state.todos.length; i++){
          newtotal += parseInt(this.state.todos[i].todo);
        }
        this.state.budget -= parseInt(document.querySelector('#todoval').value);
        if(this.state.budget < 1000){
          this.state.styling = {color:"red"}
        }

        this.setState({
          total: newtotal
        });
        document.querySelector('#todoname').value = null;
        document.querySelector('#todoval').value = null;
      }
    } else{
      this.setState({
        message:'You don\'t have enough in budget!'
      })
      document.querySelector('#todoname').value = null;
      document.querySelector('#todoval').value = null;
    }
  }
  onChangeText(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  deleteOnClick(index) {
    const todos = this.state.todos.slice();
    var orig = 0;
    for(var i = 0; i < todos.length; i++){
      orig += parseInt(todos[i].todo);
    }
    todos.splice(index, 1);
    this.setState({
       todos: todos
     });
     var newtotal = 0;
     for(var i = 0; i < todos.length; i++){
       newtotal += parseInt(todos[i].todo);
     }
     var final = orig - newtotal;
     this.setState({
       total: newtotal
     });
     this.state.budget += final
     if(this.state.budget > 1000){
       this.state.styling = {color:'black'}
     }
  }
  render(){
    return(
      <ul className="payments">
      {this.state.message}
      <form onSubmit={e => this.onSubmitHandler(e)}>
        Add Payment: Name: <input id="todoname" name="todoname" type="text" onChange={this.onChangeText} />    Amount: <input id="todoval" name="todo" type="number" onChange={this.onChangeHandler} />
        <br />
        <button>Submit</button>
      </form>
      <ul>
        {this.state.todos.map((item, index) => (

          <PaymentEntry
            key={index}
            item={item}
            index={index}
            click={this.deleteOnClick}
          />
        ))}
      </ul><br/>
      Total   {this.state.total} <br/> <div style={this.state.styling}>Budget {this.state.budget}</div>
      </ul>
    )
  }
};
export default hot(module)(Payments);
