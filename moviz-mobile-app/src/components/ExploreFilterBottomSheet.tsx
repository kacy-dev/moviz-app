import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useSearch } from "@/src/store/hooks";

const colors = require("@/src/constants/colors");

const { height, width } = Dimensions.get("window");
const SHEET_HEIGHT = height * 0.8;


const RatingMarker = ({ currentValue }: { currentValue: number }) => {
  return (
    <View style={styles.markerWrapper}>
      <View style={styles.markerBubble}>
        <Text style={styles.markerText}>
          {currentValue.toFixed(1)}
        </Text>
      </View>
      <View style={styles.markerDot} />
    </View>
  );
};

const GENRES = [
  "Action",
  "Adventure",
  "Thriller",
  "Comedy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Drama",
  "Animation",
  "Fantasy",
];

// const GENRES = [
//   { key: "action", label: "Action", bg: "#600E0E", border: colors.textColor },
//   { key: "thriller", label: "Thriller", bg: colors.bgDark, border: "#FFDF3380" },
//   { key: "horror", label: "Horror", bg: colors.bgDark, border: "#4CAF5080" },
//   { key: "adventure", label: "Adventure", bg: "#44212A", border: "#D9770680" },
//   { key: "romance", label: "Romance", bg: "rgba(155, 93, 200, 0.50)", border: "#9B5DC880" },
//   { key: "comedy", label: "Comedy", bg: "#1A1A1A", border: "#EF4444" },
// ];

const SORT_OPTIONS = ["Most Popular", "Most Rated", "Newest"];
const YEAR_OPTIONS = ["2022 - 2025", "2018 - 2025", "2015 - 2025"];

export type FilterState = {
  genres: string[];
  sortBy: string;
  yearRange: [number, number];
  ratingRange: [number, number];
};

export default function ExploreFilterBottomSheet({
  visible,
  onClose,
  onApply,
}: {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const { filters, setFilters, clearFilters } = useSearch();

  const [sortOpen, setSortOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const selectedGenres = filters.genres ?? [];
  const ratingRange = filters.ratingRange ?? [3, 10];
  const sortBy = filters.sortBy ?? "Most Popular";
  const yearRange = filters.yearRange ?? [2022, 2025];

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(onClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 6,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120) closeSheet();
        else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={closeSheet} />

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.sheet, { transform: [{ translateY }] }]}
      >
        <View style={styles.dragHandle} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              clearFilters();
              onApply({
                genres: [],
                sortBy: "Most Popular",
                yearRange: [2022, 2025],
                ratingRange: [3, 10],
              });
            }}
          >
            <Text style={styles.clear}>Clear all</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Filters</Text>

          <TouchableOpacity onPress={closeSheet}>
            <Ionicons name="close" size={22} color={colors.textColor} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* GENRES */}
          <Text style={styles.sectionTitle}>Genre</Text>
          <View style={styles.genreWrap}>
            {GENRES.map((genre) => {
              const active = selectedGenres.includes(genre);
              return (
                <TouchableOpacity
                  key={genre}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      genres: active
                        ? selectedGenres.filter((g) => g !== genre)
                        : [...selectedGenres, genre],
                    })
                  }
                  style={[
                    styles.genreChip,
                    active && styles.genreChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.genreText,
                      active && styles.genreTextActive,
                    ]}
                  >
                    {genre}
                  </Text>
                  {active && (
                    <Ionicons name="close" size={14} color="#fff" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* SORT */}
          <Text style={styles.sectionTitle}>Sort by</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setSortOpen(!sortOpen)}
          >
            <Text style={styles.dropdownText}>{sortBy}</Text>
            <Ionicons name="chevron-down" size={18} color="#999" />
          </TouchableOpacity>

          {sortOpen && (
            <View style={styles.dropdownMenu}>
              {SORT_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => {
                    setSortOpen(false);
                    setFilters({ ...filters, sortBy: opt });
                  }}
                >
                  <Text style={styles.dropdownItem}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* YEAR */}
          <Text style={styles.sectionTitle}>Year</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setYearOpen(!yearOpen)}
          >
            <Text style={styles.dropdownText}>
              {yearRange[0]} - {yearRange[1]}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#999" />
          </TouchableOpacity>

          {yearOpen && (
            <View style={styles.dropdownMenu}>
              {YEAR_OPTIONS.map((yr) => (
                <TouchableOpacity
                  key={yr}
                  onPress={() => {
                    setYearOpen(false);
                    setFilters({
                      ...filters,
                      yearRange:
                        yr === "2022 - 2025"
                          ? [2022, 2025]
                          : [2015, 2025],
                    });
                  }}
                >
                  <Text style={styles.dropdownItem}>{yr}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* RATINGS */}
          <Text style={styles.sectionTitle}>Ratings</Text>

          <View style={styles.rangeHeader}>
            <Text style={styles.rangeText}>{ratingRange[0].toFixed(1)}</Text>
            <Text style={styles.rangeText}>{ratingRange[1].toFixed(1)}</Text>
          </View>

          <View style={styles.sliderContainer}>
            <MultiSlider
              values={ratingRange}
              min={1}
              max={10}
              step={0.1}
              sliderLength={width - 40}
              onValuesChange={(values) =>
                setFilters({
                  ...filters,
                  ratingRange: values as [number, number],
                })
              }
              selectedStyle={{ backgroundColor: colors.purple }}
              unselectedStyle={{ backgroundColor: "#333" }}
              customMarker={(e) => (
                <RatingMarker currentValue={e.currentValue} />
              )}
            />
          </View>
        </ScrollView>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => {
            onApply(filters);
            closeSheet();
          }}
        >
          <Text style={styles.ctaText}>Show Results</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: "#0F0F10",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: 20,
  },

  dragHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#666",
    alignSelf: "center",
    marginVertical: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  clear: {
    color: colors.brandYellow,
    fontSize: 14,
    fontWeight: "500",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },

  genreWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 16,
  },

  genreChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 18,
    backgroundColor: "#1C1C1E",
  },

  genreChipActive: {
    backgroundColor: colors.purple,
  },

  genreText: {
    color: "#fff",
    fontSize: 13,
  },

  genreTextActive: {
    fontWeight: "600",
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#1C1C1E",
  },

  dropdownText: {
    color: "#fff",
    fontSize: 14,
  },

  dropdownMenu: {
    marginHorizontal: 16,
    marginTop: 6,
    borderRadius: 12,
    backgroundColor: "#1C1C1E",
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2C",
  },

  rangeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 6,
  },

  rangeText: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  sliderContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },

  markerWrapper: {
    alignItems: "center",
  },

  markerBubble: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
    minWidth: 36,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  markerText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  markerDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.purple,
  },

  ctaBtn: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  ctaText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
