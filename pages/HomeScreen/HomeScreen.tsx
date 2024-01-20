import React, { useState } from "react";
import Button from "components/Button/Button";
import MovieCard from "components/MovieCard/MovieCard";
import PageLayout from "components/PageLayout";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { COLORS } from "static/colors";

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = () => {
    return <MovieCard />;
  };

  return (
    <PageLayout>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          renderItem={renderItem}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 45, 23]}
          numColumns={2}
        />
      </View>
      {/* <Button type={COLORS.MAIN} label="Details" /> */}
    </PageLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  moviesContainer: {},
});
