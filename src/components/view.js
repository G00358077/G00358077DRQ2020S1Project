import React from 'react';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Container, Image, Media, Row } from 'react-bootstrap';


export class View extends React.Component {

    constructor() {
        super();

        this.state = {
            Name: '',
            List: [],
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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>

                <Container>
                    <h6>Time: {this.state.Time} / Complexity: {this.state.Complexity}</h6>
                    <Row>

                        <Col><Media>
                            <Media.Body>
                                <h5>{this.state.Name}</h5>
                                <p>
                                    {this.state.Summary}
                                </p>
                                <Card.Header><h6>Ingredients</h6></Card.Header>
                                <ListGroup variant="flush">
                                    {this.state.List.map(listitem => (
                                        <ListGroup.Item>{listitem}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Media.Body>
                        </Media></Col>
                        <Col><Image src={this.state.Image} fluid /></Col>
                    </Row>
                    <br />
                    <Media>
                        <Media.Body>
                            <h5>Instructions</h5>
                            <p>
                                {this.state.Instructions}
                            </p>
                        </Media.Body>
                    </Media>
                </Container>

            </div>
        );
    }

}