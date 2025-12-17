import React, { useMemo, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins } from "@/app/_layout";
import { useRouter } from "expo-router";


const colors = require("@/src/constants/colors");

import imgOne from "@/assets/images/movie1.png";
import imgTwo from "@/assets/images/movie2.jpg";
import imgThree from "@/assets/images/movie3.jpg";

const TRENDING_MOVIES = [
    {
        id: "trend-1",
        title: "John Wick: Chapter 4",
        genres: ["Action", "Thriller"],
        releaseDate: "2025",
        rating: 8.4,
        image: imgOne,
    },
    {
        id: "trend-2",
        title: "Avatar: The Way of Water",
        genres: ["Sci-Fi", "Adventure"],
        releaseDate: "2025",
        rating: 7.9,
        image: imgTwo,
    },
    {
        id: "trend-3",
        title: "Oppenheimer",
        genres: ["Drama", "History"],
        releaseDate: "2025",
        rating: 8.6,
        image: imgThree,
    },
    {
        id: "trend-4",
        title: "Dune: Part Two",
        genres: ["Sci-Fi", "Action"],
        releaseDate: "2025",
        rating: 8.7,
        image: imgOne,
    },
    {
        id: "trend-5",
        title: "The Batman II",
        genres: ["Crime", "Drama"],
        releaseDate: "2025",
        rating: 8.2,
        image: imgTwo,
    },
    {
        id: "trend-6",
        title: "Gladiator II",
        genres: ["Action", "Drama"],
        releaseDate: "2025",
        rating: 7.8,
        image: imgThree,
    },
];

export default function TrendingMoviesScreen() {
    const [visibleCount, setVisibleCount] = useState(3);
    const [search, setSearch] = useState("");
    const [showBottomGradient, setShowBottomGradient] = useState(false);

    const filteredMovies = useMemo(() => {
        return TRENDING_MOVIES.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const visibleMovies = filteredMovies.slice(0, visibleCount);

    const loadMore = () => {
        setVisibleCount((prev) => prev + 3);
        setShowBottomGradient(true);
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <Image source={item.image} style={styles.poster} />

            <View style={styles.details}>
                <TextPoppins style={styles.title} numberOfLines={1}>
                    {item.title}
                </TextPoppins>

                <TextPoppins style={styles.meta}>
                    Genre:{" "}
                    <TextPoppins style={styles.meta2}>
                        {item.genres.join(" , ")}
                    </TextPoppins>
                </TextPoppins>

                <TextPoppins style={styles.meta}>
                    Release Date:{" "}
                    <TextPoppins style={styles.meta2}>
                        {item.releaseDate}
                    </TextPoppins>
                </TextPoppins>

                <TextPoppins style={styles.meta}>
                    Rating: ⭐ {item.rating.toFixed(1)}/10
                </TextPoppins>
            </View>

            <View style={styles.arrowWrap}>
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.generalMute}
                />
            </View>
        </TouchableOpacity>
    );

     const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle="Trending Movies" router={() => router.back()} />

            <FlatList
                data={visibleMovies}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 20,
                    paddingBottom: 140,
                }}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                        <Image source={require("@/assets/images/glass.png")} style={{
                            width: 143,
                            height: 128,
                        }} />
                        <TextPoppins style={styles.emptyText}>No results found</TextPoppins>
                        <TextPoppins style={styles.emptySecond}>Try searching for something else</TextPoppins>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                ListHeaderComponent={
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.searchWrapper}>
                            <Ionicons name="search-outline" size={20} color="#8C8C8C" />
                            <TextInput
                                placeholder="Search movies"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                style={styles.input}
                                value={search}
                                onChangeText={setSearch}
                            />
                        </View>
                    </View>
                }
                ListFooterComponent={
                    visibleCount < filteredMovies.length ? (
                        <TouchableOpacity
                            style={styles.loadMoreBtn}
                            onPress={loadMore}
                            activeOpacity={0.85}
                        >
                            <TextPoppins style={styles.loadMoreText}>
                                Load More
                            </TextPoppins>
                        </TouchableOpacity>
                    ) : null
                }
            />

            {showBottomGradient && (
                <LinearGradient
                    colors={["transparent", "#2D0549"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.bottomGradient}
                    pointerEvents="none"
                />
            )}
        </View>
    );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
    },

    searchWrapper: {
        height: 48,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.20)",
    },

    input: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#333333",
        borderRadius: 16,
        padding: 12,
        gap: 16,
    },

    poster: {
        width: 66,
        height: 88,
        borderRadius: 12,
    },

    details: {
        flex: 1,
    },

    title: {
        color: colors.textColor,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 4,
    },

    meta: {
        color: colors.textColor,
        fontSize: 12,
        marginTop: 4,
    },

    meta2: {
        color: colors.generalMute,
        fontSize: 12,
    },

    arrowWrap: {
        width: 45,
        height: 45,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },

    loadMoreBtn: {
        marginTop: 16,
        marginBottom: 40,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        height: 45,
        borderRadius: 12,
        backgroundColor: "rgba(240, 231, 247, 0.10)",
    },

    loadMoreText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: "500",
    },

    bottomGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 160,
        zIndex: 10,
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
