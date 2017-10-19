import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Bg = styled.div`
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    color: black;
    font-family: sans-serif;
    justify-content: center;
    min-height: 100vh;
    min-width: 100vw;
    text-shadow: white 0 0 10px;
    flex-direction: column;
`;

const shake = keyframes`
    0% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    100% { transform: rotate(-10deg); }
`;

const Button = styled.button`
    font-size: 50px;
    background-color: transparent;
    appearance: none;
    border: 0;

    &:focus  {
        outline: none;
    }

    ${props =>
        props.active &&
        `
        animation: .5s ease both reverse infinite ${shake};
    `};
`;

const Title = styled.h1`font-size: 60px;`;

export default class App extends Component {
    state = {
        color: 'white',
        listening: false,
    };

    componentDidMount() {
        const grammar =
            '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;';
        this.recognition = new window.webkitSpeechRecognition();
        const speechRecognitionList = new window.webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = speechRecognitionList;
        this.recognition.lang = 'en-US';
        this.recognition.onresult = this.onResult;
    }

    componentWillUnmount() {
        this.recognition.abort();
    }

    startListening = () => {
        if (this.state.listening) return;
        this.recognition.start();
        this.setState({ listening: true });
    };

    onResult = e => {
        this.setState({
            color: e.results[0][0].transcript,
            listening: false,
        });
    };

    render() {
        return (
            <Bg color={this.state.color}>
                <Button active={this.state.listening} onClick={this.startListening}>
                    🎙
                </Button>
                <Title>Si en farge!</Title>
            </Bg>
        );
    }
}
