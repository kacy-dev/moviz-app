// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState, useRef, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     Dimensions,
//     Alert,
//     Modal,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { usePermissions } from '@/src/store/hooks';
// import { useFeatureOnboarding } from '@/src/store/hooks';

// const colors = require("../../../src/constants/colors");

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const H_PADDING = 20;
// const GAP = 15;
// const CARD_WIDTH = (SCREEN_WIDTH - (H_PADDING * 2) - GAP) / 2;

// const movies = [
//     {
//         id: 1,
//         title: "Megan 2.0",
//         image: require("../../../assets/images/Frame 43.png"),
//     },
//     {
//         id: 2,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 50.png"),
//     },
//     {
//         id: 3,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 45.png"),
//     },
//     {
//         id: 4,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 5,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 6,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
// ];

// const onboardingSteps = [
//     {
//         title: 'How to Record',
//         description: 'Hold your device steady and tap the record button when ready',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
//     {
//         title: 'Capture the Scene',
//         description: 'Point at the movie or show you\'re watching',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
//     {
//         title: 'Save Your Discovery',
//         description: 'Your clip will be saved and you can view it later',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
// ];

// export default function Index() {
//     const router = useRouter();
//     const { canRecord, requestCameraAndMic } = usePermissions();
//     const {
//         shouldShowPermissionAlert,
//         shouldShowRecordOnboarding,
//         setRecordPermissionRequested,
//         setRecordOnboardingSeen,
//     } = useFeatureOnboarding();

//     const [showOnboardingSheet, setShowOnboardingSheet] = useState(false);
//     const [onboardingStep, setOnboardingStep] = useState(0);
//     const [countdown, setCountdown] = useState<number | null>(null);

//     // Step 1: Handle record button press
//     const handleRecordPress = async () => {
//         // If permission alert needs to be shown
//         if (shouldShowPermissionAlert) {
//             Alert.alert(
//                 'Camera & Microphone Access',
//                 'MOVIZ needs access to your camera and microphone to record video scenes.',
//                 [
//                     {
//                         text: "Don't Allow",
//                         onPress: () => {
//                             setRecordPermissionRequested();
//                             // User denied, don't proceed
//                         },
//                         style: "cancel",
//                     },
//                     {
//                         text: 'Allow',
//                         onPress: async () => {
//                             setRecordPermissionRequested();
//                             const granted = await requestCameraAndMic();

//                             if (granted) {
//                                 // Permissions granted, show onboarding
//                                 setShowOnboardingSheet(true);
//                                 setOnboardingStep(0);
//                             } else {
//                                 Alert.alert('Permissions Denied', 'Please enable camera and microphone permissions in settings to record.');
//                             }
//                         },
//                     },
//                 ]
//             );
//             return;
//         }

//         // If already requested permissions but haven't seen onboarding
//         if (shouldShowRecordOnboarding) {
//             setShowOnboardingSheet(true);
//             setOnboardingStep(0);
//             return;
//         }

//         // Already have permissions and saw onboarding, just start countdown
//         if (canRecord) {
//             startCountdown();
//         }
//     };

//     // Step 2: Handle onboarding completion
//     const handleOnboardingComplete = () => {
//         setShowOnboardingSheet(false);
//         setRecordOnboardingSeen();
//         startCountdown();
//     };

//     // Step 3: Countdown and navigate
//     const startCountdown = () => {
//         setCountdown(3);
//         const interval = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev === 1) {
//                     clearInterval(interval);
//                     setCountdown(null);
//                     router.push('/recordScreen');
//                     return null;
//                 }
//                 return (prev ?? 3) - 1;
//             });
//         }, 1000);
//     };

//     const handleNextStep = () => {
//         if (onboardingStep < onboardingSteps.length - 1) {
//             setOnboardingStep(onboardingStep + 1);
//         }
//     };

//     const handlePrevStep = () => {
//         if (onboardingStep > 0) {
//             setOnboardingStep(onboardingStep - 1);
//         }
//     };

//     const isLastStep = onboardingStep === onboardingSteps.length - 1;
//     const isFirstStep = onboardingStep === 0;

//     return (
//         <View style={styles.container}>
//             <View style={styles.topBar}>
//                 <TouchableOpacity style={styles.playListBtn}>
//                     <Image source={require("../../../assets/images/play-list.png")} style={styles.playListButton} />
//                     <Text style={styles.tabText}>History</Text>
//                 </TouchableOpacity>
//                 <Image source={require("../../../assets/images/MOVIZ.png")} />
//                 <TouchableOpacity style={styles.topBarBtn}>
//                     <LinearGradient
//                         colors={[colors.purple, colors.brandYellow]}
//                         start={{ x: 0, y: 0.5 }}
//                         end={{ x: 1, y: 0.5 }}
//                         style={styles.topBarBtn}>
//                         <Text style={styles.tabText}>6/9</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 ListHeaderComponent={
//                     <View>
//                         <View style={styles.homeWrapper}>
//                             <Text style={styles.centerTitle}>Tap Circle to Scan a Scene</Text>

//                             {/* Record Button with Countdown or Recording Icon */}
//                             <TouchableOpacity
//                                 style={styles.recordBtn}
//                                 onPress={handleRecordPress}
//                                 disabled={countdown !== null}
//                             >
//                                 <View style={styles.recordImgWrapper}>
//                                     <Image source={require("../../../assets/images/Ellipse-2.png")} />
//                                     <Image source={require("../../../assets/images/Ellipse-6.png")} style={styles.recordBtnImg} />
//                                     <Image source={require("../../../assets/images/Ellipse-8.png")} style={styles.recordBtnImg} />

//                                     {countdown !== null ? (
//                                         <Text style={styles.countdownText}>{countdown}</Text>
//                                     ) : (
//                                         <Image source={require("../../../assets/images/Frame-30.png")} style={styles.recordBtnImg} />
//                                     )}
//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={styles.uploadBtn}>
//                                 <View>
//                                     <Image source={require("../../../assets/images/camera-02.png")} />
//                                 </View>
//                                 <View>
//                                     <Text style={styles.uploadText}>Upload Clips and Photos</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.movieRowHeader}>
//                             <Text style={styles.tabText}>Trending Discoveries</Text>
//                             <Image source={require("../../../assets/images/sparkles.png")} />
//                         </View>
//                     </View>
//                 }
//                 data={movies}
//                 keyExtractor={(item) => item.id.toString()}
//                 numColumns={2}
//                 contentContainerStyle={styles.movieRow}
//                 columnWrapperStyle={{
//                     justifyContent: "space-between",
//                     marginBottom: 16,
//                     gap: 10,
//                 }}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={[styles.movieCard, { width: CARD_WIDTH }]}>
//                         <Image source={item.image} style={styles.movieImg} />
//                         <Text style={styles.movieText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 )}
//             />

//             {/* Custom Onboarding Modal */}
//             <Modal
//                 visible={showOnboardingSheet}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={() => setShowOnboardingSheet(false)}
//             >
//                 <View style={styles.overlay}>
//                     <View style={styles.modalContainer}>
//                         {/* Close Button */}
//                         <TouchableOpacity
//                             style={styles.closeBtn}
//                             onPress={() => setShowOnboardingSheet(false)}
//                         >
//                             <Text style={styles.closeBtnText}>✕</Text>
//                         </TouchableOpacity>

//                         {/* Content */}
//                         <View style={styles.contentContainer}>
//                             <Image
//                                 source={onboardingSteps[onboardingStep].image}
//                                 style={styles.onboardingImage}
//                             />
//                             <Text style={styles.onboardingTitle}>
//                                 {onboardingSteps[onboardingStep].title}
//                             </Text>
//                             <Text style={styles.onboardingDescription}>
//                                 {onboardingSteps[onboardingStep].description}
//                             </Text>

//                             {/* Dot Indicators */}
//                             <View style={styles.dotsContainer}>
//                                 {onboardingSteps.map((_, index) => (
//                                     <View
//                                         key={index}
//                                         style={[
//                                             styles.dot,
//                                             index === onboardingStep && styles.activeDot,
//                                         ]}
//                                     />
//                                 ))}
//                             </View>
//                         </View>

//                         {/* Buttons Container */}
//                         <View style={styles.buttonsContainer}>
//                             {/* Navigation Buttons */}
//                             <View style={styles.navButtonsRow}>
//                                 <TouchableOpacity
//                                     onPress={handlePrevStep}
//                                     disabled={isFirstStep}
//                                     style={[styles.navButton, isFirstStep && styles.disabledButton]}
//                                 >
//                                     <Text style={styles.buttonText}>Back</Text>
//                                 </TouchableOpacity>

//                                 {!isLastStep ? (
//                                     <TouchableOpacity
//                                         onPress={handleNextStep}
//                                         style={styles.navButton}
//                                     >
//                                         <Text style={styles.buttonText}>Next</Text>
//                                     </TouchableOpacity>
//                                 ) : (
//                                     <TouchableOpacity
//                                         onPress={handleOnboardingComplete}
//                                         style={styles.navButton}
//                                     >
//                                         <Text style={styles.buttonText}>Got It</Text>
//                                     </TouchableOpacity>
//                                 )}
//                             </View>

//                             {/* Don't Show Again Button */}
//                             {isLastStep && (
//                                 <TouchableOpacity
//                                     onPress={handleOnboardingComplete}
//                                     style={styles.skipButton}
//                                 >
//                                     <Text style={styles.skipText}>Don't Show Again</Text>
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         backgroundColor: colors.bgDark,
//         paddingHorizontal: 18,
//     },
//     homeWrapper: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     title: {
//         fontSize: 22,
//         color: '#E8C400',
//         fontWeight: '700'
//     },
//     playListBtn: {
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     playListButton: {
//         width: 24,
//         height: 24,
//     },
//     txtColor: {
//         color: colors.textColor
//     },
//     topBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     topBarBtn: {
//         width: 41,
//         height: 30,
//         borderRadius: 50,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     tabText: {
//         color: colors.textColor,
//     },
//     centerTitle: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 20,
//         textAlign: "center",
//         paddingTop: 25,
//         paddingBottom: 15,
//     },
//     recordBtn: {
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: 15,
//     },
//     recordBtnImg: {
//         position: "absolute",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     recordImgWrapper: {
//         position: "relative",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     countdownText: {
//         position: 'absolute',
//         fontSize: 48,
//         fontWeight: 'bold',
//         color: colors.brandYellow,
//     },
//     uploadBtn: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: colors.purple,
//         borderRadius: 12,
//         gap: 10,
//         height: 54,
//         width: 303,
//     },
//     uploadText: {
//         fontWeight: '500',
//         fontSize: 16,
//         color: colors.textColor,
//         textAlign: "center",
//     },
//     movieRowHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 30,
//         marginBottom: 15,
//         gap: 3,
//     },
//     movieText: {
//         color: colors.textColor,
//         marginTop: 5,
//     },
//     movieHText: {
//         color: colors.textColor,
//         fontSize: 14,
//     },
//     movieRow: {
//         paddingBottom: 30,
//     },
//     movieCard: {
//         overflow: "hidden",
//     },
//     movieImg: {
//         height: 177,
//         width: "100%",
//         borderRadius: 8,
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'flex-end',
//     },
//     modalContainer: {
//         backgroundColor: colors.bgDark,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 30,
//     },
//     closeBtn: {
//         alignSelf: 'flex-end',
//         padding: 10,
//     },
//     closeBtnText: {
//         fontSize: 24,
//         color: colors.textColor,
//         fontWeight: 'bold',
//     },
//     contentContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     onboardingImage: {
//         width: '100%',
//         height: 200,
//         resizeMode: 'contain',
//         marginBottom: 20,
//     },
//     onboardingTitle: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: colors.textColor,
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     onboardingDescription: {
//         fontSize: 14,
//         color: colors.textColor,
//         textAlign: 'center',
//         marginBottom: 30,
//         lineHeight: 20,
//     },
//     dotsContainer: {
//         flexDirection: 'row',
//         gap: 8,
//     },
//     dot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: colors.textColor,
//         opacity: 0.3,
//     },
//     activeDot: {
//         backgroundColor: colors.brandYellow,
//         opacity: 1,
//         width: 24,
//     },
//     buttonsContainer: {
//         gap: 10,
//     },
//     navButtonsRow: {
//         flexDirection: 'row',
//         gap: 10,
//     },
//     navButton: {
//         flex: 1,
//         paddingVertical: 12,
//         backgroundColor: colors.purple,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     disabledButton: {
//         opacity: 0.5,
//     },
//     buttonText: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 14,
//     },
//     skipButton: {
//         paddingVertical: 10,
//     },
//     skipText: {
//         color: colors.textColor,
//         fontSize: 12,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
// });


// import { ColorType } from '@shopify/react-native-skia';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     Dimensions,
//     Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { usePermissions } from '@/src/store/hooks';
// import { useFeatureOnboarding } from '@/src/store/hooks';
// import { OnboardingModal } from '@/src/components/OnbordingModal';

// const colors = require("../../../src/constants/colors");

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const H_PADDING = 20;
// const GAP = 15;
// const CARD_WIDTH = (SCREEN_WIDTH - (H_PADDING * 2) - GAP) / 2;

// const movies = [
//     {
//         id: 1,
//         title: "Megan 2.0",
//         image: require("../../../assets/images/Frame 43.png"),
//     },
//     {
//         id: 2,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 50.png"),
//     },
//     {
//         id: 3,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 45.png"),
//     },
//     {
//         id: 4,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 5,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 6,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
// ];

// const onboardingSteps = [
//     {
//         title: 'How to Record',
//         description: 'Hold your device steady and tap the record button when ready',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
//     {
//         title: 'Capture the Scene',
//         description: 'Point at the movie or show you\'re watching',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
//     {
//         title: 'Save Your Discovery',
//         description: 'Your clip will be saved and you can view it later',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
// ];

// export default function Index() {
//     const router = useRouter();
//     const { canRecord, requestCameraAndMic } = usePermissions();
//     const {
//         shouldShowPermissionAlert,
//         shouldShowRecordOnboarding,
//         setRecordPermissionRequested,
//         setRecordOnboardingSeen,
//     } = useFeatureOnboarding();

//     const [showOnboardingSheet, setShowOnboardingSheet] = useState(false);
//     const [onboardingStep, setOnboardingStep] = useState(0);
//     const [countdown, setCountdown] = useState<number | null>(null);

//     // Step 1: Handle record button press
//     const handleRecordPress = async () => {
//         // If permission alert needs to be shown
//         if (shouldShowPermissionAlert) {
//             Alert.alert(
//                 'Camera & Microphone Access',
//                 'MOVIZ needs access to your camera and microphone to record video scenes.',
//                 [
//                     {
//                         text: "Don't Allow",
//                         onPress: () => {
//                             setRecordPermissionRequested();
//                             // User denied, don't proceed
//                         },
//                         style: "cancel",
//                     },
//                     {
//                         text: 'Allow',
//                         onPress: async () => {
//                             setRecordPermissionRequested();
//                             const granted = await requestCameraAndMic();

//                             if (granted) {
//                                 // Permissions granted, show onboarding
//                                 setShowOnboardingSheet(true);
//                                 setOnboardingStep(0);
//                             } else {
//                                 Alert.alert('Permissions Denied', 'Please enable camera and microphone permissions in settings to record.');
//                             }
//                         },
//                     },
//                 ]
//             );
//             return;
//         }

//         // If already requested permissions but haven't seen onboarding
//         if (shouldShowRecordOnboarding) {
//             setShowOnboardingSheet(true);
//             setOnboardingStep(0);
//             return;
//         }

//         // Already have permissions and saw onboarding, just start countdown
//         if (canRecord) {
//             startCountdown();
//         }
//     };

//     // Step 2: Handle onboarding completion
//     const handleOnboardingComplete = () => {
//         setShowOnboardingSheet(false);
//         setRecordOnboardingSeen();
//         startCountdown();
//     };

//     // Step 3: Countdown and navigate
//     const startCountdown = () => {
//         setCountdown(3);
//         const interval = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev === 1) {
//                     clearInterval(interval);
//                     setCountdown(null);
//                     router.push('/recordScreen');
//                     return null;
//                 }
//                 return (prev ?? 3) - 1;
//             });
//         }, 1000);
//     };

//     const handleNextStep = () => {
//         if (onboardingStep < onboardingSteps.length - 1) {
//             setOnboardingStep(onboardingStep + 1);
//         }
//     };

//     const handlePrevStep = () => {
//         if (onboardingStep > 0) {
//             setOnboardingStep(onboardingStep - 1);
//         }
//     };

//     const isLastStep = onboardingStep === onboardingSteps.length - 1;
//     const isFirstStep = onboardingStep === 0;

//     return (
//         <View style={styles.container}>
//             <View style={styles.topBar}>
//                 <TouchableOpacity style={styles.playListBtn}>
//                     <Image source={require("../../../assets/images/play-list.png")} style={styles.playListButton} />
//                     <Text style={styles.tabText}>History</Text>
//                 </TouchableOpacity>
//                 <Image source={require("../../../assets/images/MOVIZ.png")} />
//                 <TouchableOpacity style={styles.topBarBtn}>
//                     <LinearGradient
//                         colors={[colors.purple, colors.brandYellow]}
//                         start={{ x: 0, y: 0.5 }}
//                         end={{ x: 1, y: 0.5 }}
//                         style={styles.topBarBtn}>
//                         <Text style={styles.tabText}>6/9</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 ListHeaderComponent={
//                     <View>
//                         <View style={styles.homeWrapper}>
//                             <Text style={styles.centerTitle}>Tap Circle to Scan a Scene</Text>

//                             {/* Record Button with Countdown or Recording Icon */}
//                             <TouchableOpacity
//                                 style={styles.recordBtn}
//                                 onPress={handleRecordPress}
//                                 disabled={countdown !== null}
//                             >
//                                 <View style={styles.recordImgWrapper}>
//                                     <Image source={require("../../../assets/images/Ellipse-2.png")} />
//                                     <Image source={require("../../../assets/images/Ellipse-6.png")} style={styles.recordBtnImg} />
//                                     <Image source={require("../../../assets/images/Ellipse-8.png")} style={styles.recordBtnImg} />

//                                     {countdown !== null ? (
//                                         <Text style={styles.countdownText}>{countdown}</Text>
//                                     ) : (
//                                         <Image source={require("../../../assets/images/Frame-30.png")} style={styles.recordBtnImg} />
//                                     )}
//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={styles.uploadBtn}>
//                                 <View>
//                                     <Image source={require("../../../assets/images/camera-02.png")} />
//                                 </View>
//                                 <View>
//                                     <Text style={styles.uploadText}>Upload Clips and Photos</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.movieRowHeader}>
//                             <Text style={styles.tabText}>Trending Discoveries</Text>
//                             <Image source={require("../../../assets/images/sparkles.png")} />
//                         </View>
//                     </View>
//                 }
//                 data={movies}
//                 keyExtractor={(item) => item.id.toString()}
//                 numColumns={2}
//                 contentContainerStyle={styles.movieRow}
//                 columnWrapperStyle={{
//                     justifyContent: "space-between",
//                     marginBottom: 16,
//                     gap: 10,
//                 }}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={[styles.movieCard, { width: CARD_WIDTH }]}>
//                         <Image source={item.image} style={styles.movieImg} />
//                         <Text style={styles.movieText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 )}
//             />

//             {/* Premium Onboarding Modal */}
//             <OnboardingModal
//                 visible={showOnboardingSheet}
//                 onClose={() => setShowOnboardingSheet(false)}
//                 onComplete={handleOnboardingComplete}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         backgroundColor: colors.bgDark,
//         paddingHorizontal: 18,
//     },
//     homeWrapper: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     title: {
//         fontSize: 22,
//         color: '#E8C400',
//         fontWeight: '700'
//     },
//     playListBtn: {
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     playListButton: {
//         width: 24,
//         height: 24,
//     },
//     txtColor: {
//         color: colors.textColor
//     },
//     topBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     topBarBtn: {
//         width: 41,
//         height: 30,
//         borderRadius: 50,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     tabText: {
//         color: colors.textColor,
//     },
//     centerTitle: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 20,
//         textAlign: "center",
//         paddingTop: 25,
//         paddingBottom: 15,
//     },
//     recordBtn: {
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: 15,
//     },
//     recordBtnImg: {
//         position: "absolute",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     recordImgWrapper: {
//         position: "relative",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     countdownText: {
//         position: 'absolute',
//         fontSize: 48,
//         fontWeight: 'bold',
//         color: colors.brandYellow,
//     },
//     uploadBtn: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: colors.purple,
//         borderRadius: 12,
//         gap: 10,
//         height: 54,
//         width: 303,
//     },
//     uploadText: {
//         fontWeight: '500',
//         fontSize: 16,
//         color: colors.textColor,
//         textAlign: "center",
//     },
//     movieRowHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 30,
//         marginBottom: 15,
//         gap: 3,
//     },
//     movieText: {
//         color: colors.textColor,
//         marginTop: 5,
//     },
//     movieHText: {
//         color: colors.textColor,
//         fontSize: 14,
//     },
//     movieRow: {
//         paddingBottom: 30,
//     },
//     movieCard: {
//         overflow: "hidden",
//     },
//     movieImg: {
//         height: 177,
//         width: "100%",
//         borderRadius: 8,
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'flex-end',
//     },
//     modalContainer: {
//         backgroundColor: colors.bgDark,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 30,
//     },
//     closeBtn: {
//         alignSelf: 'flex-end',
//         padding: 10,
//     },
//     closeBtnText: {
//         fontSize: 24,
//         color: colors.textColor,
//         fontWeight: 'bold',
//     },
//     contentContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     onboardingImage: {
//         width: '100%',
//         height: 200,
//         resizeMode: 'contain',
//         marginBottom: 20,
//     },
//     onboardingTitle: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: colors.textColor,
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     onboardingDescription: {
//         fontSize: 14,
//         color: colors.textColor,
//         textAlign: 'center',
//         marginBottom: 30,
//         lineHeight: 20,
//     },
//     dotsContainer: {
//         flexDirection: 'row',
//         gap: 8,
//     },
//     dot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: colors.textColor,
//         opacity: 0.3,
//     },
//     activeDot: {
//         backgroundColor: colors.brandYellow,
//         opacity: 1,
//         width: 24,
//     },
//     buttonsContainer: {
//         gap: 10,
//     },
//     navButtonsRow: {
//         flexDirection: 'row',
//         gap: 10,
//     },
//     navButton: {
//         flex: 1,
//         paddingVertical: 12,
//         backgroundColor: colors.purple,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     disabledButton: {
//         opacity: 0.5,
//     },
//     buttonText: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 14,
//     },
//     skipButton: {
//         paddingVertical: 10,
//     },
//     skipText: {
//         color: colors.textColor,
//         fontSize: 12,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
// });

// import { ColorType } from '@shopify/react-native-skia';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     Dimensions,
//     Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { usePermissions } from '@/src/store/hooks';
// import { useFeatureOnboarding } from '@/src/store/hooks';
// import { OnboardingModal } from '@/src/components/OnbordingModal';

// const colors = require("../../../src/constants/colors");

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const H_PADDING = 20;
// const GAP = 15;
// const CARD_WIDTH = (SCREEN_WIDTH - (H_PADDING * 2) - GAP) / 2;

// const movies = [
//     {
//         id: 1,
//         title: "Megan 2.0",
//         image: require("../../../assets/images/Frame 43.png"),
//     },
//     {
//         id: 2,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 50.png"),
//     },
//     {
//         id: 3,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 45.png"),
//     },
//     {
//         id: 4,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 5,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 6,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
// ];

// const onboardingSteps = [
//     {
//         title: 'How to Record',
//         description: 'Hold your device steady and tap the record button when ready',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
//     {
//         title: 'Capture the Scene',
//         description: 'Point at the movie or show you\'re watching',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
//     {
//         title: 'Save Your Discovery',
//         description: 'Your clip will be saved and you can view it later',
//         image: require("../../../assets/images/Frame-30.png"),
//     },
// ];

// export default function Index() {
//     const router = useRouter();
//     const { canRecord, requestCameraAndMic } = usePermissions();
//     const {
//         shouldShowPermissionAlert,
//         shouldShowRecordOnboarding,
//         setRecordPermissionRequested,
//         setRecordOnboardingSeen,
//     } = useFeatureOnboarding();

//     const [showOnboardingSheet, setShowOnboardingSheet] = useState(false);
//     const [onboardingStep, setOnboardingStep] = useState(0);
//     const [countdown, setCountdown] = useState<number | null>(null);

//     // Step 1: Handle record button press
//     const handleRecordPress = async () => {
//         // If permission alert needs to be shown
//         if (shouldShowPermissionAlert) {
//             Alert.alert(
//                 'Camera & Microphone Access',
//                 'MOVIZ needs access to your camera and microphone to record video scenes.',
//                 [
//                     {
//                         text: "Don't Allow",
//                         onPress: () => {
//                             // User denied, don't mark as requested - show again next time
//                         },
//                         style: "cancel",
//                     },
//                     {
//                         text: 'Allow',
//                         onPress: async () => {
//                             // Only mark as requested if they allow
//                             const granted = await requestCameraAndMic();

//                             if (granted) {
//                                 // Mark as requested ONLY after successful permission
//                                 setRecordPermissionRequested();
//                                 // Permissions granted, show onboarding
//                                 setShowOnboardingSheet(true);
//                                 setOnboardingStep(0);
//                             } else {
//                                 Alert.alert('Permissions Denied', 'Please enable camera and microphone permissions in settings to record.');
//                             }
//                         },
//                     },
//                 ]
//             );
//             return;
//         }

//         // If already requested permissions but haven't seen onboarding
//         if (shouldShowRecordOnboarding) {
//             setShowOnboardingSheet(true);
//             setOnboardingStep(0);
//             return;
//         }

//         // Already have permissions and saw onboarding, just start countdown
//         if (canRecord) {
//             startCountdown();
//         }
//     };

//     // Step 2: Handle onboarding completion
//     const handleOnboardingComplete = () => {
//         setShowOnboardingSheet(false);
//         setRecordOnboardingSeen();
//         startCountdown();
//     };

//     // Step 3: Countdown and navigate
//     const startCountdown = () => {
//         setCountdown(3);
//         const interval = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev === 1) {
//                     clearInterval(interval);
//                     setCountdown(null);
//                     router.push('/recordScreen');
//                     return null;
//                 }
//                 return (prev ?? 3) - 1;
//             });
//         }, 1000);
//     };

//     // const handleNextStep = () => {
//     //     if (onboardingStep < onboardingSteps.length - 1) {
//     //         setOnboardingStep(onboardingStep + 1);
//     //     }
//     // };

//     // const handlePrevStep = () => {
//     //     if (onboardingStep > 0) {
//     //         setOnboardingStep(onboardingStep - 1);
//     //     }
//     // };

//     // const isLastStep = onboardingStep === onboardingSteps.length - 1;
//     // const isFirstStep = onboardingStep === 0;

//     return (
//         <View style={styles.container}>
//             <View style={styles.topBar}>
//                 <TouchableOpacity style={styles.playListBtn}>
//                     <Image source={require("../../../assets/images/play-list.png")} style={styles.playListButton} />
//                     <Text style={styles.tabText}>History</Text>
//                 </TouchableOpacity>
//                 <Image source={require("../../../assets/images/MOVIZ.png")} />
//                 <TouchableOpacity style={styles.topBarBtn}>
//                     <LinearGradient
//                         colors={[colors.purple, colors.brandYellow]}
//                         start={{ x: 0, y: 0.5 }}
//                         end={{ x: 1, y: 0.5 }}
//                         style={styles.topBarBtn}>
//                         <Text style={styles.tabText}>6/9</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 ListHeaderComponent={
//                     <View>
//                         <View style={styles.homeWrapper}>
//                             <Text style={styles.centerTitle}>Tap Circle to Scan a Scene</Text>

//                             {/* Record Button with Countdown or Recording Icon */}
//                             <TouchableOpacity
//                                 style={styles.recordBtn}
//                                 onPress={handleRecordPress}
//                                 disabled={countdown !== null}
//                             >
//                                 <View style={styles.recordImgWrapper}>
//                                     <Image source={require("../../../assets/images/Ellipse-2.png")} />
//                                     <Image source={require("../../../assets/images/Ellipse-6.png")} style={styles.recordBtnImg} />
//                                     <Image source={require("../../../assets/images/Ellipse-8.png")} style={styles.recordBtnImg} />

//                                     {countdown !== null ? (
//                                         <Text style={styles.countdownText}>{countdown}</Text>
//                                     ) : (
//                                         <Image source={require("../../../assets/images/Frame-30.png")} style={styles.recordBtnImg} />
//                                     )}
//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={styles.uploadBtn}>
//                                 <View>
//                                     <Image source={require("../../../assets/images/camera-02.png")} />
//                                 </View>
//                                 <View>
//                                     <Text style={styles.uploadText}>Upload Clips and Photos</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.movieRowHeader}>
//                             <Text style={styles.tabText}>Trending Discoveries</Text>
//                             <Image source={require("../../../assets/images/sparkles.png")} />
//                         </View>
//                     </View>
//                 }
//                 data={movies}
//                 keyExtractor={(item) => item.id.toString()}
//                 numColumns={2}
//                 contentContainerStyle={styles.movieRow}
//                 columnWrapperStyle={{
//                     justifyContent: "space-between",
//                     marginBottom: 16,
//                     gap: 10,
//                 }}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={[styles.movieCard, { width: CARD_WIDTH }]}>
//                         <Image source={item.image} style={styles.movieImg} />
//                         <Text style={styles.movieText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 )}
//             />

//             {/* Premium Onboarding Modal */}
//             <OnboardingModal
//                 visible={showOnboardingSheet}
//                 onClose={() => setShowOnboardingSheet(false)}
//                 onComplete={handleOnboardingComplete}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         backgroundColor: colors.bgDark,
//         paddingHorizontal: 18,
//     },
//     homeWrapper: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     title: {
//         fontSize: 22,
//         color: '#E8C400',
//         fontWeight: '700'
//     },
//     playListBtn: {
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     playListButton: {
//         width: 24,
//         height: 24,
//     },
//     txtColor: {
//         color: colors.textColor
//     },
//     topBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     topBarBtn: {
//         width: 41,
//         height: 30,
//         borderRadius: 50,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     tabText: {
//         color: colors.textColor,
//     },
//     centerTitle: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 20,
//         textAlign: "center",
//         paddingTop: 25,
//         paddingBottom: 15,
//     },
//     recordBtn: {
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: 15,
//     },
//     recordBtnImg: {
//         position: "absolute",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     recordImgWrapper: {
//         position: "relative",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     countdownText: {
//         position: 'absolute',
//         fontSize: 48,
//         fontWeight: 'bold',
//         color: colors.brandYellow,
//     },
//     uploadBtn: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: colors.purple,
//         borderRadius: 12,
//         gap: 10,
//         height: 54,
//         width: 303,
//     },
//     uploadText: {
//         fontWeight: '500',
//         fontSize: 16,
//         color: colors.textColor,
//         textAlign: "center",
//     },
//     movieRowHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 30,
//         marginBottom: 15,
//         gap: 3,
//     },
//     movieText: {
//         color: colors.textColor,
//         marginTop: 5,
//     },
//     movieHText: {
//         color: colors.textColor,
//         fontSize: 14,
//     },
//     movieRow: {
//         paddingBottom: 30,
//     },
//     movieCard: {
//         overflow: "hidden",
//     },
//     movieImg: {
//         height: 177,
//         width: "100%",
//         borderRadius: 8,
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'flex-end',
//     },
//     modalContainer: {
//         backgroundColor: colors.bgDark,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 30,
//     },
//     closeBtn: {
//         alignSelf: 'flex-end',
//         padding: 10,
//     },
//     closeBtnText: {
//         fontSize: 24,
//         color: colors.textColor,
//         fontWeight: 'bold',
//     },
//     contentContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     onboardingImage: {
//         width: '100%',
//         height: 200,
//         resizeMode: 'contain',
//         marginBottom: 20,
//     },
//     onboardingTitle: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: colors.textColor,
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     onboardingDescription: {
//         fontSize: 14,
//         color: colors.textColor,
//         textAlign: 'center',
//         marginBottom: 30,
//         lineHeight: 20,
//     },
//     dotsContainer: {
//         flexDirection: 'row',
//         gap: 8,
//     },
//     dot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: colors.textColor,
//         opacity: 0.3,
//     },
//     activeDot: {
//         backgroundColor: colors.brandYellow,
//         opacity: 1,
//         width: 24,
//     },
//     buttonsContainer: {
//         gap: 10,
//     },
//     navButtonsRow: {
//         flexDirection: 'row',
//         gap: 10,
//     },
//     navButton: {
//         flex: 1,
//         paddingVertical: 12,
//         backgroundColor: colors.purple,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     disabledButton: {
//         opacity: 0.5,
//     },
//     buttonText: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 14,
//     },
//     skipButton: {
//         paddingVertical: 10,
//     },
//     skipText: {
//         color: colors.textColor,
//         fontSize: 12,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
// });


// import { ColorType } from '@shopify/react-native-skia';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     Dimensions,
//     Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { usePermissions } from '@/src/store/hooks';
// import { useFeatureOnboarding } from '@/src/store/hooks';
// import { OnboardingModal } from '@/src/components/OnbordingModal';
// import { UploadTipsModal } from '@/src/components/UploadTipsModal'; // Add this

// const colors = require("../../../src/constants/colors");

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const H_PADDING = 20;
// const GAP = 15;
// const CARD_WIDTH = (SCREEN_WIDTH - (H_PADDING * 2) - GAP) / 2;

// const movies = [
//     {
//         id: 1,
//         title: "Megan 2.0",
//         image: require("../../../assets/images/Frame 43.png"),
//     },
//     {
//         id: 2,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 50.png"),
//     },
//     {
//         id: 3,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 45.png"),
//     },
//     {
//         id: 4,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 5,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
//     {
//         id: 6,
//         title: "Planet Of Apes",
//         image: require("../../../assets/images/Frame 51.png"),
//     },
// ];

// export default function Index() {
//     const router = useRouter();
//     const { canRecord, requestCameraAndMic } = usePermissions();
//     const {
//         shouldShowPermissionAlert,
//         shouldShowRecordOnboarding,
//         setRecordPermissionRequested,
//         setRecordOnboardingSeen,
//     } = useFeatureOnboarding();

//     const [showOnboardingSheet, setShowOnboardingSheet] = useState(false);
//     const [onboardingStep, setOnboardingStep] = useState(0);
//     const [countdown, setCountdown] = useState<number | null>(null);
//     const [showUploadTips, setShowUploadTips] = useState(false);

//     const { requestMediaLibrary, shouldShowGalleryAlert } = usePermissions();

//     // Step 1: Handle record button press
//     const handleRecordPress = async () => {
//         // If permission alert needs to be shown
//         if (shouldShowPermissionAlert) {
//             Alert.alert(
//                 'Camera & Microphone Access',
//                 'MOVIZ needs access to your camera and microphone to record video scenes.',
//                 [
//                     {
//                         text: "Don't Allow",
//                         onPress: () => {
//                             // User denied, don't mark as requested - show again next time
//                         },
//                         style: "cancel",
//                     },
//                     {
//                         text: 'Allow',
//                         onPress: async () => {
//                             // Only mark as requested if they allow
//                             const granted = await requestCameraAndMic();

//                             if (granted) {
//                                 // Mark as requested ONLY after successful permission
//                                 setRecordPermissionRequested();
//                                 // Permissions granted, show onboarding
//                                 setShowOnboardingSheet(true);
//                                 setOnboardingStep(0);
//                             } else {
//                                 Alert.alert('Permissions Denied', 'Please enable camera and microphone permissions in settings to record.');
//                             }
//                         },
//                     },
//                 ]
//             );
//             return;
//         }

//         // If already requested permissions but haven't seen onboarding
//         if (shouldShowRecordOnboarding) {
//             setShowOnboardingSheet(true);
//             setOnboardingStep(0);
//             return;
//         }

//         // Already have permissions and saw onboarding, just start countdown
//         if (canRecord) {
//             startCountdown();
//         }
//     };

//     // Step 2: Handle onboarding completion
//     const handleOnboardingComplete = () => {
//         setShowOnboardingSheet(false);
//         setRecordOnboardingSeen();
//         startCountdown();
//     };

//     // Step 3: Countdown and navigate
//     const startCountdown = () => {
//         setCountdown(3);
//         const interval = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev === 1) {
//                     clearInterval(interval);
//                     setCountdown(null);
//                     router.push('/recordScreen');
//                     return null;
//                 }
//                 return (prev ?? 3) - 1;
//             });
//         }, 1000);
//     };


//     // Handle upload button press
//     const handleUploadPress = async () => {
//         if (shouldShowGalleryAlert) {
//             Alert.alert(
//                 'Photo Library Access',
//                 'MOVIZ needs access to your photos to upload clips and images.',
//                 [
//                     {
//                         text: "Don't Allow",
//                         style: "cancel",
//                     },
//                     {
//                         text: 'Allow',
//                         onPress: async () => {
//                             const granted = await requestMediaLibrary();
//                             if (granted) {
//                                 setShowUploadTips(true);
//                             } else {
//                                 Alert.alert('Permission Denied', 'Please enable photo library access in settings.');
//                             }
//                         },
//                     },
//                 ]
//             );
//             return;
//         }

//         // Permission already granted, show tips
//         setShowUploadTips(true);
//     };



//     return (
//         <View style={styles.container}>
//             <View style={styles.topBar}>
//                 <TouchableOpacity style={styles.playListBtn}>
//                     <Image source={require("../../../assets/images/play-list.png")} style={styles.playListButton} />
//                     <Text style={styles.tabText}>History</Text>
//                 </TouchableOpacity>
//                 <Image source={require("../../../assets/images/MOVIZ.png")} />
//                 <TouchableOpacity style={styles.topBarBtn}>
//                     <LinearGradient
//                         colors={[colors.purple, colors.brandYellow]}
//                         start={{ x: 0, y: 0.5 }}
//                         end={{ x: 1, y: 0.5 }}
//                         style={styles.topBarBtn}>
//                         <Text style={styles.tabText}>6/9</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 ListHeaderComponent={
//                     <View>
//                         <View style={styles.homeWrapper}>
//                             <Text style={styles.centerTitle}>Tap Circle to Scan a Scene</Text>

//                             {/* Record Button with Countdown or Recording Icon */}
//                             <TouchableOpacity
//                                 style={styles.recordBtn}
//                                 onPress={handleRecordPress}
//                                 disabled={countdown !== null}
//                             >
//                                 <View style={styles.recordImgWrapper}>
//                                     <Image source={require("../../../assets/images/Ellipse-2.png")} />
//                                     <Image source={require("../../../assets/images/Ellipse-6.png")} style={styles.recordBtnImg} />
//                                     <Image source={require("../../../assets/images/Ellipse-8.png")} style={styles.recordBtnImg} />

//                                     {countdown !== null ? (
//                                         <Text style={styles.countdownText}>{countdown}</Text>
//                                     ) : (
//                                         <Image source={require("../../../assets/images/Frame-30.png")} style={styles.recordBtnImg} />
//                                     )}
//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadPress}>
//                                 <View>
//                                     <Image source={require("../../../assets/images/camera-02.png")} />
//                                 </View>
//                                 <View>
//                                     <Text style={styles.uploadText}>Upload Clips and Photos</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.movieRowHeader}>
//                             <Text style={styles.tabText}>Trending Discoveries</Text>
//                             <Image source={require("../../../assets/images/sparkles.png")} />
//                         </View>
//                     </View>
//                 }
//                 data={movies}
//                 keyExtractor={(item) => item.id.toString()}
//                 numColumns={2}
//                 contentContainerStyle={styles.movieRow}
//                 columnWrapperStyle={{
//                     justifyContent: "space-between",
//                     marginBottom: 16,
//                     gap: 10,
//                 }}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={[styles.movieCard, { width: CARD_WIDTH }]}>
//                         <Image source={item.image} style={styles.movieImg} />
//                         <Text style={styles.movieText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 )}
//             />

//             {/* Premium Onboarding Modal */}
//             <OnboardingModal
//                 visible={showOnboardingSheet}
//                 onClose={() => setShowOnboardingSheet(false)}
//                 onComplete={handleOnboardingComplete}
//             />

//             {/* Upload Tips Modal */}
//             <UploadTipsModal
//                 visible={showUploadTips}
//                 onClose={() => setShowUploadTips(false)}
//                 onComplete={() => setShowUploadTips(false)}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         backgroundColor: colors.bgDark,
//         paddingHorizontal: 18,
//     },
//     homeWrapper: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     title: {
//         fontSize: 22,
//         color: '#E8C400',
//         fontWeight: '700'
//     },
//     playListBtn: {
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     playListButton: {
//         width: 24,
//         height: 24,
//     },
//     txtColor: {
//         color: colors.textColor
//     },
//     topBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     topBarBtn: {
//         width: 41,
//         height: 30,
//         borderRadius: 50,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     tabText: {
//         color: colors.textColor,
//     },
//     centerTitle: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 20,
//         textAlign: "center",
//         paddingTop: 25,
//         paddingBottom: 15,
//     },
//     recordBtn: {
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: 15,
//     },
//     recordBtnImg: {
//         position: "absolute",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     recordImgWrapper: {
//         position: "relative",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     countdownText: {
//         position: 'absolute',
//         fontSize: 48,
//         fontWeight: 'bold',
//         color: colors.brandYellow,
//     },
//     uploadBtn: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: colors.purple,
//         borderRadius: 12,
//         gap: 10,
//         height: 54,
//         width: 303,
//     },
//     uploadText: {
//         fontWeight: '500',
//         fontSize: 16,
//         color: colors.textColor,
//         textAlign: "center",
//     },
//     movieRowHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 30,
//         marginBottom: 15,
//         gap: 3,
//     },
//     movieText: {
//         color: colors.textColor,
//         marginTop: 5,
//     },
//     movieHText: {
//         color: colors.textColor,
//         fontSize: 14,
//     },
//     movieRow: {
//         paddingBottom: 30,
//     },
//     movieCard: {
//         overflow: "hidden",
//     },
//     movieImg: {
//         height: 177,
//         width: "100%",
//         borderRadius: 8,
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'flex-end',
//     },
//     modalContainer: {
//         backgroundColor: colors.bgDark,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 30,
//     },
//     closeBtn: {
//         alignSelf: 'flex-end',
//         padding: 10,
//     },
//     closeBtnText: {
//         fontSize: 24,
//         color: colors.textColor,
//         fontWeight: 'bold',
//     },
//     contentContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     onboardingImage: {
//         width: '100%',
//         height: 200,
//         resizeMode: 'contain',
//         marginBottom: 20,
//     },
//     onboardingTitle: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: colors.textColor,
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     onboardingDescription: {
//         fontSize: 14,
//         color: colors.textColor,
//         textAlign: 'center',
//         marginBottom: 30,
//         lineHeight: 20,
//     },
//     dotsContainer: {
//         flexDirection: 'row',
//         gap: 8,
//     },
//     dot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: colors.textColor,
//         opacity: 0.3,
//     },
//     activeDot: {
//         backgroundColor: colors.brandYellow,
//         opacity: 1,
//         width: 24,
//     },
//     buttonsContainer: {
//         gap: 10,
//     },
//     navButtonsRow: {
//         flexDirection: 'row',
//         gap: 10,
//     },
//     navButton: {
//         flex: 1,
//         paddingVertical: 12,
//         backgroundColor: colors.purple,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     disabledButton: {
//         opacity: 0.5,
//     },
//     buttonText: {
//         color: colors.textColor,
//         fontWeight: '600',
//         fontSize: 14,
//     },
//     skipButton: {
//         paddingVertical: 10,
//     },
//     skipText: {
//         color: colors.textColor,
//         fontSize: 12,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
// });


import { ColorType } from '@shopify/react-native-skia';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePermissions } from '@/src/store/hooks';
import { useFeatureOnboarding } from '@/src/store/hooks';
import { OnboardingModal } from '@/src/components/OnbordingModal';
import { UploadTipsModal } from '@/src/components/UploadTipsModal';
import { TextPoppins, TextCrimson, TextPacifico, TextSora } from '@/app/_layout';

const colors = require("../../../src/constants/colors");

const SCREEN_WIDTH = Dimensions.get("window").width;
const H_PADDING = 20;
const GAP = 15;
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
    const { canRecord, requestCameraAndMic, requestMediaLibrary } = usePermissions();
    const {
        shouldShowPermissionAlert,
        shouldShowRecordOnboarding,
        setRecordPermissionRequested,
        setRecordOnboardingSeen,
        shouldShowUploadPermissionAlert,
        shouldShowUploadTips,
        setUploadPermissionRequested,
        setUploadTipsOnboardingSeen,
    } = useFeatureOnboarding();

    const [showOnboardingSheet, setShowOnboardingSheet] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [showUploadTips, setShowUploadTips] = useState(false);

    // Step 1: Handle record button press
    const handleRecordPress = async () => {
        // If permission alert needs to be shown
        if (shouldShowPermissionAlert) {
            Alert.alert(
                'Camera & Microphone Access',
                'MOVIZ needs access to your camera and microphone to record video scenes.',
                [
                    {
                        text: "Don't Allow",
                        onPress: () => {
                            // User denied, don't mark as requested - show again next time
                        },
                        style: "cancel",
                    },
                    {
                        text: 'Allow',
                        onPress: async () => {
                            // Only mark as requested if they allow
                            const granted = await requestCameraAndMic();

                            if (granted) {
                                // Mark as requested ONLY after successful permission
                                setRecordPermissionRequested();
                                // Permissions granted, show onboarding
                                setShowOnboardingSheet(true);
                                setOnboardingStep(0);
                            } else {
                                Alert.alert('Permissions Denied', 'Please enable camera and microphone permissions in settings to record.');
                            }
                        },
                    },
                ]
            );
            return;
        }

        // If already requested permissions but haven't seen onboarding
        if (shouldShowRecordOnboarding) {
            setShowOnboardingSheet(true);
            setOnboardingStep(0);
            return;
        }

        // Already have permissions and saw onboarding, just start countdown
        if (canRecord) {
            startCountdown();
        }
    };

    // Step 2: Handle onboarding completion
    const handleOnboardingComplete = () => {
        setShowOnboardingSheet(false);
        setRecordOnboardingSeen();
        startCountdown();
    };

    // Step 3: Countdown and navigate
    const startCountdown = () => {
        setCountdown(3);
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setCountdown(null);
                    router.push('/recordScreen');
                    return null;
                }
                return (prev ?? 3) - 1;
            });
        }, 1000);
    };

    const handleUploadPress = async () => {
        if (shouldShowUploadPermissionAlert) {
            Alert.alert(
                'Photo Library Access',
                'MOVIZ needs access to your photos to upload clips and images.',
                [
                    {
                        text: "Don't Allow",
                        style: "cancel",
                    },
                    {
                        text: 'Allow',
                        onPress: async () => {
                            // Only mark as requested if they allow
                            const granted = await requestMediaLibrary();
                            if (granted) {
                                // Mark as requested ONLY after successful permission
                                setUploadPermissionRequested();
                                // Show tips
                                setShowUploadTips(true);
                            } else {
                                Alert.alert('Permission Denied', 'Please enable photo library access in settings.');
                            }
                        },
                    },
                ]
            );
            return;
        }

        // Permission already granted, check if need to show tips
        if (shouldShowUploadTips) {
            setShowUploadTips(true);
            return;
        }

        // Permission granted and tips seen, navigate to upload screen
        router.push('/recordScreen');
    };


    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.playListBtn}>
                    <Image source={require("../../../assets/images/play-list.png")} style={styles.playListButton} />
                    <Text style={styles.tabText}>History</Text>
                </TouchableOpacity>
                <Image source={require("../../../assets/images/MOVIZ.png")} />
                <TouchableOpacity style={styles.topBarBtn} onPress={() => router.push("/premuimGoScreen")}>
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

                            {/* Record Button with Countdown or Recording Icon */}
                            <TouchableOpacity
                                style={styles.recordBtn}
                                onPress={handleRecordPress}
                                disabled={countdown !== null}
                            >
                                <View style={styles.recordImgWrapper}>
                                    <Image source={require("../../../assets/images/Ellipse-2.png")} />
                                    <Image source={require("../../../assets/images/Ellipse-6.png")} style={styles.recordBtnImg} />
                                    <Image source={require("../../../assets/images/Ellipse-8.png")} style={styles.recordBtnImg} />

                                    {countdown !== null ? (
                                        <TextCrimson style={styles.countdownText}>{countdown}</TextCrimson>
                                    ) : (
                                        <Image source={require("../../../assets/images/Frame-30.png")} style={styles.recordBtnImg} />
                                    )}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadPress}>
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
                keyExtractor={(item) => item.id.toString()}
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

            {/* Premium Onboarding Modal */}
            <OnboardingModal
                visible={showOnboardingSheet}
                onClose={() => setShowOnboardingSheet(false)}
                onComplete={handleOnboardingComplete}
            />

            {/* Upload Tips Modal */}
            <UploadTipsModal
                visible={showUploadTips}
                onClose={() => setShowUploadTips(false)}
                onComplete={() => {
                    setUploadTipsOnboardingSeen();
                    setShowUploadTips(false);
                }}
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
        fontWeight: '600',
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
    countdownText: {
        position: 'absolute',
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.brandYellow,
    },
    uploadBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.purple,
        borderRadius: 12,
        gap: 10,
        height: 54,
        width: 303,
    },
    uploadText: {
        fontWeight: '500',
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
    },
});
