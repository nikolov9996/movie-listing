import Router from "static/Router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Router />
    </GestureHandlerRootView>
  );
}
