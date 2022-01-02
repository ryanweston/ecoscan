import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// Silence the warning:
// Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
