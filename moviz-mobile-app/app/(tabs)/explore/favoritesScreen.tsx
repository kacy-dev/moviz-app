import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins } from "@/app/_layout";
import { useRouter } from "expo-router";

const colors = require("@/src/constants/colors");

import imgOne from "@/assets/images/movie1.png";
import imgTwo from "@/assets/images/movie2.jpg";
import imgThree from "@/assets/images/movie3.jpg";

export const FAVORITES = [
    // {
    //     id: "fav-1",
    //     title: "John Wick: Chapter 4",
    //     genres: ["Action", "Thriller"],
    //     releaseDate: "December 17th, 2025",
    //     rating: 8.4,
    //     image: imgOne,
    // },
    // {
    //     id: "fav-2",
    //     title: "Avatar: The Way of Water",
    //     genres: ["Sci-Fi", "Adventure"],
    //     releaseDate: "December 17th, 2025",
    //     rating: 7.9,
    //     image: imgTwo,
    // },
    // {
    //     id: "fav-3",
    //     title: "Oppenheimer",
    //     genres: ["Drama", "History"],
    //     releaseDate: "December 17th, 2025",
    //     rating: 8.6,
    //     image: imgThree,
    // },
];

export default function FavoritesScreen() {
    const [search, setSearch] = useState("");

    const filteredMovies = useMemo(() => {
        return FAVORITES.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.poster} />

            <View style={styles.details}>
                <TextPoppins style={styles.title} numberOfLines={1}>
                    {item.title}
                </TextPoppins>

                <TextPoppins style={styles.meta}>
                    Genre: <TextPoppins style={styles.meta2}>{item.genres.join(" , ")}</TextPoppins>
                </TextPoppins>

                <TextPoppins style={styles.meta}>
                    Release Date: <TextPoppins style={styles.meta2}>{item.releaseDate} </TextPoppins>
                </TextPoppins>
                <TextPoppins style={styles.meta}>
                    Ratings: ⭐ {item.rating.toFixed(1)}/10
                </TextPoppins>
            </View>

            <TouchableOpacity style={styles.heartWrap}>
                <Ionicons
                    name="heart"
                    size={19}
                    color={colors.brandYellow}
                />
            </TouchableOpacity>
        </View>
    );

    const router = useRouter();

    return (


        <View style={styles.container}>
            <HeaderNav headerTitle="Favorite Movies" router={() => router.back()} />

            <FlatList
                data={FAVORITES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                        <Image source={require("@/assets/images/explore.png")} style={{
                            width: 143,
                            height: 128,
                        }} />
                        <TextPoppins style={styles.emptyText}>No Favorites found</TextPoppins>
                        <TextPoppins style={styles.emptySecond}>Add movies you love to find them easily.</TextPoppins>
                        <TouchableOpacity onPress={() => router.back()} style={{flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: colors.purple, borderRadius: 8, height: 54, paddingVertical: 12, gap: 10, paddingHorizontal: 12, marginTop: 16, width: 254}}>
                            <Ionicons name="search-outline" size={20} color="#fff" />
                            <TextPoppins style={{fontSize: 16, fontWeight: 500, color: colors.textColor}}>Explore Movies</TextPoppins>
                        </TouchableOpacity>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.searchWrapper}>
                            <Ionicons name="search-outline" size={20} color="#8C8C8C" />
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                style={styles.input}
                                value={search}
                                onChangeText={setSearch}
                            />
                        </View>
                    </View>
                }
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            />
        </View>
    );
}


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
        fontWeight: 500,
        marginBottom: 4,
    },

    meta: {
        color: colors.textColor,
        fontSize: 12,
        marginTop: 4,
        fontWeight: 400,
    },
    meta2: {
        color: colors.generalMute,
        fontSize: 12,
        fontWeight: 400,
    },

    heartWrap: {
        width: 45,
        height: 45,
        borderRadius: 32,
        backgroundColor: "rgba(255,255,255,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
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
