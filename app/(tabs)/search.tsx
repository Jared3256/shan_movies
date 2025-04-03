import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }, false));
  let movies_res = movies?.results;

  useEffect(() => {
    const timeoutFunc = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset;
      }
    }, 500);

    return () => clearTimeout(timeoutFunc);
  }, [searchQuery]);

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute z-0 w-full flex-1"
        resizeMode="cover"
      />
      <FlatList
        className="px-5"
        numColumns={3}
        data={movies_res}
        keyExtractor={(items) => items.id.toString()}
        renderItem={(item) => <MovieCard {...item} />}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text_center  text-gray-500">
                {searchQuery.trim() ? "No Movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                value={searchQuery}
                placeholder="Search movies..."
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && <Loading />}
            {moviesError && <Text>Error : {moviesError.message}</Text>}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies_res?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search result for{" "}
                  <Text className="text-accent">{searchQuery.trim()}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
}
