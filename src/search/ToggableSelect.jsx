import React from 'react';

class ToggableSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: "",
            enabled: false
        }

        this.onSelectChange = this.onSelectChange.bind(this)
        this.onEnable = this.onEnable.bind(this)
    }

    onEnable(event) {
        this.updateParentFiler(!this.state.enabled, this.state.selected)

        this.setState(old => ({enabled: !old.enabled}))
    }

    onSelectChange(event) {
        this.setState({select: event.target.value})

        this.updateParentFiler(this.state.enabled, event.target.value )
    }


    updateParentFiler(enable, value) {
        if(this.props.changeValue != null) {
            this.props.changeValue(this.props.filter_name, enable && value !== "", value)
        }
    }

    render() {

        return (
        <div className="form-check form-switch col-12 col-lg-6 col-xxl-3">
            <input className="form-check-input red-checkbox" type="checkbox" onChange={this.onEnable} value={this.state.enabled}></input>
            <label className="form-check-label" >{this.props.top_label}</label>

            <select className="form-select" disabled={!this.state.enabled} onChange={this.onSelectChange}>
                <option selected value="">{ this.props.select_text ? this.props.select_text : "Open this select menu"}</option>
                {
                    this.props.select_options.map((opt, i) => { return <option value={opt.value} selected={opt.value === this.state.selected}>{opt.text}</option>; })
                }
            </select>
        </div>
        );
    }
}

export default ToggableSelect;