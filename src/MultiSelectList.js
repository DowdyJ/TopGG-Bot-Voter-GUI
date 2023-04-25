import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import VMI from './ViewModelInterface'

const ListItem = ({ item, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.listItem, selected ? styles.selected : {}]}
    onPress={onPress}
  >
    <Image source={{ uri: item.botImage }} style={styles.listItemImage} />
    <Text>{item.botName}</Text>
  </TouchableOpacity>
);

const MultiSelectList = ({ setSelectedBots, eventEmitter }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);


    useEffect(() => {
        let botlist = VMI.GetBotList();
        setSelectedBots(selectedIndices.map(index => botlist[index]));
    }, [selectedIndices]);

  const toggleSelection = (index) => {

    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={VMI.GetBotList()}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            selected={selectedIndices.includes(index)}
            onPress={() => toggleSelection(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    height: 200
  },
  listItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 8,
  },
  listItemImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  selected: {
    backgroundColor: '#eee',
  },
});

export default MultiSelectList;
