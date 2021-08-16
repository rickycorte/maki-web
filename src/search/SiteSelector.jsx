import React from 'react';

class SiteSelector extends React.Component {

    constructor(props) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this)
    }

    onSelectionChange(event) {
        this.props.changeSelectedSite(event.target.value)
    }


    renderBody() {
        let body = []
        this.props.items.forEach( itm => { 
            let id = `site_sel_${Math.floor(Math.random() * 10000)}_${itm.value}`
            body.push(<input type="radio" className="btn-check" id={id} value={itm.value} autoComplete="off" checked={itm.value === this.props.selected_site}/>);
            body.push(<label className="btn btn-outline-danger" for={id}>{itm.text}</label>);
        });
        return body
    }

    render() {

        return (
        <div className="btn-group" style={{padding: "0px"}} role="group" onChange={this.onSelectionChange}>
            { this.renderBody() }
        </div>
        );
    }
}

export default SiteSelector;