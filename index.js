'use strict';

import React, {Component} from "react";

import {
  AppRegistry,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
export default class GridView extends Component {

  groupItems (items, itemsPerRow) {
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
  }

  renderGroup= ({ item })=> {
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
  }

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

  }

  render () {
    console.log('props is',this.props.items, this.props.itemsPerRow);
    var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    return (<FlatList
      data={groups}
      {...this.props}
      renderItem={this.renderGroup}
    />);
  }
};


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

