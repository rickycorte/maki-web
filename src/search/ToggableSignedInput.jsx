import React from 'react';

class ToggableSignedInput extends React.Component {

    options = [
        { text: ">=",value: "g" },
        { text: "=",value: "e" },
        { text: "<=",value: "l" },
    ]


    constructor(props) {
        super(props);
        this.state = {
            sign: this.options[0].value,
            value: "",
            enabled: false
        }

        this.valueRef = React.createRef();

        this.onEnable = this.onEnable.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
        this.onSignChange = this.onSignChange.bind(this)
        
    }


    onEnable(event) {
        this.updateParentValue(!this.state.enabled, this.state.sign, this.state.value)

        this.setState(old => ({enabled: !old.enabled}))
    }

    onValueChange(event) {
        this.setState({value: event.target.value})

        if(this.checkValueOutOFRangeIfDefined(event.target.value)) {
            this.valueRef.current.classList.add("is-invalid")
            this.setState({feedback: `${this.props.placeholder} should be in range: ${this.props.int_range[0]}-${this.props.int_range[1]}`})
        }
        else {
            this.updateParentValue(this.state.enabled, this.state.sign, event.target.value)
            this.valueRef.current.classList.remove("is-invalid")
        }
    }

    onSignChange(event) {
        this.setState({sign: event.target.value})

        this.updateParentValue(this.state.enabled, event.target.value, this.state.value)
    }

    
    updateParentValue(enabled, sign, value) {
        if(this.props.changeValue != null) {
            let res = ""
            if(sign === "l") res = `l${value+1}` 
            else if (sign === "g") res = `g${value-1}`
            else res = `${sign}${value}`

            this.props.changeValue(this.props.filter_name, enabled && value !== "", res)
        }
    }

    checkValueOutOFRangeIfDefined(value) {
        if(this.props.int_range && value !== "") {
            let parsed = 0;
            try {
                parsed = parseInt(value);
            } catch {
                return true;
            }
            return parsed < this.props.int_range[0] || parsed > this.props.int_range[1];
        }
        return false;
    }

    render() {

        return (
        <div className="form-check form-switch col-12 col-lg-6 col-xxl-3">
            <input className="form-check-input" type="checkbox" value={this.state.enabled} onChange={this.onEnable}></input>
            <label className="form-check-label">{this.props.top_label}</label>
            <div className="input-group mb-3">
                <select className="form-select" disabled={!this.state.enabled} onChange={this.onSignChange}>
                    {
                        this.options.map(itm => {
                            return <option value={itm.value} selected={this.state.sign === itm.value}>{itm.text}</option>;
                        })
                    }
                </select>
                <input type="text" className="form-control" ref={this.valueRef}
                     style={{width: "70%"}} onChange={this.onValueChange} value={this.state.value}
                    placeholder={this.props.placeholder} aria-label={this.props.placeholder} disabled={!this.state.enabled}
                />
            </div>
        </div>
        );
    }
}

export default ToggableSignedInput ;