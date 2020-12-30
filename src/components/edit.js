import React from 'react';
import axios from 'axios'
import { Button, Col, Form, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

export class Edit extends React.Component {

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
        this.DeleteRecipe = this.DeleteRecipe.bind(this);



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

    componentDidMount() {
        console.log(this.props.match.params.id);

        axios.get('http://localhost:4000/api/recipes/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Name: response.data.name,
                    List: response.data.ingredients,
                    Complexity: response.data.complexity,
                    Summary: response.data.summary,
                    Time: response.data.time,
                    Instructions: response.data.instructions,
                    Image: response.data.image
                })
                var temp = '';
                for (var i = 0; i < this.state.List.length; i++) {
                    temp = temp.concat(this.state.List[i] + ",");
                }
                this.setState({
                    List: temp
                })
                //converts the list of strings back into a single string to be edited
            })
            .catch((error) => {
                console.log(error);
            });
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

            alert("Recipe Edited" + temp1);

            const newRecipe = {
                name: this.state.Name,
                time: this.state.Time,
                complexity: this.state.Complexity,
                summary: this.state.Summary,
                ingredients: temp1,
                instructions: this.state.Instructions,
                image: this.state.Image
            }
            //here it was important not to convert the list back into a string in case further edits were to be made to it, so instead I just pass on the temporary list

            axios.put('http://localhost:4000/api/recipes/' + this.state._id, newRecipe)
                .then(res => {
                    console.log(res.data)
                })
                .catch((err) => { console.log(err); })
        }
    }

    DeleteRecipe(e) {
        e.preventDefault();
        console.log("Delete: " + this.state.Name);

        axios.delete("http://localhost:4000/api/recipes/" + this.state._id)
            .then(() => {
                this.props.history.replace('/browse')
            })
            .catch();
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
                        <Button variant="primary" type="submit">Update</Button>
                        <br />
                        <br />
                        <Button variant="danger" onClick={this.DeleteRecipe}>Delete</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}