
import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component{
  state = {
    userData:[],
    searched:'',
    follower:[]
  }
  componentDidMount(){
    console.log('Comp mount');
    axios.get('https://api.github.com/users/billymyers223')
      .then(res =>{
        console.log(res.data);
          this.setState({
            userData: res.data
          })
      }).catch(err =>{console.error(err)})
    axios.get('https://api.github.com/users/billymyers223/followers')
      .then(res =>{
        console.log(res);
        this.setState({
          follower: res.data
        })
      }).catch(err =>{console.error(err)})
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.searched}`)
      .then(res =>{
        this.setState({
          ...this.state,
          userData: res.data
        })
      }).catch(err => {console.error(err)})

      axios.get(`https://api.github.com/users/${this.state.searched}/followers`)
      .then(res =>{
        console.log(res);
        this.setState({
          ...this.state,
          follower: res.data
        })
      }).catch(err =>{console.error(err)})
  }

  handleChange = e =>{
    this.setState({
      ...this.state,
      searched: e.target.value
    })
  }
  render(){
    return (
      <div className = 'cont'>
      <div className="App">
        <h1>Github card</h1>
        <form onSubmit ={this.handleSubmit}>
          <input value ={this.state.searched} onChange ={this.handleChange}/>
          <button>Find User</button>
        </form>
        <div className='user-card'>
          <img width = '100px' src ={this.state.userData.avatar_url} alt= 'user pfp'/>
          <h2>{this.state.userData.name}</h2>
          <h4>{this.state.userData.location}</h4>
          <a href ={this.state.userData.html_url} target='_blank' rel='norefferer'>My Profile!</a>
          <h3>{this.state.userData.bio}</h3>
        </div>
        <h2>Followers:</h2>
        <div className ='followers'>
            {this.state.follower.map(user =>{
              return(<div className ='follower'><h3>{user.login}</h3> <a href = {user.html_url} target ="_blank"> My Profile!</a></div>)
            })}
        </div>
      </div>
      </div>
    );
    }
}

export default App;
