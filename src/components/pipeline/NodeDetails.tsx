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

type PropTypes = {
  node: any,
  string: string
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
        <PF3Button bsStyle="primary" bsSize="large" onClick={this.toggleOpen}>
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

MockModelessManager.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string
};

MockModelessManager.defaultProps = {
  children: null,
  size: 'default'
};

class NodeDetails extends React.Component<INodeProps> {
  // Description: Share pipeline with others ***** Working
  handleSharePipeline() {
    // Stub - To be done
  }

  // Description: Add new node to the feed ***** Working
  handleAddNewNode() {
    
  }

  // Description: root node or leaf nodes in the graph will not have the 'share this pipeline' button
  // Find out from descendants if this node is a leaf or root node
  isNodePipelineRoot(item: IPluginItem ) {
    const { descendants } = this.props;
    return (!TreeNodeModel.isRootNode(item) && !TreeNodeModel.isLeafNode(item, descendants));
  }

  render() {
    const { selected, descendants } = this.props;
    return (
      <React.Fragment>
        <div className="capitalize">
          <label>Selected Node:</label> {getPluginInstanceTitle(selected)}
        </div>
        <Grid>
          <GridItem className="pf-u-p-sm" sm={12} md={6}>
            <PipelineTree items={descendants} selected={selected} />
          </GridItem>
          <GridItem className="pf-u-p-sm" sm={12} md={6}>
            <label>From this node:</label>
            <div className="btn-div">
              <Button
                variant="tertiary"
                isBlock
                onClick={this.handleAddNewNode} >
                <InfrastructureIcon /> Add new node(s)...
              </Button>
              {
                this.isNodePipelineRoot(selected) && (
                  <Button variant="tertiary" isBlock onClick={this.handleSharePipeline}>
                    <ShareAltIcon /> Share this pipeline...
                  </Button>
                )
              }
            </div>
          </GridItem>
        </Grid>
      </React.Fragment>
    );
  }
}

export default NodeDetails;
