import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Helmet from 'react-helmet';
import me1 from "./me1.png";
import me2 from "./me2.png";
import me3 from "./me3.png";
import mail from "./mail.png"

class App extends Component {
  constructor(props){
    super(props);
    let state = {classHidden:[]};
    state.classHidden.push("me--hidden");//For photo    
    for(let i=0; i < this.props.info.length ; i++){
        state.classHidden.push("me--hidden");//For title
        for(let j=0; j < this.props.info[i].paragraph.length ; j++){
            state.classHidden.push("me--hidden");//For paragraphs
        }
    }
    state.classHidden.push("me--hidden");//For mail 
    this.state = state
  }
  componentDidMount(){
    let update = this.state.classHidden;
    update[0] = "me--expose";
    setTimeout(() =>{
    this.setState({classHidden:update});
    },500);
  }
  componentDidUpdate(){
    for(let i=1; i < this.state.classHidden.length; i++){
        if(this.state.classHidden[i] === "me--hidden"){
            let update = this.state.classHidden;
            update[i] = "me--expose";
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
    let me = (
        <div key={counter} className={"me__img " + this.state.classHidden[counter]}>
            <img src={me1} alt={"Me"}/>
            <img src={me2} alt={"Me"}/>
            <img src={me3} alt={"Me"}/>
        </div>
    )
    info.push(me);
    counter++;
    for(let i=0; i < this.props.info.length ; i++){
        info.push(<h1 key={counter} className={"me__title " + this.state.classHidden[counter]}> {this.props.info[i].title} </h1>)
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
    info.push(
        <a href={"mailto:"+this.props.email}>
            <img key={counter} src={mail} className={"me__mail " + this.state.classHidden[counter]} alt={"mail"}/>
        </a>
    );
    return (
      <div className="me">
             <Helmet>
                 <title>Freelance Web Designer | Alexander Morton</title>
                <meta name="description" content="My interests, skills and educational background" />
            </Helmet>
        {info}
      </div>
    );
  }
}

App.defaultProps = {
    email:"hello@alexandermorton.co.uk",
    info: [
        {
            title:"I'm a developer based in glasgow",
            paragraph:[
                "I’m Alexander Morton and my passion is designing all types of software, see my services for some of the highlights.",
                "With a background in theoretical and experimental particle physics. I have deep understanding of mathematics, physics and computer science. This allows me to easily move between many different stacks and frameworks.",
                "I went freelance in 2016 and haven't looked back. I love creating beautiful and fully functional web applications. I only produce the best the web can provide. Giving your business the best chance to succeed",
                "I would describe myself as straight forward, professional and easy going.  However, I leave that up to you when you meet me.  If you would like to disagree contact me."
            ]
        }
    ]
}

export default App;
