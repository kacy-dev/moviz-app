import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TextPoppins } from "@/app/_layout";
import { useSearch } from "@/src/store/hooks";
const colors = require("@/src/constants/colors");


const SEARCH_DATA = [
    {
        id: "1",
        type: "movie",
        title: "Megan 2.0",
        genres: ["Horror", "Action"],
        image: require("@/assets/images/movie1.png"),
    },
    {
        id: "2",
        type: "movie",
        title: "John Wick",
        genres: ["Action", "Thriller"],
        image: require("@/assets/images/movie2.jpg"),
    },
    {
        id: "3",
        type: "movie",
        title: "Avatar",
        genres: ["Adventure", "Sci-fi"],
        image: require("@/assets/images/movie3.jpg"),
    },
];


const FILTERS = ["All", "Movies", "People"];

export default function SearchScreen() {
    const router = useRouter();
    const {
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
    } = useSearch();


    const results = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return SEARCH_DATA.filter((item) => {
            const matchesText =
                query === "" ||
                item.title.toLowerCase().includes(query) ||
                item.genres?.some((g) => g.toLowerCase().includes(query));

            const matchesType =
                filters.type === "all" || item.type === filters.type;

            const matchesGenre =
                filters.genres.length === 0 ||
                filters.genres.some((g) => item.genres?.includes(g));

            return matchesText && matchesType && matchesGenre;
        });
    }, [searchQuery, filters]);

    const handleClearSearch = () => {
        setSearchQuery("");
        setFilters({
            ...filters,
            genres: [],
        });
    };





    return (
        <View style={styles.container}>
            <TextPoppins style={{ fontSize: 18, fontWeight: 500, color: colors.textColor, marginBottom: 24, alignSelf: "center" }}>
                Search
            </TextPoppins>
            <View style={styles.searchRow}>
                <View style={styles.searchInputWrapper}>
                    <Ionicons name="search-outline" size={20} color="#8C8C8C" />

                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search movies or people"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        style={styles.input}
                        autoFocus
                    />

                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => handleClearSearch()}>
                            <Ionicons name="close-circle-outline" size={18} color="#8C8C8C" />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chipsRow}>
                {FILTERS.map((filter) => {
                    const value =
                        filter === "All"
                            ? "all"
                            : filter === "Movies"
                                ? "movie"
                                : "person";

                    return (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => setFilters({ type: value })}
                            style={[
                                styles.chip,
                                filters.type === value && styles.chipActive,
                            ]}
                        >
                            <Text style={styles.chipText}>{filter}</Text>
                        </TouchableOpacity>
                    );
                })}

            </View>

            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                        <Image source={require("@/assets/images/glass.png")} style={{
                            width: 143,
                            height: 128,
                        }} />
                        <Text style={styles.emptyText}>No results found</Text>
                        <Text style={styles.emptySecond}>Try searching for something else</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.resultRow}>
                        <Image source={item.image} style={styles.resultImage} />
                        <View>
                            <Text style={styles.resultTitle}>{item.title}</Text>
                            <Text style={styles.resultType}>
                                {item.type === "movie" ? "Movie" : "Person"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
        paddingTop: 60,
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        gap: 10,
    },

    searchInputWrapper: {
        flex: 1,
        height: 48,
        borderRadius: 32,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },

    input: {
        flex: 1,
        color: colors.textColor,
        fontSize: 14,
    },

    cancel: {
        color: colors.generalMute,
        fontSize: 15,
        fontWeight: "500",
    },

    chipsRow: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 10,
    },

    chip: {
        paddingHorizontal: 18,
        height: 32,
        borderRadius: 20,
        backgroundColor: "#883DBD4D",
        alignItems: "center",
        justifyContent: "center",
    },

    chipActive: {
        backgroundColor: colors.purple,
    },

    chipText: {
        color: colors.textColor,
        fontSize: 13,
    },

    chipTextActive: {
        color: colors.textColor,
        fontWeight: "600",
    },

    listContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    resultRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
        alignItems: "center",
    },

    resultImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },

    resultTitle: {
        color: colors.textColor,
        fontSize: 15,
        fontWeight: "500",
    },

    resultType: {
        color: colors.generalMute,
        fontSize: 12,
        marginTop: 2,
    },

    emptyText: {
        color: colors.textColor,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 600,

    },

    emptySecond: {
        color: colors.generalMute,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 400,
        marginTop: 10,
    },
});
