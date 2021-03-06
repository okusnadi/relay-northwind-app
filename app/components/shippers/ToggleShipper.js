import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from '../Loading';
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
      relayStore.fetch({
        query: Relay.QL`query {
          viewer {
            shipper(filter: $filter) {
              ${Shipper.getFragment('shipper')}
            }
          }
        }`,
        variables: { filter: { shipperID: this.props.id } },
      }).then((res) => {
        this.setState({ data: res.shipper });
      });
    }
  }

  render() {
    return (
      <span>
        {' '}
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
          : <Loading />
        )}
      </span>
    );
  }
}
