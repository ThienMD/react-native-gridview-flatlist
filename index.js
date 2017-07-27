'use strict';

import React from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

var CollectionView = React.createClass({
    groupItems: function(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
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
    renderGroup: function({item}) {
      var that = this;
      var items = item.map(function(obj, index) {
        return that.props.renderItem(obj, index);
      });
      return (
        <View style={styles.group}>
          {items}
        </View>
      );
    },
    render: function() {
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
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

module.exports = CollectionView;
