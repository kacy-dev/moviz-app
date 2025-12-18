import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Platform,
  Linking,
  ScrollView,
  SafeAreaViewBase,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useOnboarding, usePermissions } from '../src/store/hooks';
const colors = require('../src/constants/colors');
import { TextSora, TextPoppins } from "../src/components/Fonts";

const { width } = Dimensions.get('window');

const GENRES = [
  'Action 💥',
  'Adventure 🗺️',
  'Animation 🐉',
  'Comedy 😂',
  'Horror 👻',
  'Sci-Fi 👽',
  'Romance ❤️',
  'Thriller 🕵️',
  'Fantasy 🧚',
  'Family 👨‍👩‍👧',
  'Crime 🚓',
  'Musical 🎵',
];

type PermissionStatus = {
  camera: 'pending' | 'granted' | 'denied';
  microphone: 'pending' | 'granted' | 'denied';
  location: 'pending' | 'granted' | 'denied';
};

export default function GenrePreferenceScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPermissions, setShowPermissions] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>({
    camera: 'pending',
    microphone: 'pending',
    location: 'pending',
  });
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);

  const router = useRouter();
  const { setHasOnboarded, setSelectedGenres } = useOnboarding();
  const {
    setCameraPermission,
    setMicrophonePermission,
    setLocationPermission,
    hasRequestedPermissions,
    setHasRequestedPermissions,
    camera,
    microphone,
    location,
  } = usePermissions();

  useEffect(() => {
    if (hasRequestedPermissions) {
      setShowPermissions(false);
      setPermissionStatus({
        camera: camera ? 'granted' : 'denied',
        microphone: microphone ? 'granted' : 'denied',
        location: location ? 'granted' : 'denied',
      });
    }
  }, [hasRequestedPermissions, camera, microphone, location]);

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const granted = status === 'granted';
      setPermissionStatus(prev => ({ ...prev, camera: granted ? 'granted' : 'denied' }));
      setCameraPermission(granted);
      return granted;
    } catch (error) {
      console.error('Camera permission error:', error);
      setPermissionStatus(prev => ({ ...prev, camera: 'denied' }));
      setCameraPermission(false);
      return false;
    }
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      const granted = status === 'granted';
      setPermissionStatus(prev => ({ ...prev, microphone: granted ? 'granted' : 'denied' }));
      setMicrophonePermission(granted);
      return granted;
    } catch (error) {
      console.error('Microphone permission error:', error);
      setPermissionStatus(prev => ({ ...prev, microphone: 'denied' }));
      setMicrophonePermission(false);
      return false;
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setPermissionStatus(prev => ({ ...prev, location: granted ? 'granted' : 'denied' }));
      setLocationPermission(granted);
      return granted;
    } catch (error) {
      console.error('Location permission error:', error);
      setPermissionStatus(prev => ({ ...prev, location: 'denied' }));
      setLocationPermission(false);
      return false;
    }
  };

  const requestAllPermissions = async () => {
    setIsRequestingPermissions(true);

    await requestCameraPermission();
    await new Promise(resolve => setTimeout(resolve, 300));

    await requestMicrophonePermission();
    await new Promise(resolve => setTimeout(resolve, 300));

    await requestLocationPermission();

    setIsRequestingPermissions(false);
    setHasRequestedPermissions(true);
  };

  const handleContinueFromPermissions = () => {
    const allGranted =
      permissionStatus.camera === 'granted' &&
      permissionStatus.microphone === 'granted' &&
      permissionStatus.location === 'granted';

    if (!allGranted) {
      Alert.alert(
        'Permissions Required',
        'Some permissions were denied. You can continue, but you may need to grant them later in Settings for full functionality.',
        [
          { text: 'Go to Settings', onPress: openSettings },
          { text: 'Continue Anyway', onPress: () => setShowPermissions(false) },
        ]
      );
    } else {
      setShowPermissions(false);
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const toggle = (genre: string) => {
    if (selected.includes(genre)) {
      setSelected(selected.filter((g) => g !== genre));
      return;
    }
    if (selected.length < 5) setSelected([...selected, genre]);
  };

  const isActive = selected.length === 5;

  const handleContinue = () => {
    if (!isActive) return;
    setSelectedGenres(selected);
    setHasOnboarded(true);
    router.replace('/auth/successScreen');
  };

  // Permission Request Screen
  // if (showPermissions) {
  //   return (
  //     <View style={[styles.container, { backgroundColor: colors.bgDark }]}>
  //       <View style={styles.permissionContainer}>
  //         <View style={styles.permissionHeader}>
  //           <View style={styles.iconContainer}>
  //             <Ionicons name="shield-checkmark" size={64} color={colors.purple} />
  //           </View>
  //           <Text style={styles.permissionTitle}>Enable Key Features</Text>
  //           <Text style={styles.permissionSubtitle}>
  //             To give you the best movie experience, we need access to:
  //           </Text>
  //         </View>

  //         <View style={styles.permissionList}>
  //           {/* Camera Permission */}
  //           <View style={styles.permissionItem}>
  //             <View style={styles.permissionIcon}>
  //               <Ionicons
  //                 name={
  //                   permissionStatus.camera === 'granted'
  //                     ? 'checkmark-circle'
  //                     : permissionStatus.camera === 'denied'
  //                       ? 'close-circle'
  //                       : 'camera'
  //                 }
  //                 size={32}
  //                 color={
  //                   permissionStatus.camera === 'granted'
  //                     ? '#4CAF50'
  //                     : permissionStatus.camera === 'denied'
  //                       ? '#F44336'
  //                       : colors.purple
  //                 }
  //               />
  //             </View>
  //             <View style={styles.permissionText}>
  //               <Text style={styles.permissionName}>Camera</Text>
  //               <Text style={styles.permissionDescription}>
  //                 Scan movie posters and discover content
  //               </Text>
  //             </View>
  //           </View>

  //           {/* Microphone Permission */}
  //           <View style={styles.permissionItem}>
  //             <View style={styles.permissionIcon}>
  //               <Ionicons
  //                 name={
  //                   permissionStatus.microphone === 'granted'
  //                     ? 'checkmark-circle'
  //                     : permissionStatus.microphone === 'denied'
  //                       ? 'close-circle'
  //                       : 'mic'
  //                 }
  //                 size={32}
  //                 color={
  //                   permissionStatus.microphone === 'granted'
  //                     ? '#4CAF50'
  //                     : permissionStatus.microphone === 'denied'
  //                       ? '#F44336'
  //                       : colors.purple
  //                 }
  //               />
  //             </View>
  //             <View style={styles.permissionText}>
  //               <Text style={styles.permissionName}>Microphone</Text>
  //               <Text style={styles.permissionDescription}>
  //                 Voice search and audio features
  //               </Text>
  //             </View>
  //           </View>

  //           {/* Location Permission */}
  //           <View style={styles.permissionItem}>
  //             <View style={styles.permissionIcon}>
  //               <Ionicons
  //                 name={
  //                   permissionStatus.location === 'granted'
  //                     ? 'checkmark-circle'
  //                     : permissionStatus.location === 'denied'
  //                       ? 'close-circle'
  //                       : 'location'
  //                 }
  //                 size={32}
  //                 color={
  //                   permissionStatus.location === 'granted'
  //                     ? '#4CAF50'
  //                     : permissionStatus.location === 'denied'
  //                       ? '#F44336'
  //                       : colors.purple
  //                 }
  //               />
  //             </View>
  //             <View style={styles.permissionText}>
  //               <Text style={styles.permissionName}>Location</Text>
  //               <Text style={styles.permissionDescription}>
  //                 Find movies showing near you
  //               </Text>
  //             </View>
  //           </View>
  //         </View>

  //         <View style={styles.permissionFooter}>
  //           {permissionStatus.camera === 'pending' &&
  //             permissionStatus.microphone === 'pending' &&
  //             permissionStatus.location === 'pending' ? (
  //             <TouchableOpacity
  //               onPress={requestAllPermissions}
  //               disabled={isRequestingPermissions}
  //             >
  //               <LinearGradient
  //                 colors={[colors.purple, colors.purpleDeep]}
  //                 start={{ x: 0, y: 0.5 }}
  //                 end={{ x: 1, y: 0.5 }}
  //                 style={styles.button}
  //               >
  //                 <Text style={styles.buttonText}>
  //                   {isRequestingPermissions ? 'Requesting...' : 'Grant Permissions'}
  //                 </Text>
  //               </LinearGradient>
  //             </TouchableOpacity>
  //           ) : (
  //             <TouchableOpacity onPress={handleContinueFromPermissions}>
  //               <LinearGradient
  //                 colors={[colors.purple, colors.purpleDeep]}
  //                 start={{ x: 0, y: 0.5 }}
  //                 end={{ x: 1, y: 0.5 }}
  //                 style={styles.button}
  //               >
  //                 <Text style={styles.buttonText}>Continue </Text>
  //               </LinearGradient>
  //             </TouchableOpacity>
  //           )}

  //           <Text style={styles.privacyNote}>
  //             Your privacy matters. We'll only use these permissions to enhance your experience.
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  // Genre Selection Screen
  return (
    <View style={[styles.container, { backgroundColor: colors.bgDark }]}>
      <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace("/(tabs)/home")}>
        <TextSora style={{ color: colors.textColor, fontSize: 16 }}>Skip</TextSora>
      </TouchableOpacity>
      <View style={styles.header}>
        <TextSora style={styles.title}>Pick your favorite genres</TextSora>
        <TextSora style={styles.subtitle}>We'll personalize your experience based on what you love.</TextSora>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <TextSora style={{ color: colors.textColor }}>Select up to 5 favorites</TextSora>
          </>
        }

        data={GENRES}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const active = selected.includes(item);
          return (
            <TouchableOpacity
              onPress={() => toggle(item)}
              style={[styles.genreItem, active && styles.genreItemActive]}
            >
              <TextSora style={[styles.genreText, active && styles.genreTextActive]}>{item}</TextSora>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleContinue} disabled={!isActive}>
          <LinearGradient
            colors={isActive ? [colors.purple, colors.purple] : [colors.inactive, colors.inactive]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.button, !isActive && styles.buttonDisabled]}
          >
            <View style={styles.btnTWrapper}>

              <TextSora style={styles.buttonText}>Continue </TextSora>
              <Ionicons name="arrow-forward" size={24} color={colors.textColor} style={{ opacity: isActive ? 1 : 0 }} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  // Permission Screen Styles
  permissionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  permissionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(160, 32, 240, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    color: colors.textColor,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionSubtitle: {
    color: colors.muted,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  permissionList: {
    gap: 24,
    marginBottom: 40,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  permissionIcon: {
    marginRight: 16,
  },
  permissionText: {
    flex: 1,
  },
  permissionName: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  permissionDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  permissionFooter: {
    alignItems: 'center',
  },
  privacyNote: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    lineHeight: 18,
  },

  // Genre Screen Styles
  header: {
    alignItems: 'center',
    marginBottom: 16,
    // marginTop: 90
  },
  skipBtn: {
    marginTop: 90,
    alignItems: "flex-end",
    marginBottom: 20
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 400,
    maxWidth: 200,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20
  },
  genreItem: {
    flex: 1,
    margin: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  genreItemActive: {
    // backgroundColor: '#2f0f4a',
    borderColor: colors.brandYellow,
  },
  genreText: {
    color: colors.muted,
    fontSize: 13.71,
    fontWeight: 400,
  },
  buttonMuted: {

  },
  buttonActive: {

  },
  genreTextActive: {
    // color: colors.brandYellow, 
    // fontWeight: '700' 
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center'
  },
  button: {
    width: width - 40,
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
  },
  btnTWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.9
  },
  buttonText: {
    color: colors.submitText,
    fontSize: 16,
    fontWeight: '600',
    justifyContent: "center",
    alignItems: "center",
  },
});

