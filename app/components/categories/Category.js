import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class Category extends React.Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
  };

  render() {
    const { category = {} } = this.props;

    return (
      <div className="bordered bspace">
        <dl className="dl-horizontal">
          <dt>CategoryID</dt>
          <dd>{category.categoryID}</dd>

          <dt>Name</dt>
          <dd>{category.name}</dd>

          <dt>Description</dt>
          <dd>{category.description}</dd>

          <dt>Total products</dt>
          <dd>{category.productConnection.count}</dd>
        </dl>
      </div>
    );
  }
}

export default Relay.createContainer(Category, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        categoryID
        name
        description
        productConnection {
          count
        }
      }
    `,
  },
});
