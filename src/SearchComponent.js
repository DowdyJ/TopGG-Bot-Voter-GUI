import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Button
} from 'react-native';
import VMI from './ViewModelInterface';
import Bot from './Bot';

const SearchResult = ({ entry, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.searchResult, selected ? styles.selected : {}]}
    onPress={onPress}
  >
    <Image source={{ uri: entry.iconUrl }} style={styles.image} />
    <Text>{entry.name}</Text>
  </TouchableOpacity>
);

const SearchComponent = ({ eventEmitter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const debounceTimeout = useRef(null);

  const handleChange = (value) => {
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (value) {
        const response = await fetch(`https://top.gg/api/client/entities/search?platform=discord&entityType=bot&amount=100&nsfwLevel=1&newSortingOrder=TOP&query=${value}&sort=top&isMature=false`, {
          "method": "GET",
          "mode": "cors"
        });

        const data = (await response.json()).results.filter(res => res.type === 'bot');
        setResults(data);
      } else {
        setResults([]);
      }
    }, 500);
  };

  const handleClick = () => {
    VMI.AddBot(new Bot(results[selectedIndex].name, results[selectedIndex].id, results[selectedIndex].iconUrl))
    eventEmitter.emit('updateRegisteredBotList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search For Bots</Text>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={handleChange}
        placeholder="Search..."
      />
      <FlatList
        style={styles.resultList}
        data={results}
        renderItem={({ item, index }) => (
          <SearchResult
            entry={item}
            selected={selectedIndex === index}
            onPress={() => setSelectedIndex(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Register Bot"
        onPress={handleClick}
        disabled={selectedIndex === null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 4,
    marginBottom: 8,
    fontStyle: "italic",
    fontSize: 14
  },
  resultList: {
    height: 300,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selected: {
    backgroundColor: '#eee',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});

export default SearchComponent;
