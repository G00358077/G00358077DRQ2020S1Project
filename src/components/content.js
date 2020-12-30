import React from 'react';
import { Carousel, Container, Jumbotron } from 'react-bootstrap';

export class Content extends React.Component {

    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>DRQP Recipe Resource App</h1>
                        <p>
                            This is an made to store, edit and retrieve cooking recipes.
                        </p>
                    </Container>
                    
                </Jumbotron>
                <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.pinimg.com/originals/8c/6f/92/8c6f92a7a26e6dfef1c9e308c243357b.jpg"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.ajar.id/uploads/images/x847._5_Qualities_of_High_Quality_Bakery_Products-AJAR.id-01.jpg.pagespeed.ic.GJanhOoYf3.jpg"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/09/mixed-vegetables.jpg"
                            />
                        </Carousel.Item>
                    </Carousel>
            </div>
        );
    }
}