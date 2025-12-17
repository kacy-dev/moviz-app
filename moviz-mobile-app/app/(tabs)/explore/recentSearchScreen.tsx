import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    Pressable,
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins, TextInter } from "@/app/_layout";
import { useRouter } from "expo-router";

const colors = require("@/src/constants/colors");

import imgOne from "@/assets/images/movie1.png";
import imgTwo from "@/assets/images/movie2.jpg";
import imgThree from "@/assets/images/movie3.jpg";

const INITIAL_SEARCHES = [
    {
        id: "search-1",
        title: "John Wick: Chapter 4",
        genres: ["Action", "Thriller"],
        releaseDate: "December 17t, 2025",
        rating: 8.4,
        image: imgOne,
    },
    {
        id: "search-2",
        title: "Avatar: The Way of Water",
        genres: ["Sci-Fi", "Adventure"],
        releaseDate: "December 17t, 2025",
        rating: 7.9,
        image: imgTwo,
    },
    {
        id: "search-3",
        title: "Oppenheimer",
        genres: ["Drama", "History"],
        releaseDate: "December 17t, 2025",
        rating: 8.6,
        image: imgThree,
    },
    {
        id: "search-4",
        title: "John Wick: Chapter 4",
        genres: ["Action", "Thriller"],
        releaseDate: "December 17t, 2025",
        rating: 8.4,
        image: imgOne,
    },
    {
        id: "search-5",
        title: "Avatar: The Way of Water",
        genres: ["Sci-Fi", "Adventure"],
        releaseDate: "December 17t, 2025",
        rating: 7.9,
        image: imgTwo,
    },
    {
        id: "search-6",
        title: "Oppenheimer",
        genres: ["Drama", "History"],
        releaseDate: "December 17t, 2025",
        rating: 8.6,
        image: imgThree,
    },
];

export default function RecentSearchesScreen() {
    const [searches, setSearches] = useState(INITIAL_SEARCHES);
    const [menuId, setMenuId] = useState<string | null>(null);
    const [showClearModal, setShowClearModal] = useState(false);

    const scaleAnim = useState(new Animated.Value(0.9))[0];
    const opacityAnim = useState(new Animated.Value(0))[0];

    const openModal = () => {
        setShowClearModal(true);
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start(() => setShowClearModal(false));
    };

    const deleteOne = (id: string) => {
        setSearches((prev) => prev.filter((item) => item.id !== id));
        setMenuId(null);
    };

    const clearAll = () => {
        setSearches([]);
        closeModal();
    };

     const router = useRouter();

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.poster} />

            <View style={styles.details}>
                <TextPoppins style={styles.title} numberOfLines={1}>
                    {item.title}
                </TextPoppins>

                <TextPoppins style={styles.meta}>
                    Genre:{" "}
                    <TextPoppins style={styles.meta2}>
                        {item.genres.join(", ")}
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

            {/* ELLIPSIS */}
            <View>
                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={() =>
                        setMenuId(menuId === item.id ? null : item.id)
                    }
                >
                    <Ionicons
                        name="ellipsis-vertical"
                        size={18}
                        color={colors.generalMute}
                    />
                </TouchableOpacity>

                {/* TOOLTIP */}
                {menuId === item.id && (
                    <View style={styles.tooltip}>
                        <TouchableOpacity
                            style={[styles.tooltipItem ]}
                            onPress={() => deleteOne(item.id)}
                        >
                            <TextInter style={[styles.tooltipText, { color: colors.textColor }]}>
                                Delete
                            </TextInter>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tooltipItem}>
                            <TextInter style={styles.tooltipText}>
                                Add to favorites
                            </TextInter>
                        </TouchableOpacity>

                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle="Recent Searches" router={() => router.back()}/>

            {/* CLEAR ALL */}
            {searches.length > 0 && (
                <View style={styles.clearRow}>
                    <TouchableOpacity onPress={openModal}>
                        <TextPoppins style={styles.clearAll}>Clear all</TextPoppins>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={searches}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 20,
                    paddingBottom: 160,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
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
            />

            <LinearGradient
                colors={["transparent", "#2D0549"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.bottomGradient}
                pointerEvents="none"
            />

            <Modal transparent visible={showClearModal}>
                <Pressable style={styles.modalBackdrop} onPress={closeModal}>
                    <Animated.View
                        style={[
                            styles.modalBox,
                            {
                                opacity: opacityAnim,
                                transform: [{ scale: scaleAnim }],
                            },
                        ]}
                    >
                        <TextInter style={styles.modalTitle}>
                            Delete all Searches ?
                        </TextInter>

                        <TextInter style={styles.modalText}>
                            Once you clear it, You can’t get them back
                        </TextInter>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={{
                                    flex: 1,
                                    padding: 14,
                                    borderRadius: 8,
                                    backgroundColor: "transparent",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: colors.textColor
                                }}
                            >
                                <TextPoppins style={{ color: colors.textColor, fontSize: 16, fontWeight: 500 }}>Cancel</TextPoppins>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={clearAll}
                                style={{
                                    flex: 1,
                                    padding: 14,
                                    borderRadius: 8,
                                    backgroundColor: "#B53737",
                                    alignItems: "center",
                                }}
                            >
                                <TextPoppins style={{ color: colors.textColor, fontSize: 16, fontWeight: 500 }}>Clear all</TextPoppins>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Pressable>
            </Modal>
        </View>
    );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
    },

    clearRow: {
        paddingHorizontal: 16,
        marginTop: 12,
        alignItems: "flex-end",
    },

    clearAll: {
        color: "#EF4444",
        fontSize: 14,
        fontWeight: "500",
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

    menuBtn: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },

    tooltip: {
        position: "absolute",
        right: 0,
        top: 40,
        width: 256,
        borderRadius: 2,
        backgroundColor: "#1C1C1E",
        paddingVertical: 12,
        paddingHorizontal: 16,
        zIndex: 20,
    },

    tooltipItem: {
        paddingVertical: 10,
        // paddingHorizontal: 14,
    },

    tooltipText: {
        color: colors.textColor,
        fontSize: 14,
        fontWeight: 400,
        fontStyle: "normal"
    },

    bottomGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 160,
    },

    emptyWrap: {
        marginTop: 80,
        alignItems: "center",
    },

    emptyText: {
        color: colors.generalMute,
        fontSize: 16,
    },
     emptySecond: {
        color: colors.generalMute,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 400,
        marginTop: 10,
    },

    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "85%",
        backgroundColor: "#1A1A1A",
        borderRadius: 16,
        padding: 20,
    },

    modalTitle: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
        fontStyle: "normal",
    },

    modalText: {
        color: colors.textColor,
        fontSize: 14,
        marginBottom: 16,
        fontWeight: 400,
        textAlign: "center",
    },

    modalActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 16,
    },

    cancelText: {
        color: colors.generalMute,
        fontSize: 14,
    },

    deleteText: {
        color: "#EF4444",
        fontSize: 14,
        fontWeight: "600",
    },
});
