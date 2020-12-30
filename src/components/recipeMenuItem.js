import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

export class RecipeMenuItem extends React.Component {

    constructor() {
        super();

        this.DeleteRecipe = this.DeleteRecipe.bind(this);
    }

    DeleteRecipe(e) {
        e.preventDefault();
        console.log("Delete: " + this.props.recipeMenuItemData._id);

        axios.delete("http://localhost:4000/api/recipes/" + this.props.recipeMenuItemData._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch();
    }

    render() {
        return (
            <div>
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={this.props.recipeMenuItemData.image} />
                    <Card.Body>
                        <Card.Title>{this.props.recipeMenuItemData.name}</Card.Title>
                        <Card.Text>
                            {this.props.recipeMenuItemData.summary}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Time Required: {this.props.recipeMenuItemData.time}</ListGroup.Item>
                        <ListGroup.Item>Difficulty: {this.props.recipeMenuItemData.complexity}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href={"/view/" + this.props.recipeMenuItemData._id}>View</Card.Link>
                        <Card.Link href={"/edit/" + this.props.recipeMenuItemData._id}>Edit</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}