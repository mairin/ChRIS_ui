import React from "react";
import PropTypes from "prop-types";
import { IPluginItem } from "../../api/models/pluginInstance.model";
import { Button, Grid, GridItem, Modal } from "@patternfly/react-core";
import { ModelessOverlay, Modal as PF3Modal, Button as PF3Button} from "patternfly-react";
import { ShareAltIcon, InfrastructureIcon } from "@patternfly/react-icons";
import TreeNodeModel, { INode } from "../../api/models/tree-node.model";
import { getPluginInstanceTitle } from "../../api/models/pluginInstance.model";
import PipelineTree from "./PipelineTree";
import { Props } from "tippy.js";
interface INodeProps {
  selected: IPluginItem;
  descendants: IPluginItem[];
}

type State = {
  showOverlay: boolean
};

type AllProps = {
  children: any,
  size: string,
};

export class MockModelessManager extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);
    this.state = { showOverlay: false};
  }
  close = () => {
    this.setState({ showOverlay: false});
  };
  toggleOpen = () => {
    this.setState({ showOverlay: !this.state.showOverlay });
  };
  render() {
    const { children, size } = this.props;
    const defaultBody = (
      <form className = "form-horizontal">
        <div className= "form-group">
          <label className = "col-sm-3 control-label" htmlFor="textInput">
            Field One
          </label>
          <div className = "col-sm-9">
            <input type="text" id="textInput" className="form-control" />
          </div>
        </div>
        <div className= "form-group">
          <label className = "col-sm-3 control-label" htmlFor="textInput2">
            Field One
          </label>
          <div className = "col-sm-9">
            <input type="text" id="textInput" className="form-control" />
          </div>
        </div>
        <div className= "form-group">
          <label className = "col-sm-3 control-label" htmlFor="textInput3">
            Field One
          </label>
          <div className = "col-sm-9">
            <input type="text" id="textInput" className="form-control" />
          </div>
        </div>
      </form>
    );

    return (
      <div>
        <PF3Button bsStyle="primary" bsSize="small" onClick={this.toggleOpen}>
          {this.state.showOverlay ? 'Close Modeless Overlay' : 'Open Modeless Overlay'}
        </PF3Button>

        <ModelessOverlay show={this.state.showOverlay} bsSize={size !== 'default' ? size : null}>
          <PF3Modal.Header>
            <PF3Modal.CloseButton onClick={this.close} />
            <PF3Modal.Title>Modal Overlay Title</PF3Modal.Title>
          </PF3Modal.Header>
          <PF3Modal.Body>{children || defaultBody}</PF3Modal.Body>
          <PF3Modal.Footer>
            <PF3Button bsStyle="default" className="btn-cancel" onClick={this.close}>
              Cancel
            </PF3Button>
            <PF3Button bsStyle="primary" onClick={this.close}>
              Save
            </PF3Button>
          </PF3Modal.Footer>
        </ModelessOverlay>
      </div>
    );
  }
}

export default MockModelessManager;