import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todo: '',
      list: [],
      flist: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      list: this.state.list.concat(this.state.todo),
      todo: '',
      flist: this.state.flist.concat(this.state.todo)
    })
    
  }
  handleDelete(e){
    this.setState({
      list: this.state.list.filter((val,index)=>{
        return !(e === index)
      })
    })
  }
  handleChange (e) {
    let t = e.target.name;
    switch(t){
      case 'todo': {
        this.setState({
          todo : e.target.value.toUpperCase()
        })
        break;
      }
      case 'search': {
        let filter = this.state.flist.slice();
        if (e.target.value.length > 0){
          this.setState({
            list: filter.filter((val)=>{
              return (val.indexOf(e.target.value.toUpperCase()) > -1 )
            })
          })
        }else {
          this.setState({
            list: this.state.flist
          })
        }
        console.log(filter)
        break;
      }
      default: {
        console.log('no input found')
      }
    }
    
  }
  render() {
    return (
     <div>
        <h1>To do App</h1>
        <div>
          <form action="" onSubmit={this.handleSubmit}>
           <div>
             Enter todo:
             <input type="text" name="todo" onChange={this.handleChange} value={this.state.todo}/>
           </div>
            <div>
              Filter :
              <input type="text" onChange={this.handleChange}  name="search"/>
            </div>
            <input type="submit" />
          </form>
         <div>
           <ol>
             {
               this.state.list.map((todo,i)=>{
                 return(
                    <li key={i}>
                    {
                    todo
                    }
                    <button className="buttons" onClick={() => this.handleDelete(i)}>X</button>
                  </li>
                  
                  
                 )
               })
             }
           </ol>
         </div>
        </div>
     
     </div>
    );
  }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
