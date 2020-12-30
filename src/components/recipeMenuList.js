import React from 'react';
import { RecipeMenuItem } from './recipeMenuItem';

export class RecipeMenuList extends React.Component {

    render() {
        return this.props.recipeMenuItems.map((recipeMenuItem)=>{
            return <RecipeMenuItem recipeMenuItemData={recipeMenuItem} ReloadData={this.props.ReloadData}></RecipeMenuItem>
        });
    }
}