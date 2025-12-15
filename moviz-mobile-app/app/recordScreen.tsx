import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const BOX_SIZE = 280;

export default function RecordScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [cameraType, setCameraType] = useState<CameraType>("back");

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  useEffect(() => {
    let tid: NodeJS.Timeout;
    if (isRunning) {
      tid = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => { if (tid) clearInterval(tid); };
  }, [isRunning]);

  const formatTimer = (sec: number) => {
    const mm = Math.floor(sec / 60).toString().padStart(2, "0");
    const ss = (sec % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const pickMediaFromGallery = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photos and videos to upload media.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => {
                // On iOS, you can guide users to settings
                if (Platform.OS === 'ios') {
                  Alert.alert('Please enable photo library access in Settings');
                }
              }
            }
          ]
        );
        return;
      }

      // Launch image picker with both photos and videos
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Both images and videos
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
        videoMaxDuration: 60, // Max 60 seconds for videos
        allowsMultipleSelection: false, // Set to true if you want multiple files
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedMedia = result.assets[0];
        
        // Log the selected media details
        console.log('Selected media details:');
        console.log('Type:', selectedMedia.type); // 'image' or 'video'
        console.log('URI:', selectedMedia.uri);
        console.log('Width:', selectedMedia.width);
        console.log('Height:', selectedMedia.height);
        
        if (selectedMedia.type === 'video') { 
          console.log('Duration:', selectedMedia.duration);
        }

        // Handle the selected media
        // You can:
        // 1. Upload to your server
        // 2. Send to AI for analysis
        // 3. Navigate to a preview screen
        // 4. Store in local state for processing
        
        Alert.alert(
          'Media Selected',
          `${selectedMedia.type === 'video' ? 'Video' : 'Photo'} selected successfully!\n\nYou can now process or upload this ${selectedMedia.type}.`,
          [
            { 
              text: 'Process with AI', 
              onPress: () => {
                // TODO: Implement AI processing
                console.log('Processing with AI:', selectedMedia.uri);
                // You might want to navigate to a processing screen
                // router.push({ pathname: '/process', params: { uri: selectedMedia.uri, type: selectedMedia.type } });
              }
            },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
      }
    } catch (error) {
      console.error('Error picking media:', error);
      Alert.alert('Error', 'Failed to access media library. Please try again.');
    }
  };

  if (!permission) {
    return (
      <View style={styles.containerCentered}>
        <Text style={styles.infoText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.containerCentered}>
        <Text style={styles.infoText}>Camera permission denied.</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={cameraType} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.timerWrapper}>
          <Text style={styles.timerText}>{formatTimer(timer)}</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Camera Overlay */}
      <View style={styles.overlay}>
        <View style={styles.overlayRow} />
        <View style={[styles.overlayRow, styles.middleRow]}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanBoxWrapper}>
            <View style={styles.scanBoxInner} />
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.overlayRow} /> 
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {/* Gallery/Collections Button */}
        <TouchableOpacity 
          style={styles.actionLeft}
          onPress={pickMediaFromGallery}
          activeOpacity={0.7}
        >
          <MaterialIcons name="collections" size={24} color="#fff" />
          <Text style={styles.actionLeftLabel}>Gallery</Text>
        </TouchableOpacity>

        {/* Search AI Button */}
        <TouchableOpacity 
          style={styles.actionCenter}
          onPress={() => {
            // Implement AI search logic
            console.log("Search AI pressed");
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={28} color="#A020F0" />
          <Text style={styles.actionCenterLabel}>Search AI</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity 
          style={styles.actionRight} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  camera: { 
    ...StyleSheet.absoluteFillObject 
  },
  containerCentered: { 
    flex: 1, 
    backgroundColor: "#000", 
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: 20 
  },
  infoText: { 
    color: "#fff", 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 20 
  },
  permissionBtn: { 
    backgroundColor: "#A020F0", 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    borderRadius: 8 
  },
  permissionBtnText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  topBar: { 
    position: "absolute", 
    top: Platform.OS === "ios" ? 60 : 40, 
    left: 16, 
    right: 16, 
    zIndex: 30, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  backBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: "rgba(0,0,0,0.45)", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  timerWrapper: { 
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
    backgroundColor: "rgba(0,0,0,0.45)" 
  },
  timerText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "600" 
  },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    zIndex: 20 
  },
  overlayRow: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.45)" 
  },
  middleRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  sideOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.45)", 
    height: BOX_SIZE 
  },
  scanBoxWrapper: { 
    width: BOX_SIZE, 
    height: BOX_SIZE, 
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "visible" 
  },
  scanBoxInner: { 
    ...StyleSheet.absoluteFillObject, 
    borderRadius: 16, 
    backgroundColor: "rgba(160,32,240,0.25)" 
  },
  corner: { 
    position: "absolute", 
    width: 46, 
    height: 46, 
    borderRadius: 8, 
    borderColor: "#fff", 
    borderLeftWidth: 0, 
    borderTopWidth: 0, 
    borderRightWidth: 3, 
    borderBottomWidth: 3, 
    opacity: 1 
  },
  cornerTopLeft: { 
    left: -12, 
    top: -12, 
    transform: [{ rotate: "180deg" }] 
  },
  cornerTopRight: { 
    right: -12, 
    top: -12, 
    transform: [{ rotate: "-90deg" }] 
  },
  cornerBottomLeft: { 
    left: -12, 
    bottom: -12, 
    transform: [{ rotate: "-270deg" }] 
  },
  cornerBottomRight: { 
    right: -12, 
    bottom: -12 
  },
  bottomBar: { 
    position: "absolute", 
    bottom: Platform.OS === "ios" ? 100 : 30, 
    left: 20, 
    right: 20, 
    zIndex: 40, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 8 
  },
  actionLeft: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: "rgba(0,0,0,0.6)", 
    alignItems: "center", 
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  actionLeftLabel: {
    color: "#fff",
    fontSize: 10,
    marginTop: 2,
    fontWeight: "500",
  },
  actionCenter: { 
    alignItems: "center", 
    justifyContent: "center", 
    width: 110, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: "transparent" 
  },
  actionCenterLabel: { 
    color: "#fff", 
    marginTop: 6, 
    fontSize: 13,
    fontWeight: "600",
  },
  actionRight: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: "rgba(160,32,240,0.95)", 
    alignItems: "center", 
    justifyContent: "center",
    shadowColor: "#A020F0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});