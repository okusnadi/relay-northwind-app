import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from '../Loading';
import { relayStore } from '../../clientStores';
import OrderConnection from './OrderConnection';

export default class ToggleOrderConnection extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      viewer: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.viewer) {
      relayStore.fetch({
        query: Relay.QL`query {
          viewer {
            ${OrderConnection.getFragment('viewer', { filter: this.props.filter })}
          }
        }`,
        variables: { filter: this.props.filter }
      }).then((res) => {
        this.setState({
          viewer: res
        })
      });
    }
  }

  render() {
    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={this.toggle}
          children={this.state.isOpen ? 'hide all' : 'show all'}
        />
        { this.state.isOpen && (
          this.state.viewer
          ? <div className="lrspace bspace bordered">
            <OrderConnection
              hideFilter
              viewer={this.state.viewer}
              filter={this.props.filter}
            />
          </div>
          : <Loading />
        )}
      </span>
    );
  }
}
