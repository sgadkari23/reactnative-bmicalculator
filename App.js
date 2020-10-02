/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * Author: Supruya Gadkari
 */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { 
    Container, 
    Button, 
    Text,
    Header,
    Body,
    Title, 
    Content,
    Form,
    Item,
    Label,
    Input, 
    Card,
    Segment,
    H1, 
    View,
    List, 
    ListItem } from 'native-base';

// React native class based component to store state
class App extends Component {

    state = {
        heightcm: '',
        heightft: '',
        heightin: '',
        weight: '',
        bmi: 0,
        metricMode: true,
        errorMessage: ''
    };

    // Handle radio mode button selection of metric mode
    handleModeMetric = () => {
        this.setState({ metricMode: true, heightcm: '', heightft: '', heightin: '', weight: '', bmi: 0 });
    }

    // Handle radio mode button selection of imperial/standard mode
    handleModeImperial = () => {
        this.setState({ metricMode: false, heightcm: '', heightft: '', heightin: '', weight: '', bmi: 0 });
    }

    // Handle submit button click to calculate BMI
    handleSubmit = () => {
        // Check if any input is not a number
        if (isNaN(this.state.heightcm) || isNaN(this.state.heightft) || isNaN(this.state.heightin) || isNaN(this.state.weight))
        {
            this.setState({errorMessage: 'All inputs must be numeric.'});
            return;
        }
        else {
            this.setState({errorMessage: ''});
        }

        // Calculate BMI
        let bmi = 0;
        if(this.state.metricMode)
        {
            bmi = Number(this.state.weight * 100 * 100 / (this.state.heightcm * this.state.heightcm)).toFixed(1);
        }
        else
        {
            let heightimperial = Number(this.state.heightft) * 12 + Number(this.state.heightin);
            console.log("Height:" + heightimperial);
            bmi = Number(this.state.weight * 703 / (heightimperial * heightimperial)).toFixed(1);
        }
        this.setState({ bmi });
    }

    render() {
        return (
            <Container>
                <Header hasSegment>
                    <Body>
                        <Title>BMI Calculator</Title>
                    </Body>
                </Header>

                <Segment>
                    <Button onPress = {this.handleModeMetric} first active={this.state.metricMode}>
                        <Text>Metric</Text>
                    </Button>
                    <Button onPress = {this.handleModeImperial} active={!this.state.metricMode}>
                        <Text>Standard</Text>
                    </Button>
                </Segment>

                <Content style={Styles.parentContainer}>
                    <Form>
                        { this.state.metricMode && 
                            <Item floatingLabel>
                                <Label>Height (cm) </Label>
                                <Input onChangeText = {(heightcm)=>{this.setState({heightcm})}} value={this.state.heightcm.toString()}/>
                            </Item>
                        }
                        { !this.state.metricMode && 
                            <View style={{flexDirection:"row", marginTop:20, marginHorizontal:10}}>
                                <Item style={{flex:1}} floatingLabel>
                                    <Label>Height (ft) </Label>
                                    <Input onChangeText = {(heightft)=>{this.setState({heightft})}} value={this.state.heightft.toString()}/>
                                </Item>
                                <Item style={{flex:1}} floatingLabel>
                                    <Label>Height (in) </Label>
                                    <Input onChangeText = {(heightin)=>{this.setState({heightin})}} value={this.state.heightin.toString()}/>
                                </Item>
                            </View>
                        }
                        <Item floatingLabel last>
                            <Label>Weight {this.state.metricMode?'(Kg)':'(lbs)'} </Label>
                            <Input onChangeText = {(weight)=>{this.setState({weight})}} value={this.state.weight.toString()}/>
                        </Item>
                        <Button primary block style={Styles.submitButton} onPress = {this.handleSubmit}><Text> Calculate BMI </Text></Button>
                    </Form>
                    <Card style={Styles.resultContainer}>
                        <View style={Styles.bmiResultSubContainer}>
                            <Text>Your BMI is </Text> 
                            <H1>{this.state.bmi}</H1>
                        </View>
                        <View style={Styles.intervalSubContainer}>
                            <Text style= {{fontWeight: 'bold'}}>BMI Intervals</Text>
                            <List>
                                <ListItem selected= {this.state.bmi>0 & this.state.bmi<=18.5? true: false}>
                                    <Text>{"Underweight <=18.5"}</Text>
                                </ListItem>
                                <ListItem selected= {this.state.bmi>18.5 & this.state.bmi<=24.9? true: false}>
                                    <Text>{"Normal weight = 18.5–24.9"}</Text>
                                </ListItem>
                                <ListItem selected= {this.state.bmi>=25 & this.state.bmi<=29.9? true: false}>
                                    <Text>{"Overweight = 25–29.9"}</Text>
                                </ListItem>
                                <ListItem selected= {this.state.bmi>=30? true: false}>
                                    <Text>{"Obesity = BMI of 30 or greater"}</Text>
                                </ListItem>
                            </List>
                        </View>
                    </Card>
                    <Text style={Styles.errorMessage}>{this.state.errorMessage}</Text>
                </Content>
            </Container>
        );
    };
}

// Component level styling
const Styles = StyleSheet.create({
    parentContainer: {
        padding: 10
    },
    submitButton: {
        marginTop: 20,
        margin: 10
    },
    resultContainer: {
        padding: 20
    },
    bmiResultSubContainer: {
        alignItems: 'center'
    },
    intervalSubContainer: {
        marginTop: 20
    },
    errorMessage: {
        marginTop: 15,
        color: '#ff414d',
        fontSize: 22,
        alignSelf: 'center'
    }
});

export default App;