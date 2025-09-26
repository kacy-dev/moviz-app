import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-green-100 bg-gray-100">Edit app/index.tsx to edit this screen.</Text>

      <Link href="/goods" asChild>
        <TouchableOpacity>
          <Text>Goods</Text>
        </TouchableOpacity>

      </Link>
    </View>
  );
}
