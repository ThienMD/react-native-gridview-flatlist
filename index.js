'use strict';

import React from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

var CollectionView = React.createClass({
  groupItems: function (items, itemsPerRow) {
    var itemsGroups = [];
    var group = [];
    items.forEach(function (item) {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      itemsGroups.push(group);
    }

    return itemsGroups;
  },
  renderGroup: function ({ item }) {
    var that = this;
    var items = item.map(function (obj, index) {
      return that.props.renderItem(obj, index);
    });
    items = items.map((obj, i) => {
      return (
        <View style={{ flex: 1 }}>
          {obj}
        </View>)

    })
    return (
      <View style={styles.group}>
        {
          items
        }
        {this.getBlankCell(item.length, this.props.itemsPerRow)
        }

      </View>
    );
  },

  getBlankCell(currentItems, itemsPerRow) {

    if (currentItems < itemsPerRow) {
      var arr = []
      for (var i = 0; i < itemsPerRow - currentItems; i++) {
        arr.push(
          <View style={{ flex: 1 }}>
          </View>
        )
      }
      return arr
    }

  },
  render: function () {
    var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    return (<FlatList
      data={groups}
      {...this.props}
      renderItem={this.renderGroup}
    />);
  },
});


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

module.exports = CollectionView;
