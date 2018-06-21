import React from "react";
import ReactDOM from "react-dom";

import ModalContainer from "../../containers/ModalContainer";

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.rootSelector = document.getElementById("root-modal");
    this.container = document.createElement("div");
  }

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(<ModalContainer {...this.props} />, this.container);
  }
}

export default Portal;