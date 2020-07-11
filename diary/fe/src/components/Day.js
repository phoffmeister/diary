import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDay } from "../actions/day";
import { matchPath, Link } from "react-router-dom";
import TextEntries from "./TextEntries";
import DrinkEntries from "./DrinkEntries";
import PhotoEntries from "./PhotoEntries";
import MedicationEntries from "./MedicationEntries";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { createText } from "../actions/text";
import { createPhoto } from "../actions/photo";
import { createMedication, getMedicationOpts } from "../actions/medication";
import { createDrink, getDrinkOpts } from "../actions/drink";

class Day extends Component {
    static propTypes = {
        day: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}`;
        this.state = {
            text: "",
            photo: null,
            time,
            medNameId: 0,
            medAmountId: 0,
            drinkTypeId: 0,
            drinkAmountId: 0
        };
    }

    componentDidMount() {
        const path = this.props.location.pathname;
        const day = matchPath(path, {
            path: "/day/:id/",
            exact: true,
            strict: true
        });
        this.props.getDay(day.params.id);
        this.props.getMedicationOpts();
        this.props.getDrinkOpts();
    }

    handleClick(event) {
        switch (event.target.name) {
            case "textButton":
                this.props.createText({
                    collection: this.props.day.id,
                    text: this.state.text
                });
                break;
            case "photoButton":
                const formData = new FormData();
                formData.append("photo", this.state.photo);
                formData.append("collection", this.props.day.id);
                this.props.createPhoto(formData);
                break;
            case "medButton":
                this.props.createMedication({
                    time: this.state.time,
                    medication: this.state.medNameId,
                    amount: this.state.medAmountId,
                    collection: this.props.day.id
                });
                break;
            case "drinkButton":
                this.props.createDrink({
                    name: this.state.drinkTypeId,
                    amount: this.state.drinkAmountId,
                    collection: this.props.day.id,
                    time: this.state.time
                });
                break;
            default:
                break;
        }
        event.preventDefault();
    }

    handleChange(event) {
        if (event.target.name === "photo") {
            this.setState({
                photo: event.target.files[0]
            });
            return;
        }
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const createTextAccordion = (
            <Card>
                <Accordion.Toggle eventKey="0" as={Card.Header} variant="link">
                    Create Text Entry
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Text</Form.Label>
                                <Form.Control
                                    name="text"
                                    as="textarea"
                                    rows="3"
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Group>
                            <Button
                                name="textButton"
                                size="sm"
                                variant="primary"
                                onClick={e => this.handleClick(e)}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );

        const createPhotoAccordion = (
            <Card>
                <Accordion.Toggle eventKey="1" as={Card.Header} variant="link">
                    Create Photo Entry
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.File
                                    name="photo"
                                    label="Photo"
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Group>
                            <Button
                                name="photoButton"
                                size="sm"
                                variant="primary"
                                onClick={e => this.handleClick(e)}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );

        const createMedicationAccordion = (
            <Card>
                <Accordion.Toggle eventKey="2" as={Card.Header} variant="link">
                    Create Medication Entry
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Medication</Form.Label>
                                <Form.Control
                                    name="medNameId"
                                    as="select"
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="0">---</option>
                                    {this.props.medicationOpts.names.map(
                                        opts => (
                                            <option
                                                key={opts.id}
                                                value={opts.id}
                                            >
                                                {opts.name}
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    name="medAmountId"
                                    as="select"
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="0">---</option>
                                    {this.props.medicationOpts.amounts.map(
                                        opts => (
                                            <option
                                                key={opts.id}
                                                value={opts.id}
                                            >
                                                {opts.amount}
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    name="time"
                                    type="time"
                                    value={this.state.time}
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Group>
                            <Button
                                name="medButton"
                                size="sm"
                                variant="primary"
                                onClick={e => this.handleClick(e)}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );

        const createDrinkAccordion = (
            <Card>
                <Accordion.Toggle eventKey="3" as={Card.Header} variant="link">
                    Create Drink Entry
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Drink</Form.Label>
                                <Form.Control
                                    name="drinkTypeId"
                                    as="select"
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="0">---</option>
                                    {this.props.drinkOpts.types.map(opts => (
                                        <option key={opts.id} value={opts.id}>
                                            {opts.name +
                                                " (" +
                                                opts.tags.join(", ") +
                                                ")"}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    name="drinkAmountId"
                                    as="select"
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="0">---</option>
                                    {this.props.drinkOpts.amounts.map(opts => (
                                        <option key={opts.id} value={opts.id}>
                                            {opts.amount +
                                                " (" +
                                                opts.examples.join(", ") +
                                                ")"}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    name="time"
                                    type="time"
                                    value={this.state.time}
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Group>
                            <Button
                                name="drinkButton"
                                size="sm"
                                variant="primary"
                                onClick={e => this.handleClick(e)}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );

        return (
            <div className="container">
                <Accordion className="mt-2">
                    <Card>
                        <Card.Header>
                            Entries from {this.props.day.date}
                        </Card.Header>
                    </Card>
                    {createTextAccordion}
                    {createPhotoAccordion}
                    {createDrinkAccordion}
                    {createMedicationAccordion}
                </Accordion>
                <div className="mt-2">
                    <TextEntries texts={this.props.day.texts} />
                    <MedicationEntries
                        medications={this.props.day.medications}
                    />
                    <DrinkEntries drinks={this.props.day.drinks} />
                    <PhotoEntries photos={this.props.day.photos} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    day: state.day.day,
    medicationOpts: state.medication.opts,
    drinkOpts: state.drink.opts
});

export default connect(mapStateToProps, {
    getDay,
    createText,
    createPhoto,
    createMedication,
    createDrink,
    getMedicationOpts,
    getDrinkOpts
})(Day);
