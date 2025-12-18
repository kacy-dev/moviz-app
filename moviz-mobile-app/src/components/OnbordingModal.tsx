// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Dimensions,
// } from 'react-native';

// const colors = require("../../../src/constants/colors");
// const { height } = Dimensions.get('window');

// interface OnboardingModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onComplete: () => void;
//   currentStep: number;
//   onNextStep: () => void;
//   onPrevStep: () => void;
//   steps: Array<{
//     title: string;
//     description: string;
//     image: any;
//   }>;
// }

// export const OnboardingModal: React.FC<OnboardingModalProps> = ({
//   visible,
//   onClose,
//   onComplete,
//   currentStep,
//   onNextStep,
//   onPrevStep,
//   steps,
// }) => {
//   const isLastStep = currentStep === steps.length - 1;
//   const isFirstStep = currentStep === 0;

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           {/* Close Button */}
//           <TouchableOpacity
//             style={styles.closeBtn}
//             onPress={onClose}
//           >
//             <Text style={styles.closeBtnText}>✕</Text>
//           </TouchableOpacity>

//           {/* Content */}
//           <View style={styles.contentContainer}>
//             <Image
//               source={steps[currentStep].image}
//               style={styles.image}
//             />
//             <Text style={styles.title}>
//               {steps[currentStep].title}
//             </Text>
//             <Text style={styles.description}>
//               {steps[currentStep].description}
//             </Text>

//             {/* Dot Indicators */}
//             <View style={styles.dotsContainer}>
//               {steps.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.dot,
//                     index === currentStep && styles.activeDot,
//                   ]}
//                 />
//               ))}
//             </View>
//           </View>

//           {/* Buttons Container */}
//           <View style={styles.buttonsContainer}>
//             {/* Navigation Buttons */}
//             <View style={styles.navButtonsRow}>
//               <TouchableOpacity
//                 onPress={onPrevStep}
//                 disabled={isFirstStep}
//                 style={[styles.navButton, isFirstStep && styles.disabledButton]}
//               >
//                 <Text style={styles.buttonText}>Back</Text>
//               </TouchableOpacity>

//               {!isLastStep ? (
//                 <TouchableOpacity
//                   onPress={onNextStep}
//                   style={styles.navButton}
//                 >
//                   <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <TouchableOpacity
//                   onPress={onComplete}
//                   style={styles.navButton}
//                 >
//                   <Text style={styles.buttonText}>Got It</Text>
//                 </TouchableOpacity>
//               )}
//             </View>

//             {/* Don't Show Again Button */}
//             {isLastStep && (
//               <TouchableOpacity
//                 onPress={onComplete}
//                 style={styles.skipButton}
//               >
//                 <Text style={styles.skipText}>Don't Show Again</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: colors.bgDark,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 30,
//     maxHeight: height * 0.75,
//   },
//   closeBtn: {
//     alignSelf: 'flex-end',
//     padding: 10,
//   },
//   closeBtnText: {
//     fontSize: 24,
//     color: colors.textColor,
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: colors.textColor,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 14,
//     color: colors.textColor,
//     textAlign: 'center',
//     marginBottom: 30,
//     lineHeight: 20,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: colors.textColor,
//     opacity: 0.3,
//   },
//   activeDot: {
//     backgroundColor: colors.brandYellow,
//     opacity: 1,
//     width: 24,
//   },
//   buttonsContainer: {
//     gap: 10,
//   },
//   navButtonsRow: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   navButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: colors.purple,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     color: colors.textColor,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   skipButton: {
//     paddingVertical: 10,
//   },
//   skipText: {
//     color: colors.textColor,
//     fontSize: 12,
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     Modal,
//     Animated,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const colors = require("@/src/constants/colors");

// const ONBOARDING_STEPS = [
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

// interface PremiumOnboardingModalProps {
//     visible: boolean;
//     onClose: () => void;
//     onComplete: () => void;
// }

// export const OnboardingModal: React.FC<PremiumOnboardingModalProps> = ({
//     visible,
//     onClose,
//     onComplete,
// }) => {
//     const [step, setStep] = useState(0);
//     const [dontShowAgain, setDontShowAgain] = useState(false);
//     const fadeAnim = useState(new Animated.Value(1))[0];

//     // Reset animation when modal opens
//     useEffect(() => {
//         if (visible) {
//             fadeAnim.setValue(1);
//             setStep(0);
//             setDontShowAgain(false);
//         }
//     }, [visible]);

//     const handleNext = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 120,
//             useNativeDriver: true,
//         }).start(() => {
//             onComplete();
//         });
//     };

//     const handleDontShowAgain = () => {
//         setDontShowAgain(!dontShowAgain);
//     };

//     const current = ONBOARDING_STEPS[step];

//     return (
//         <Modal
//             visible={visible}
//             transparent
//             animationType="fade"
//             onRequestClose={onClose}
//         >
//             <View style={styles.overlay}>
//                 <View style={styles.modalContainer}>
//                     {/* Close Button */}
//                     <TouchableOpacity
//                         style={styles.closeBtn}
//                         onPress={onClose}
//                     >
//                         <Text style={styles.closeBtnText}>✕</Text>
//                     </TouchableOpacity>

//                     {/* Animated Content */}
//                     <Animated.View style={{ opacity: fadeAnim }}>
//                         <View style={styles.contentContainer}>
//                             {/* Title */}
//                             <Text style={styles.title}>{current.title}</Text>

//                             {/* Image */}
//                             <Image
//                                 source={current.image}
//                                 style={styles.image}
//                             />

//                             {/* Description */}
//                             <Text style={styles.description}>
//                                 {current.description}
//                             </Text>

//                             {/* Dot Indicators */}
//                             <View style={styles.dotsContainer}>
//                                 {ONBOARDING_STEPS.map((_, i) => (
//                                     <View
//                                         key={i}
//                                         style={[
//                                             styles.dot,
//                                             i === step && styles.dotActive,
//                                         ]}
//                                     />
//                                 ))}
//                             </View>

//                             {/* Don't Show Again */}
//                             <TouchableOpacity
//                                 style={styles.dontShowContainer}
//                                 onPress={handleDontShowAgain}
//                             >
//                                 <View
//                                     style={[
//                                         styles.checkbox,
//                                         dontShowAgain && styles.checkboxChecked,
//                                     ]}
//                                 >
//                                     {dontShowAgain && (
//                                         <Text style={styles.checkmark}>✓</Text>
//                                     )}
//                                 </View>
//                                 <Text style={styles.dontShowText}>
//                                     Don't show me again
//                                 </Text>
//                             </TouchableOpacity>

//                             {/* Button */}
//                             <TouchableOpacity
//                                 onPress={handleNext}
//                                 activeOpacity={0.8}
//                             >
//                                 <LinearGradient
//                                     colors={[colors.purple, colors.brandYellow]}
//                                     start={{ x: 0, y: 0 }}
//                                     end={{ x: 1, y: 0 }}
//                                     style={styles.button}
//                                 >
//                                     <Text style={styles.buttonText}>
//                                         Got it
//                                     </Text>
//                                 </LinearGradient>
//                             </TouchableOpacity>
//                         </View>
//                     </Animated.View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'flex-end',
//     },
//     modalContainer: {
//         backgroundColor: colors.bgDark,
//         borderTopLeftRadius: 24,
//         borderTopRightRadius: 24,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 40,
//         maxHeight: '85%',
//     },
//     closeBtn: {
//         alignSelf: 'flex-end',
//         padding: 10,
//         marginRight: 5,
//     },
//     closeBtnText: {
//         fontSize: 24,
//         color: colors.textColor,
//         fontWeight: 'bold',
//     },
//     contentContainer: {
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: '700',
//         color: colors.textColor,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     image: {
//         width: '100%',
//         height: 240,
//         resizeMode: 'contain',
//         marginBottom: 24,
//     },
//     description: {
//         fontSize: 15,
//         color: colors.textColor,
//         textAlign: 'center',
//         marginBottom: 30,
//         lineHeight: 22,
//         opacity: 0.8,
//     },
//     dotsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         gap: 8,
//         marginBottom: 28,
//     },
//     dot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: colors.textColor,
//         opacity: 0.3,
//     },
//     dotActive: {
//         backgroundColor: colors.brandYellow,
//         opacity: 1,
//         width: 24,
//     },
//     dontShowContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 24,
//         alignSelf: 'flex-start',
//     },
//     checkbox: {
//         width: 20,
//         height: 20,
//         borderRadius: 4,
//         borderWidth: 2,
//         borderColor: colors.textColor,
//         marginRight: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     checkboxChecked: {
//         backgroundColor: colors.purple,
//         borderColor: colors.purple,
//     },
//     checkmark: {
//         color: colors.brandYellow,
//         fontWeight: 'bold',
//         fontSize: 14,
//     },
//     dontShowText: {
//         fontSize: 14,
//         color: colors.textColor,
//         opacity: 0.8,
//     },
//     button: {
//         paddingVertical: 14,
//         paddingHorizontal: 40,
//         borderRadius: 12,
//         alignItems: 'center',
//         width: '100%',
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: colors.textColor,
//     },
// });



import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const colors = require("@/src/constants/colors");
const { width } = Dimensions.get('window');

const ONBOARDING_STEPS = [
    {
        title: "Record Tips",
        imageLeft: require("@/assets/images/tip-good.png"),
        imageRight: require("@/assets/images/tip-good.png"),
        description: "Hold Steady\nKeep your phone stable to capture a clear recording.",
    },
    {
        title: "Good Lighting",
        imageLeft: require("@/assets/images/tip-good.png"),
        imageRight: require("@/assets/images/tip-good.png"),
        description: "Make sure your subject is well lit for better recognition.",
    },
    {
        title: "Clear Focus",
        imageLeft: require("@/assets/images/tip-bad.png"),
        imageRight: require("@/assets/images/tip-bad.png"),
        description: "Avoid blur. Keep the scene sharp and centered.",
    },
];

interface PremiumOnboardingModalProps {
    visible: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export const OnboardingModal: React.FC<PremiumOnboardingModalProps> = ({
    visible,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState(0);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];

    // Auto-advance through steps
    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            if (step < ONBOARDING_STEPS.length - 1) {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 120,
                    useNativeDriver: true,
                }).start(() => {
                    setStep(step + 1);
                    fadeAnim.setValue(0);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 120,
                        useNativeDriver: true,
                    }).start();
                });
            }
        }, 4000); // Auto-advance every 4 seconds

        return () => clearTimeout(timer);
    }, [step, visible, fadeAnim]);

    // Reset animation when modal opens
    useEffect(() => {
        if (visible) {
            fadeAnim.setValue(1);
            setStep(0);
            setDontShowAgain(false);
        }
    }, [visible]);

    const handleGotIt = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 120,
            useNativeDriver: true,
        }).start(() => {
            onComplete();
        });
    };

    const handleDontShowAgain = () => {
        setDontShowAgain(!dontShowAgain);
    };

    const current = ONBOARDING_STEPS[step];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    {/* Animated Content */}
                    <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
                        {/* Title */}
                        <Text style={styles.title}>{current.title}</Text>

                        {/* Images Row - Good vs Bad */}
                        <View style={styles.imagesRow}>
                            <Image
                                source={current.imageLeft}
                                style={styles.image}
                            />
                            <Image
                                source={current.imageRight}
                                style={styles.image}
                            />
                        </View>

                        {/* Description */}
                        <Text style={styles.description}>
                            {current.description}
                        </Text>

                        {/* Dot Indicators */}
                        <View style={styles.dots}>
                            {ONBOARDING_STEPS.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.dot,
                                        i === step && styles.dotActive,
                                    ]}
                                />
                            ))}
                        </View>

                        {/* Don't Show Again */}
                        <TouchableOpacity
                            style={styles.dontShow}
                            onPress={handleDontShowAgain}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    dontShowAgain && styles.checkboxChecked,
                                ]}
                            >
                                {dontShowAgain && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </View>
                            <Text style={styles.dontShowText}>
                                Don't show me again
                            </Text>
                        </TouchableOpacity>

                        {/* Got It Button */}
                        <TouchableOpacity
                            onPress={handleGotIt}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[colors.purple, colors.brandYellow]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    Got it
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: "#111111",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 28,
        alignItems: 'center',
    },
    title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 16,
    },
    imagesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
        width: '100%',
    },
    image: {
        width: (width - 60) / 2,
        height: 170,
        borderRadius: 16,
        resizeMode: "cover",
        backgroundColor: "#1A1A1A",
    },
    description: {
        color: "#BDBDBD",
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 18,
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#3A3A3A",
    },
    dotActive: {
        backgroundColor: colors.purple,
        width: 14,
    },
    dontShow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        alignSelf: 'flex-start',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#6C6C6C",
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.purple,
        borderColor: colors.purple,
    },
    checkmark: {
        color: colors.brandYellow,
        fontWeight: 'bold',
        fontSize: 12,
    },
    dontShowText: {
        color: "#9E9E9E",
        fontSize: 13,
    },
    button: {
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});