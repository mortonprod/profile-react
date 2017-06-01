import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import me from "./me.png";
import mail from "./mail.svg"

class App extends Component {
  constructor(props){
    super(props);
    let state = {classHidden:[]};
    state.classHidden.push("app--hidden");//For photo    
    for(let i=0; i < this.props.info.length ; i++){
        state.classHidden.push("app--hidden");//For title
        for(let j=0; j < this.props.info[i].paragraph.length ; j++){
            state.classHidden.push("app--hidden");//For paragraphs
        }
    }
    state.classHidden.push("app--hidden");//For mail 
    this.state = state
  }
  componentDidMount(){
    let update = this.state.classHidden;
    update[0] = "app--expose";
    setTimeout(() =>{
    this.setState({classHidden:update});
    },500);
  }
  componentDidUpdate(){
    for(let i=1; i < this.state.classHidden.length; i++){
        if(this.state.classHidden[i] === "app--hidden"){
            let update = this.state.classHidden;
            update[i] = "app--expose";
            setTimeout(() =>{
                this.setState({classHidden:update});
            },500);
            break;
        }
    }
  }
  render() {
    let info = []
    console.log("Create content for profile.")
    let counter = 0;
    info.push(<img key={counter} src={me} className={"app__img " + this.state.classHidden[counter]} alt={"photo"}/>);
    counter++;
    for(let i=0; i < this.props.info.length ; i++){
        info.push(<h1 key={counter} className={"app__title " + this.state.classHidden[counter]}> {this.props.info[i].title} </h1>)
        counter++;
        for(let j=0; j < this.props.info[i].paragraph.length ; j++){
            info.push(
                <p key={counter} className={this.state.classHidden[counter]}>
                    {this.props.info[i].paragraph[j]}
                </p>
            )
            counter++;
        }
    }
    info.push(<img key={counter} onClick={this.props.click} src={mail} className={"app__mail " + this.state.classHidden[counter]} alt={"mail"}/>);
    return (
      <div className="app">
        {info}
      </div>
    );
  }
}

App.defaultProps = {
    click:function(){console.log("Mail Clicked")},
    info: [
        {
            title:"I'm a developer based in glasgow",
            paragraph:[
                "I’m Alexander Morton and Zenith Software is my development company.",
                "I am always your point of contact for all customers. So you always know who yours dealing with and who to blame. Something which makes this company special.",
                "I would describe myself as straight forward, professional and easy going.  However, I leave that up to you when you meet me.  If you would like to disagree contact me."
            ]
        }
    ]
}

export default App;
