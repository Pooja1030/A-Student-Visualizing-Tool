import React, { Component } from 'react';
import DiscreteSlider from "../Components/slider";
import SimpleSelect from "../Components/simpleSelect";
import RangeSlider from '../Components/douleSlider';


class Menu extends Component {
    render() {
        return (
            <div className="menu alert-dark">
                <div className='controls'>

                {/* <RangeSlider
                    isDisabled={this.props.isDisabled}
                /> */}
                <DiscreteSlider
                    default={20}
                    min={5}
                    max={20}
                    step={1}
                    title="Numbers"
                    onCountChange={this.props.onCountChange}
                    isDisabled={this.props.isDisabled}
                />
                <DiscreteSlider
                    default={50}
                    min={10}
                    max={100}
                    step={5}
                    title="Speed"
                    onCountChange={this.props.onSpeedChange}
                    isDisabled={false}
                />
                <SimpleSelect
                    label={"Algorithm"}
                    pos={0}
                    onValueChanged={this.props.onAlgoChanged}
                    items={["Merge Sort","Heap Sort","Quick Sort"]}
                />
                </div>
                <div>
                    <button
                        className='visualize-btn btn-warning btn-lg '
                        onClick={this.props.onVisualize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Sort
                    </button>
                    <button
                        className='reset-btn btn-secondary m-2'
                        onClick={this.props.onRandomize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Randomize
                    </button>
                </div>
            </div>
        );
    }
    isClickable = () => {
        if (this.props.disable) {
            return { cursor: "not-allowed" };
        } else {
            return {};
        }
    }
}


export default Menu;