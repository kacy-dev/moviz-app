
// import React, { useState, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Text,
//   FlatList,
//   Dimensions,
// } from "react-native";
// import { useRouter } from "expo-router";
// const colors = require("@/src/constants/colors");
// import { TextPoppins, TextInter, TextSora } from "@/app/_layout";
// import { Ionicons } from "@expo/vector-icons";
// import Carousel from "react-native-reanimated-carousel";
// import { LinearGradient } from "expo-linear-gradient";
// import { useSearch } from "@/src/store/hooks";
// import ExploreFilterBottomSheet, {
//   FilterState,
// } from "@/src/components/ExploreFilterBottomSheet";



// // <TouchableOpacity onPress={() => setFilterVisible(true)}>
// //   <Ionicons name="options-outline" size={22} color="#8C8C8C" />
// // </TouchableOpacity>

// // <ExploreFilterBottomSheet
// //   visible={filterVisible}
// //   onClose={() => setFilterVisible(false)}
// // />

// import imgOne from "@/assets/images/movie1.png";
// import imgTwo from "@/assets/images/movie2.jpg";
// import imgThree from "@/assets/images/movie3.jpg";

// const { width } = Dimensions.get("window");

// const GENRES = [
//   { key: "action", label: "Action", bg: "#600E0E", border: colors.textColor },
//   { key: "thriller", label: "Thriller", bg: colors.bgDark, border: "#FFDF3380" },
//   { key: "horror", label: "Horror", bg: colors.bgDark, border: "#4CAF5080" },
//   { key: "adventure", label: "Adventure", bg: "#44212A", border: "#D9770680" },
//   { key: "romance", label: "Romance", bg: "rgba(155, 93, 200, 0.50)", border: "#9B5DC880" },
//   { key: "comedy", label: "Comedy", bg: "#1A1A1A", border: "#EF4444" },
// ];

// const TRENDING = [
//   { id: "1", title: "Megan 2.0", image: imgOne },
//   { id: "2", title: "Planet of Apes", image: imgTwo },
//   { id: "3", title: "Avatar", image: imgThree },
//   { id: "4", title: "John Wick", image: imgOne },
//   { id: "5", title: "Inception", image: imgTwo },
//   { id: "6", title: "Interstellar", image: imgThree },
// ];

// const RECENT = [
//   { id: "r1", image: imgTwo },
//   { id: "r2", image: imgThree },
//   { id: "r3", image: imgOne },
//   { id: "r4", image: imgThree },
//   { id: "r5", image: imgOne },
//   { id: "r6", image: imgTwo },
// ];

// export default function Index() {
//   const [active, setActive] = useState<string | null>(null);
//   const carouselRef = useRef<any>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const router = useRouter();
//   const { setSearchQuery, setFilters } = useSearch();
//   const selectedGenres = filters.genre ?? [];

//   const handleGenrePress = (genre: string) => {
//     setSearchQuery(genre);

//     setFilters({
//       genres: [genre],
//       type: "movie",
//     });

//     router.push("/searchScreen");
//   };

//   const [filterVisible, setFilterVisible] = useState(false);
//   const [filters, setFilters] = useState<FilterState>({
//     genres: [],
//     sortBy: "popular",
//     yearRange: [2022, 2025],
//     ratingRange: [3, 10],
//   });

//   const applyFilters = () => {
//     setFilters({
//       ...filters,
//       genre: selectedGenres,
//       year: selectedYear,
//       rating: selectedRating,
//     });
//     onClose();
//   };



//   return (
//     <LinearGradient
//       colors={[colors.bgDark, colors.bgDark]}
//       style={{ flex: 1 }}
//     >
//       <FlatList
//         data={RECENT.slice(0, 6)}
//         keyExtractor={(item) => item.id}
//         numColumns={3}
//         columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 16, backgroundColor: colors.bgDark }}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={
//           <>

//             <TextPoppins style={{ fontSize: 18, fontWeight: 500, color: colors.textColor, marginTop: 60, alignSelf: "center" }}>
//               Explore
//             </TextPoppins>

//             <View style={styles.headerContainer}>
//               <TouchableOpacity style={styles.searchWrapper} onPress={() => router.push("/searchScreen")}>
//                 <Ionicons name="search-outline" size={20} color="#8C8C8C" />
//                 <TextInput placeholder="Search movies, actors, or clips…" placeholderTextColor={"rgba(255, 255, 255, 0.50)"} editable={false} style={styles.input} />
//                 <TouchableOpacity onPress={() => router.push("")}>
//                   <Ionicons name="options-outline" size={22} color="#8C8C8C" />
//                

//                 </TouchableOpacity>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.favoriteBtn} onPress={() => router.push("/favoritesScreen")}>
//                 <Ionicons name="bookmark-outline" size={22} color="#8C8C8C" />
//               </TouchableOpacity>
//             </View>

//             {/* Genres */}
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.containerCarousel}
//               data={GENRES}
//               keyExtractor={(item) => item.key}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => handleGenrePress(item.label)}
//                   style={[
//                     styles.chip,
//                     { backgroundColor: item.bg, borderColor: active === item.key ? colors.textColor : item.border },
//                   ]}
//                 >
//                   <TextInter style={styles.text}>{item.label}</TextInter>
//                 </TouchableOpacity>
//               )}


//             />

//             {/* Carousel */}
//             <Carousel
//               ref={carouselRef}
//               width={width}
//               height={220}
//               data={TRENDING}
//               autoPlay={!isPaused}
//               autoPlayInterval={7000}
//               scrollAnimationDuration={900}
//               loop
//               pagingEnabled
//               onSnapToItem={(index) => setActiveIndex(index)}
//               onScrollBegin={() => {
//                 setIsPaused(true);
//                 setTimeout(() => setIsPaused(false), 7000);
//               }}
//               renderItem={({ item }) => (
//                 <View style={styles.card}>
//                   <Image source={item.image} style={styles.image} />
//                 </View>
//               )}
//             />

//             {/* Dots */}
//             <View style={styles.dots}>
//               {TRENDING.map((_, i) => (
//                 <View key={i} style={[styles.dot, activeIndex === i && styles.dotActive]} />
//               ))}
//             </View>

//             {/* Trending Movies Header */}
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Trending Movies</Text>
//               <TouchableOpacity onPress={() => router.push("/trendingMoviesScreen")}>
//                 <TextInter style={styles.seeAll}>See all</TextInter>
//               </TouchableOpacity>
//             </View>

//             {/* Trending Movies List */}
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={TRENDING.slice(0, 6)}
//               keyExtractor={(item) => item.id}
//               contentContainerStyle={{ paddingHorizontal: 16, gap: 12, marginBottom: 16 }}
//               renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.trendingCard}>
//                   <Image source={item.image} style={styles.trendingImage} />
//                 </TouchableOpacity>
//               )}
//             />

//             {/* Recent Header */}
//             <View style={[styles.sectionHeader, { marginBottom: 10 }]}>
//               <TextInter style={styles.sectionTitle}>Recent</TextInter>
//               <TouchableOpacity onPress={() => router.push("/recentMoviesScreen")}>
//                 <TextInter style={styles.seeAll}>See all</TextInter>
//               </TouchableOpacity>
//             </View>
//           </>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.gridItem}>
//             <Image source={item.image} style={styles.gridImage} />
//           </View>
//         )}
//       />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.bgDark },

//   headerContainer: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 18, marginTop: 24 },
//   searchWrapper: { flex: 1, height: 48, borderRadius: 32, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 8, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.20)" },
//   input: { flex: 1, color: colors.textColor, fontSize: 14 },
//   favoriteBtn: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.20)" },

//   containerCarousel: { paddingHorizontal: 16, gap: 12, marginTop: 10 },
//   chip: { paddingHorizontal: 18, justifyContent: "center", alignItems: "center", borderRadius: 22, borderWidth: 1, height: 30, marginBottom: 24, marginTop: 10 },
//   text: { color: colors.textColor, fontSize: 13, fontWeight: "500" },

//   card: { height: "100%", borderRadius: 16, overflow: "hidden", justifyContent: "center", alignItems: "center" },
//   image: { width: "95%", height: "100%", resizeMode: "cover", borderRadius: 12 },

//   dots: { flexDirection: "row", justifyContent: "center", marginTop: 12, gap: 2 },
//   dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#666" },
//   dotActive: { backgroundColor: colors.textColor },

//   sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
//   sectionTitle: { color: colors.textColor, fontSize: 16, fontWeight: "600", marginVertical: 16 },
//   seeAll: { color: colors.brandYellow, fontSize: 14, fontWeight: "500" },

//   trendingCard: { width: 110 },
//   trendingImage: { width: "100%", height: 150, borderRadius: 10, marginBottom: 6 },
//   trendingText: { color: colors.textColor, fontSize: 13 },

//   gridItem: { width: (width - 16 * 2 - 10 * 2) / 3, aspectRatio: 0.7, borderRadius: 12, overflow: "hidden" },
//   gridImage: { width: "100%", height: "100%", resizeMode: "cover" },
// });



import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
const colors = require("@/src/constants/colors");
import { TextPoppins, TextInter } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { useSearch } from "@/src/store/hooks";
import { Portal } from "react-native-paper";
import ExploreFilterBottomSheet, { FilterState } from "@/src/components/ExploreFilterBottomSheet";

import imgOne from "@/assets/images/movie1.png";
import imgTwo from "@/assets/images/movie2.jpg";
import imgThree from "@/assets/images/movie3.jpg";

const { width } = Dimensions.get("window");

const GENRES = [
  { key: "action", label: "Action", bg: "#600E0E", border: colors.textColor },
  { key: "thriller", label: "Thriller", bg: colors.bgDark, border: "#FFDF3380" },
  { key: "horror", label: "Horror", bg: colors.bgDark, border: "#4CAF5080" },
  { key: "adventure", label: "Adventure", bg: "#44212A", border: "#D9770680" },
  { key: "romance", label: "Romance", bg: "rgba(155, 93, 200, 0.50)", border: "#9B5DC880" },
  { key: "comedy", label: "Comedy", bg: "#1A1A1A", border: "#EF4444" },
];

const TRENDING = [
  { id: "1", title: "Megan 2.0", image: imgOne },
  { id: "2", title: "Planet of Apes", image: imgTwo },
  { id: "3", title: "Avatar", image: imgThree },
  { id: "4", title: "John Wick", image: imgOne },
  { id: "5", title: "Inception", image: imgTwo },
  { id: "6", title: "Interstellar", image: imgThree },
];

const RECENT = [
  { id: "r1", image: imgTwo },
  { id: "r2", image: imgThree },
  { id: "r3", image: imgOne },
  { id: "r4", image: imgThree },
  { id: "r5", image: imgOne },
  { id: "r6", image: imgTwo },
];

export default function Index() {
  const [active, setActive] = useState<string | null>(null);
  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  const { setSearchQuery } = useSearch();

  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    sortBy: "popular",
    yearRange: [2022, 2025],
    ratingRange: [3, 10],
  });

  const selectedGenres = filters.genres ?? [];

  const handleGenrePress = (genre: string) => {
    setSearchQuery(genre);
    setFilters({
      ...filters,
      genres: [genre],
    });
    router.push("/searchScreen");
  };

  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <LinearGradient colors={[colors.bgDark, colors.bgDark]} style={{ flex: 1 }}>
      <FlatList
        data={RECENT.slice(0, 6)}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
          paddingHorizontal: 16,
          backgroundColor: colors.bgDark,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <TextPoppins
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: colors.textColor,
                marginTop: 60,
                alignSelf: "center",
              }}
            >
              Explore
            </TextPoppins>

            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.searchWrapper} onPress={() => router.push("/searchScreen")}>
                <Ionicons name="search-outline" size={20} color="#8C8C8C" />
                <TextInput placeholder="Search movies, actors, or clips…" placeholderTextColor={"rgba(255, 255, 255, 0.50)"} editable={false} style={styles.input} />
                <TouchableOpacity onPress={() => setFilterVisible(true)}>
                  <Ionicons name="options-outline" size={22} color="#8C8C8C" />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={() => router.push("/favoritesScreen")}
              >
                <Ionicons name="bookmark-outline" size={22} color="#8C8C8C" />
              </TouchableOpacity>
            </View>

            {/* Genres */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.containerCarousel}
              data={GENRES}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleGenrePress(item.label)}
                  style={[
                    styles.chip,
                    { backgroundColor: item.bg, borderColor: active === item.key ? colors.textColor : item.border },
                  ]}
                >
                  <TextInter style={styles.text}>{item.label}</TextInter>
                </TouchableOpacity>
              )}
            />

            {/* Carousel */}
            <Carousel
              ref={carouselRef}
              width={width}
              height={220}
              data={TRENDING}
              autoPlay={!isPaused}
              autoPlayInterval={7000}
              scrollAnimationDuration={900}
              loop
              pagingEnabled
              onSnapToItem={(index) => setActiveIndex(index)}
              onScrollBegin={() => {
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 7000);
              }}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={item.image} style={styles.image} />
                </View>
              )}
            />

            {/* Dots */}
            <View style={styles.dots}>
              {TRENDING.map((_, i) => (
                <View key={i} style={[styles.dot, activeIndex === i && styles.dotActive]} />
              ))}
            </View>

            {/* Trending Movies Header */}
            <View style={styles.sectionHeader}>
              <TextInter style={styles.sectionTitle}>Trending Movies</TextInter>
              <TouchableOpacity onPress={() => router.push("/trendingMoviesScreen")}>
                <TextInter style={styles.seeAll}>See all</TextInter>
              </TouchableOpacity>
            </View>

            {/* Trending Movies List */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={TRENDING.slice(0, 6)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12, marginBottom: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.trendingCard}>
                  <Image source={item.image} style={styles.trendingImage} />
                </TouchableOpacity>
              )}
            />

            {/* Recent Header */}
            <View style={[styles.sectionHeader, { marginBottom: 10 }]}>
              <TextInter style={styles.sectionTitle}>Recent</TextInter>
              <TouchableOpacity onPress={() => router.push("/recentMoviesScreen")}>
                <TextInter style={styles.seeAll}>See all</TextInter>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Image source={item.image} style={styles.gridImage} />
          </View>
        )}
      />

      {/* Bottom Sheet */}
      <Portal>
        <ExploreFilterBottomSheet
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={(appliedFilters) => setFilters(appliedFilters)}
        />
      </Portal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgDark },
  headerContainer: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 18, marginTop: 24 },
  searchWrapper: { flex: 1, height: 48, borderRadius: 32, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 8, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.20)" },
  input: { flex: 1, color: colors.textColor, fontSize: 14 },
  favoriteBtn: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.20)" },
  containerCarousel: { paddingHorizontal: 16, gap: 12, marginTop: 10 },
  chip: { paddingHorizontal: 18, justifyContent: "center", alignItems: "center", borderRadius: 22, borderWidth: 1, height: 30, marginBottom: 24, marginTop: 10 },
  text: { color: colors.textColor, fontSize: 13, fontWeight: "500" },
  card: { height: "100%", borderRadius: 16, overflow: "hidden", justifyContent: "center", alignItems: "center" },
  image: { width: "95%", height: "100%", resizeMode: "cover", borderRadius: 12 },
  dots: { flexDirection: "row", justifyContent: "center", marginTop: 12, gap: 2 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#666" },
  dotActive: { backgroundColor: colors.textColor },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
  sectionTitle: { color: colors.textColor, fontSize: 16, fontWeight: "600", marginVertical: 16 },
  seeAll: { color: colors.brandYellow, fontSize: 14, fontWeight: "500" },
  trendingCard: { width: 110 },
  trendingImage: { width: "100%", height: 150, borderRadius: 10, marginBottom: 6 },
  trendingText: { color: colors.textColor, fontSize: 13 },
  gridItem: { width: (width - 16 * 2 - 10 * 2) / 3, aspectRatio: 0.7, borderRadius: 12, overflow: "hidden" },
  gridImage: { width: "100%", height: "100%", resizeMode: "cover" },
});


