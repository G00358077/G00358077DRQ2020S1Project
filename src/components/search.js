import React from 'react';
import { RecipeMenuList } from './recipeMenuList';
import axios from 'axios';
import { CardDeck } from 'react-bootstrap';

export class Search extends React.Component {

    constructor(){
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchTerm = this.onSearchTerm.bind(this);
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        searchTerm: '',
        menuItems: [],
        filteredMenuItems: []
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/recipes')
        .then(
            (response)=>{
                this.setState({menuItems:response.data})
            }
        )
        .catch(
            (error)=>{console.log(error)}
        );
    }

    ReloadData(){
        axios.get('http://localhost:4000/api/recipes')
        .then(
            (response)=>{
                this.setState({menuItems:response.data})
            }
        )
        .catch(
            (error)=>{console.log(error)}
        );
    }

    onSearchTerm(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.state.filteredMenuItems = [];
        var temp = [];

        if (this.state.searchTerm == null) {
            alert("Please enter all fields");
        }
        else {
            for (var i = 0; i < this.state.menuItems.length; i++) {
                if (this.state.menuItems[i].name.toLowerCase().includes(this.state.searchTerm.trim().toLowerCase())) {
                    temp.push(this.state.menuItems[i]);
                }
            }
            this.setState({
                filteredMenuItems: temp
            })
        }
        //runs through the list of stored objects' names to check if the search term is contained in any of them, creating a list of matching objects
    }

    render() {
        return (
            <div className='App' >
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Search Term: </label>
                        <input type='text' className='form-control' value={this.state.searchTerm} onChange={this.onSearchTerm}></input>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Search' className='btn btn-primary'></input>
                    </div>
                </form>

                <CardDeck>
                <RecipeMenuList recipeMenuItems={this.state.filteredMenuItems} ReloadData={this.ReloadData}></RecipeMenuList>         
                </CardDeck>     
            </div>
        );
    }

}