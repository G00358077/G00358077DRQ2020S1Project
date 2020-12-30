import React from 'react';
import { RecipeMenuList } from './recipeMenuList';
import axios from 'axios';
import { CardDeck } from 'react-bootstrap';

export class Browse extends React.Component {

    constructor(){
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        menuItems: []
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

    render() {
        return (
            <div>
                <CardDeck>
                <RecipeMenuList recipeMenuItems={this.state.menuItems} ReloadData={this.ReloadData}></RecipeMenuList>
                </CardDeck>
            </div>
        );
    }

}