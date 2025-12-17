import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextPoppins, TextSora } from "./Fonts";
import { Ionicons } from "@expo/vector-icons";
const colors = require("../constants/colors");

export default function HeaderNav({ headerTitle, router }) {

    return (
        <View style={styles.container} >
            <TouchableOpacity  style={styles.arrowWrapper} onPress={router} >
                <Image  source={require("@/assets/images/arrow-left.png")}/>
            </TouchableOpacity>
            <TextPoppins style={styles.headerTitle} weight="medium">{headerTitle}</TextPoppins>
            <Text></Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },

    headerTitle: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: 500,

    },

    arrowWrapper: {
        backgroundColor: "#333333",
        padding: 10,
        borderRadius: 100,
        height: 45,
        width: 45,
        alignItems: "center",
        justifyContent: "center",
    }
});