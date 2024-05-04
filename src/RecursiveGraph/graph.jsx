import React, { Component } from 'react';
import CanvasSvg from "./canvasSVG";
import { getTree } from "./fib";
import Menu from "./menu";
import Navbar from '../Components/navbar';
import Details from "./details";
import SidePanel from './sidepanelg';

class Graph extends Component {
    constructor() {
        super();
        this.state = {
            root: undefined,
            vertices: [],
            edges: [],
            current: -1,
            n: 0,
            r: 2,
            algo: 0,
            offset: 0,
            sidePanelOpen: false, // State variable for side panel visibility
            algorithmSteps: [
                // Define your algorithm steps here
                { code: '// Step 1: Describe the first step' },
                { code: '// Step 2: Describe the second step' },
                { code: '// Step 3: Describe the third step' }
            ]
        }
    }
    // setNumber = (event)=>{
    //     let value = event.target.valueAsNumber;
    //     if(value!== NaN && value<99)
    //         this.setState({inputNumber:value});
    //
    //     // document
    // }
    setAlgo = (pos, val) => {
        if (pos === 0) {
            // console.log("sup 0");
            this.setState({ algo: val });
        }
    }
    setN = (pos, val) => {
        if (pos === 0) {
            // console.log("sup 0");
            this.setState({ n: val });
        }
    }
    setR = (pos, val) => {
        if (pos === 0) {
            // console.log("sup 0");
            this.setState({ r: val });
        }
    }

    toggleSidePanel = () => {
        this.setState(prevState => ({
            sidePanelOpen: !prevState.sidePanelOpen
        }));
    };

    addNumber = () => {
        // console.log(getFibTree(3));
        let tree = getTree(this.state.n, this.state.algo, this.state.r);
        this.setState({ edges: [], vertices: [], offset: tree.x });
        // this.setState.vertices = [];
        // this.setState({});
        this.recur(tree, undefined);

    }
    recur = async (node, parent) => {

        let vertices = this.state.vertices;
        let current = this.state.vertices.length;


        if (parent !== undefined) {
            if (node.children.length)
                vertices.push({
                    label: node.tree.label,
                    val: 0,
                    x: node.x,
                    y: node.y,
                    px: parent.x,
                    py: parent.y
                });
            else
                vertices.push({
                    label:
                        node.tree.label,
                    val: node.tree.node,
                    x: node.x,
                    y: node.y,
                    px: parent.x,
                    py: parent.y
                });
            this.setState({ vertices, current });



            let edges = this.state.edges;
            edges.push({
                x1: parent.x,
                y1: parent.y,
                x2: node.x,
                y2: node.y
            });
            this.setState({ edges });
        } else {
            if (node.children.length)
                vertices.push({
                    label:
                        node.tree.label,
                    val: 0,
                    x: node.x,
                    y: node.y,
                    px: node.x,
                    py: node.y
                });
            else
                vertices.push({
                    label:
                        node.tree.label,
                    val: node.tree.node,
                    x: node.x,
                    y: node.y,
                    px: node.x,
                    py: node.y
                });
            this.setState({ vertices, current });
        }
        await sleep(500);


        for (let i = 0; i < node.children.length; i++) {
            await this.recur(node.children[i], node);
            // let verticess = [...this.state.vertices];
            // verticess[current].val+=node.children[i].tree.node;
            this.setState({ current });
            await sleep(500);
        }
        let verticess = [...this.state.vertices];
        verticess[current].val = node.tree.node;
        this.setState({ vertices: verticess });
    }
    render() {
        return (
            <div>
                <Navbar currentPage="Recursion Tree" />
                <Menu
                    setN={this.setN}
                    setR={this.setR}
                    onAlgoChanged={this.setAlgo}
                    onStart={this.addNumber}
                />
                <Details
                    algo={this.state.algo}
                />
                 {/* Side panel toggle button */}
                 <button className="side-panel-toggle" onClick={this.toggleSidePanel}>Toggle Side Panel</button>
                {/* Side Panel */}
                <SidePanel algorithmSteps={this.state.algorithmSteps} isOpen={this.state.sidePanelOpen} onClose={this.toggleSidePanel} />
                <CanvasSvg
                    vertices={this.state.vertices}
                    edges={this.state.edges}
                    current={this.state.current}
                    offset={this.state.offset}
                />
            </div>
        );
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Graph;