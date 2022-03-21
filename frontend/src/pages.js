import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './App.css';
import {Link, useLocation} from "react-router-dom"
import Emoji from 'a11y-react-emoji'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from "react-bootstrap/Dropdown"
import Card from 'react-bootstrap/Card'
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import CardGroup from 'react-bootstrap/CardGroup'
import FormControl from "react-bootstrap/FormControl"
import FormGroup from "react-bootstrap/esm/FormGroup";

let listOfPlayers = []
let team1 = []

export function Home({movies, setMovies}) {
    return (
        <div className="App">
            {Navigation()} 
            <Container className="text-center" Style={{ padding:"20px"}}>
            <Row style={{ padding:"25px"}}>
                <h1>Home Page</h1>   
            </Row>
            <Row style={{ padding:"10px"}}>
                <h4>Random Team Generator</h4>
            </Row>    
            <Row>
                <p>Make a team</p> 
            </Row>
            </Container>
        </div>
    );
}

export function ViewTeams({teams, setTeams}) {
    console.log(teams)

    function handleRemove(id, event) {
        console.log(id)
        const remove = async () => {
            const result = await  fetch("/api/removeTeam",{
                method: "POST",
                body: JSON.stringify({_id: id}),
                headers:{"Content-Type": "application/json",}
            });
            const body = await result.json();
            console.log(body);
            setTeams(body.teams)
        }
        remove();
        //window.location.reload(false);
      }

    return (
        <div className="App">
            {Navigation()}   
            <Container>
                <Row className="text-center" style={{ padding:"25px"}}>
                <h1>View All Teams</h1> 
               </Row>
            </Container>       
            <Row xs={1} md={3} className="g-4">
            { teams.map( (team) => (
                <CardGroup>
                    <Card>
                        {/*<Card.Img variant="top" src={"./images/" + movie.poster}  />*/}
                        <Card.Body>
                        <Card.Title>{team.teamName}</Card.Title>
                        <Card.Text>
                            <p>Id: {team._id}</p>
                            <p>Players: {team.players}</p>
                            <p>Wins: {team.wins}</p>
                            <p>Losses: {team.losses}</p>
                            <p>Losses: {team.ties}</p>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="danger" className="delete" onClick={() => handleRemove(team._id)}>Delete</Button>
                        </Card.Footer>                
                    </Card>
                </CardGroup>
            ))}   
            </Row>        
        </div>
    );
}

export function AddTeam({teams, setTeams, playersAdded, setPlayersAdded}) {
    console.log(playersAdded)
    let team2 = []
    let team3 = []
    console.log(listOfPlayers)

    const handleSubmit = (player) => {

        {/*event.preventDefault();*/}

        const add = async () => {

            const result = await  fetch('/api/addTeam',{
                method: "POST",
                body: JSON.stringify({teamName: "testing Team Name", players: player, wins: 0, losses: 0, ties: 0}),
                headers:{"Content-Type": "application/json",}
            });
            const body = await result.json();
            console.log(body);
            setTeams(body.movies)
        }
        add();
        const clear = async () => {

            const result = await  fetch('/api/clearAddPlayer',{
                method: "POST",
               
                headers:{"Content-Type": "application/json",}
            });
            const body = await result.json();
            console.log(body);
           
        }
        clear();



        console.log(`Players ${player}`)  
      }



    const numberOfTeams = (event) => {
        const teamAmount = document.getElementById("teamAmount").value
        console.log(teamAmount)
        const numberOfPlayers = listOfPlayers.length
        console.log("amount players", numberOfPlayers)

        const playersOnTeam = Math.ceil(numberOfPlayers / teamAmount)
        console.log("amount players on team ", playersOnTeam)

        for(let i=0; i < teamAmount; i++){
            team1.push([])
        }
        console.log(team1)
        for(let player of  listOfPlayers){           
            place(player, playersOnTeam, teamAmount)
        }
        console.log(team1)
        for(let i=0; i <team1.length; i++){
            handleSubmit(team1[i])
        }
        event.preventDefault()
    }

    const place = (player, playersOnTeam, teamAmount) => {
        let number = Math.floor(Math.random() * teamAmount)
        let p = team1[number]
        console.log(p)
        if(p.length < playersOnTeam){
            p.push(player)
        }else{
            place(player, playersOnTeam, teamAmount)
        }
    }
    return (
        <div className="App">
            {Navigation()} 
            <Container className="text-center">
            <Row style={{ padding:"25px"}}>
                <h1>Add Team</h1>
            </Row>
            <p>Add player.</p>
            </Container>
            <Container >

            <Row xs={1} md={3} className="g-4">
            { playersAdded.map( (player) => (           
                <p>Players: {player.playerName}</p>
            ))}   
            </Row>    
                <Form onSubmit={addName} >
                    <Row className="mb-3">
                        <FormGroup as={Col}>
                            <Form.Label>Player Name</Form.Label>
                            <Form.Control type="text" id="player" required/>
                        </FormGroup>
                    </Row>                 
                    <Button variant="primary" type="submit" >
                        Add player
                    </Button>
                </Form>
            </Container>

            <Container >
                <Form onSubmit={numberOfTeams} >
                    <Row className="mb-3">
                        <FormGroup as={Col}>
                        <Col xs="auto">
                            <Form.Label>Amount of teams</Form.Label>
                            <Form.Select type="text" id="teamAmount" required>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Select>
                        </Col>
                           
                        </FormGroup>
                      
                    </Row>                 
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </Container>


        </div>
    );
};

export function PageNotFound() {
    let location = useLocation();
    return (
        <div className="App">
            <nav>
                <Link to="/">View All Reviews</Link>
            </nav>
            <nav>
                <Link to="addReview">Add a Review</Link>
            </nav>
            <h1>Error, this page does not exist!</h1>
            <h2>{location.pathname}</h2>
        </div>
    );
}

export function Navigation(){
    return(
        <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="">Random Team Generator</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="viewTeams">See Teams</Nav.Link>
                        <Nav.Link href="addTeam">Add Team</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export function addName(event){
    const player = document.getElementById("player").value
    console.log(player)
    listOfPlayers.push(player)
    console.log(listOfPlayers)
    const add = async () => {

        const result = await  fetch('/api/addPlayer',{
            method: "POST",
            body: JSON.stringify({playerName: player}),
            headers:{"Content-Type": "application/json",}
        });
        const body = await result.json();
        console.log(body);
    }
    add();
    event.preventDefault()
}




