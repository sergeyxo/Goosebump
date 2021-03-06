/** @jsx React.DOM */

var WizardStep1 = React.createClass({
	getOutput: function () {
		return {
			'primaryName': this.refs.primaryName.getDOMNode().value.trim(),
  			'primaryDescription': this.refs.primaryDescription.getDOMNode().value.trim(),
  		};
	},

	render: function () {
		var showProperty = {
			display: this.props.show ? 'block' : 'none'
		};

		return (
			<div className="tab-pane wizard" style={showProperty}>
				<div className="form-group">
					<label className="col-sm-4 control-label">Name</label>
					<div className="col-sm-6">
						<input type="text" className="form-control" placeholder="Enter name" ref="primaryName"/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-4 control-label">Description</label>
					<div className="col-sm-6">
						<input type="text" className="form-control" placeholder="Enter description" ref="primaryDescription"/>
					</div>
				</div>
			</div>
		);
	}
});
var WizardStep2 = React.createClass({
	getOutput: function () {
		var deps = Array.prototype.map.apply(
				    this.refs.dependencies.getDOMNode().querySelectorAll('option[selected="selected"]'),
				    [function (o) { return o.value; }]
				    );

  		var hasDependencies = this.refs.hasDependencies_Yes.getDOMNode().checked 
  							? this.refs.hasDependencies_Yes.getDOMNode().value 
  							: this.refs.hasDependencies_No.getDOMNode().value ;
		return {
			'hasDependencies': hasDependencies,
			'dependencies': this.state.hasDeps ? deps : null
  		};
	},
	getInitialState: function() {
	    return {
	    	hasDeps: false
	    };
  	},
  	setShowDeps: function (e) {
  		console.log('setShowDeps clicked');
  		this.setState({
  			hasDeps: e.target.value == 'Yes' ? true : false
  		});
  	},
	render: function () {
		var showProperty = {
			display: this.props.show ? 'block' : 'none'
		};
		var depsShowProperty = {
			display: this.state.hasDeps ? 'block' : 'none'
		};

		return (
			<div className="tab-pane wizard" style={showProperty}>
				<div className="form-group">
					<label className="col-sm-4 control-label">Dependencies</label>
					<div className="col-sm-6">
						<label className="radio-inline">
							<input type="radio" name="dependencies[]" value="Yes" ref="hasDependencies_Yes" onClick={this.setShowDeps}/> Yes 
						</label>
						<label className="radio-inline">
							<input type="radio" name="dependencies[]" value="No" ref="hasDependencies_No" onClick={this.setShowDeps}/> No
						</label>

					</div>
				</div>
				<div className="form-group" style={depsShowProperty}>
					<label className="col-sm-4 control-label">Select Deps</label>
					<div className="col-sm-6">
						<select className="form-control" multiple ref="dependencies">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
				</div>
			</div>
		);
	}
});
var WizardStep3 = React.createClass({
	getOutput: function () {
		return {
			'subSelection': this.refs.subSelection.getDOMNode().value
  		};
	},
	render: function () {
		var showProperty = {
			display: this.props.show ? 'block' : 'none'
		};

		return (
			<div className="tab-pane wizard" style={showProperty}>
				<div className="form-group">
					<label className="col-sm-4 control-label">Sub-Selection</label>
					<div className="col-sm-6">
						<select className="form-control" ref="subSelection">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
				</div>
			</div>
		);
	}
});
var WizardStep4 = React.createClass({
	getOutput: function() {
		return {
			'secondaryName': this.refs.secondaryName.getDOMNode().value,
  			'secondaryDescription': this.refs.secondaryDescription.getDOMNode().value,
  			'secondaryDisplayName': this.refs.secondaryDisplayName.getDOMNode().value
		};
	},
	render: function () {
		var showProperty = {
			display: this.props.show ? 'block' : 'none'
		};

		return (
			<div className="tab-pane wizard" style={showProperty}>
				<div className="form-group">
					<label className="col-sm-4 control-label">Name</label>
					<div className="col-sm-6">
						<input type="text" className="form-control" placeholder="Enter name" ref="secondaryName"/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-4 control-label">Display Name</label>
					<div className="col-sm-6">
						<input type="text" className="form-control" placeholder="Enter Display Name" ref="secondaryDisplayName"/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-4 control-label">Description</label>
					<div className="col-sm-6">
						<input type="text" className="form-control" placeholder="Enter Description" ref="secondaryDescription"/>
					</div>
				</div>
			</div>
		);
	}
});

var AddNewForm = React.createClass({
  mergeObjects: function () {
  	// http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
    var obj = {},
        i = 0,
        il = arguments.length,
        key;
    for (; i < il; i++) {
        for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                obj[key] = arguments[i][key];
            }
        }
    }
    return obj;
  },
  getInitialState: function() {
    return {
    	selectedPane: 1
    };
  },
  serializeForm: function () {
  	return this.mergeObjects(this.refs.step1.getOutput(), this.refs.step2.getOutput(), 
  							 this.refs.step3.getOutput(), this.refs.step4.getOutput());
  },
  handleNextPane: function () {
  	this.state.selectedPane += 1;

  	if (this.state.selectedPane > 4) {
  		alert('Input Parameters: ' + JSON.stringify(this.serializeForm()));
  		window.location.href = "app.html";
  	}

  	this.setState({
  		selectedPane: this.state.selectedPane
  	});
  },
  render: function() {
    return (
    	<div className="form-horizontal" id="NodeForm" role="form">
    		<div className="tab-content wizard-container">
				<WizardStep1 show={this.state.selectedPane == 1 ? true : false} ref="step1"/>
    			<WizardStep2 show={this.state.selectedPane == 2 ? true : false} ref="step2"/>
    			<WizardStep3 show={this.state.selectedPane == 3 ? true : false} ref="step3"/>
    			<WizardStep4 show={this.state.selectedPane == 4 ? true : false} ref="step4"/>
			</div>
			<div className="form-group">
				<div className="col-sm-offset-4 col-sm-6">
					<button type="submit" className="btn btn-primary btn-lg col-md-6" onClick={this.handleNextPane}>Next</button>
				</div>
			</div>
		</div>
    );
  }
});


React.renderComponent(
  <AddNewForm />,
  document.getElementById('example')
);