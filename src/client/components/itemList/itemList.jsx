import React from 'react';
import PropTypes from 'prop-types';

//------------------------COMPONENT-----------------------------

class ItemList extends React.Component {

  render() {
        let listItems = this.props.todoList.map((item, index) => {
            if (!item.checked) {
                return (
                    <p key={index}>
                        {item.text}<br/><small>{item.created_at}</small>
                    </p>
                )
            }
        });
        return (
            <div>
                <h4>Pending</h4>
                <div>
                    {listItems}
                </div>
            </div>
        )
    }
}


export default ItemList;

ItemList.propTypes = {
  todoList: PropTypes.array
};