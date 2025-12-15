import { ColorType } from '@shopify/react-native-skia';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
const colors = require("../../../src/constants/colors");


const SCREEN_WIDTH = Dimensions.get("window").width;
const H_PADDING = 20;           // left & right padding
const GAP = 15;                 // space between cards

const CARD_WIDTH = (SCREEN_WIDTH - (H_PADDING * 2) - GAP) / 2;

const movies = [
    {
        id: 1,
        title: "Megan 2.0",
        image: require("../../../assets/images/Frame 43.png"),

    },
    {
        id: 2,
        title: "Planet Of Apes",
        image: require("../../../assets/images/Frame 50.png"),

    },
    {
        id: 3,
        title: "Planet Of Apes",
        image: require("../../../assets/images/Frame 45.png"),

    },
    {
        id: 4,
        title: "Planet Of Apes",
        image: require("../../../assets/images/Frame 51.png"),

    },
    {
        id: 5,
        title: "Planet Of Apes",
        image: require("../../../assets/images/Frame 51.png"),

    },
    {
        id: 6,
        title: "Planet Of Apes",
        image: require("../../../assets/images/Frame 51.png"),

    },
];

export default function Index() {

     const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.playListBtn}>
                    <Image source={require("../../../assets/images/play-list.png")} style={styles.playListButton} />
                    <Text style={styles.tabText}>History</Text>
                </TouchableOpacity>
                <Image source={require("../../../assets/images/MOVIZ.png")} />
                <TouchableOpacity style={styles.topBarBtn}>
                    <LinearGradient
                        colors={[colors.purple, colors.brandYellow]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.topBarBtn}>
                        <Text style={styles.tabText}>6/9</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <View style={styles.homeWrapper}>
                            <Text style={styles.centerTitle}>Tap Circle to Scan a Scene</Text>
                            <TouchableOpacity style={styles.recordBtn} onPress={() => router.push("/recordScreen")}>
                                <View style={styles.recordImgWrapper}>
                                    <Image source={require("../../../assets/images/Ellipse-2.png")} />
                                    <Image source={require("../../../assets/images/Ellipse-6.png")} style={styles.recordBtnImg} />
                                    <Image source={require("../../../assets/images/Ellipse-8.png")} style={styles.recordBtnImg} />
                                    <Image source={require("../../../assets/images/Frame-30.png")} style={styles.recordBtnImg} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.uploadBtn}>
                                <View>
                                    <Image source={require("../../../assets/images/camera-02.png")} />
                                </View>
                                <View>
                                    <Text style={styles.uploadText}>Upload Clips and Photos</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.movieRowHeader}>
                            <Text style={styles.tabText}>Trending Discoveries</Text>
                            <Image source={require("../../../assets/images/sparkles.png")} />
                        </View>
                    </View>
                }

                data={movies}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.movieRow}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 16,
                    gap: 10,
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.movieCard, { width: CARD_WIDTH }]}>
                        <Image source={item.image} style={styles.movieImg} />
                        <Text style={styles.movieText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: colors.bgDark,
        paddingHorizontal: 18,
    },
    homeWrapper: {
        justifyContent: "center",
        alignItems: "center",

    },
    title: {
        fontSize: 22,
        color: '#E8C400',
        fontWeight: '700'
    },
    playListBtn: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    playListButton: {
        width: 24,
        height: 24,
    },
    txtColor: {
        color: colors.textColor
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarBtn: {
        width: 41,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    tabText: {
        color: colors.textColor,
    },
    centerTitle: {
        color: colors.textColor,
        fontWeight: 600,
        fontSize: 20,
        textAlign: "center",
        paddingTop: 25,
        paddingBottom: 15,
    },
    recordBtn: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15,
    },
    recordBtnImg: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    recordImgWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    uploadBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.purple,
        borderRadius: 12,
        gap: 10,
        // paddingVertical: 15,
        height: 54,
        width: 303,
    },
    uploadText: {
        fontWeight: 500,
        fontSize: 16,
        color: colors.textColor,
        textAlign: "center",
    },
    movieRowHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 15,
        gap: 3,
    },
    movieText: {
        color: colors.textColor,
        marginTop: 5,
    },
    movieHText: {
        color: colors.textColor,
        fontSize: 14,
    },
    movieRow: {
        paddingBottom: 30,
    },
    movieCard: {
        overflow: "hidden",
    },
    movieImg: {
        height: 177,
        width: "100%",
        borderRadius: 8,

    }

});
