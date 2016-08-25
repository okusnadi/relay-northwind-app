import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from 'react-loading';
import { relayStore } from '../../clientStores';
import Shipper from './Shipper';

export default class ToggleShipper extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.data) {
      const query = Relay.createQuery(
        Relay.QL`query {
          viewer {
            shipper(filter: $filter) {
              ${Shipper.getFragment('shipper')}
            }
          }
        }`,
        { filter: { shipperID: this.props.id } }
      );
      relayStore.primeCache({ query }, readyState => {
        if (readyState.done) {
          const data = relayStore.readQuery(query)[0];
          this.setState({ data: data.shipper });
        }
      });
    }
  }

  render() {
    return (
      <span>
        &nbsp;
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          data-id={this.props.id}
          children={this.state.isOpen ? 'close' : 'open'}
        />
        { this.state.isOpen && (
          this.state.data
          ? <div className="lrspace bspace">
            <Shipper shipper={this.state.data} />
          </div>
          : <Loading type="bubbles" color="#3385b5" />
        )}
      </span>
    );
  }
}
