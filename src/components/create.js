import React from 'react';
import axios from 'axios'
import { Button, Col, Form, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

export class Create extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeList = this.onChangeList.bind(this);
        this.onChangeComplexity = this.onChangeComplexity.bind(this);
        this.onChangeSummary = this.onChangeSummary.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeInstructions = this.onChangeInstructions.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);



        this.state = {
            Name: '',
            List: '',
            Complexity: 'Basic',
            Summary: '',
            Time: '',
            Instructions: '',
            Image: ''
        }
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        })
    }

    onChangeList(e) {
        this.setState({
            List: e.target.value
        })
    }

    onChangeComplexity(e) {
        this.setState({
            Complexity: e.target.value
        })
    }

    onChangeSummary(e) {
        this.setState({
            Summary: e.target.value
        })
    }

    onChangeTime(e) {
        this.setState({
            Time: e.target.value
        })
    }

    onChangeInstructions(e) {
        this.setState({
            Instructions: e.target.value
        })
    }

    onChangeImage(e) {
        this.setState({
            Image: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.Name == null || this.state.List == '') {
            alert("Please enter all fields");
        }
        else {
            var temp = this.state.List;
            var temp1 = [];
            temp = temp.split(",");

            for (var i = 0; i < temp.length; i++) {
                if (temp[i].trim().length > 0) {
                    temp1.push(temp[i].trim());
                }
            }
            //the ingredients are entered as a string which is then split up into a array of strings

            this.state.List = temp1;
            alert("Recipe Created");

            const newRecipe = {
                name: this.state.Name,
                time: this.state.Time,
                complexity: this.state.Complexity,
                summary: this.state.Summary,
                list: this.state.List,
                instructions: this.state.Instructions,
                image: this.state.Image
            }

            axios.post('http://localhost:4000/api/recipes', newRecipe)
                .then((res) => { console.log(res); this.props.history.replace('/browse'); })
                .catch((err) => { console.log(err); });
        }
    }


    render() {
        return (
            <div className='App'>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Recipe Name</Form.Label>
                        <Form.Control required size="lg" type="text" placeholder="Enter name" value={this.state.Name} onChange={this.onChangeName} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Time</Form.Label>
                            <Form.Control required type="test" placeholder="Enter time required" value={this.state.Time} onChange={this.onChangeTime} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Complexity</Form.Label>
                            <Form.Control required as="select" value={this.state.complexity} onChange={this.onChangeComplexity}>
                                <option value={"Basic"}>Basic</option>
                                <option value={"Beginner"}>Beginner</option>
                                <option value={"Intermediate"}>Intermediate</option>
                                <option value={"Expert"}>Expert</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control required size="sm" as="textarea" rows={2} value={this.state.Summary} onChange={this.onChangeSummary} />
                        <Form.Text className="text-muted">Please write a short blurb describing the recipe</Form.Text>
                        <br />
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control required size="sm" as="textarea" rows={2} value={this.state.List} onChange={this.onChangeList} />
                        <Form.Text className="text-muted">Seperate ingredients with a comma eg. "1 litre of milk, 2 eggs"</Form.Text>
                        <br />
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control required size="sm" as="textarea" rows={4} value={this.state.Instructions} onChange={this.onChangeInstructions} />
                        <br />
                        <Form.Label>Photograph</Form.Label>
                        <Form.Control required size="sm" type="text" placeholder="Photograph url here" value={this.state.Image} onChange={this.onChangeImage} />
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}