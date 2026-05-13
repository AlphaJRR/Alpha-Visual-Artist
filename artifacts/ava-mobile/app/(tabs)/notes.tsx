import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

const STORAGE_KEY = "ava_shoot_notes_v1";

type Shot = {
  id: string;
  text: string;
  done: boolean;
};

const STARTER_CHECKLIST = [
  "Charge all batteries (camera, mic, lights)",
  "Format SD cards / SSDs",
  "Pack ND filters",
  "Confirm call sheet with talent",
  "Test audio levels on location",
];

export default function NotesScreen() {
  const insets = useSafeAreaInsets();
  const [shots, setShots] = useState<Shot[]>([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setShots(JSON.parse(raw));
        } else {
          setShots(
            STARTER_CHECKLIST.map((text, i) => ({
              id: `seed-${i}`,
              text,
              done: false,
            })),
          );
        }
      } catch {
        setShots([]);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(shots)).catch(() => {});
  }, [shots, loaded]);

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setShots((s) => [
      { id: `${Date.now()}`, text, done: false },
      ...s,
    ]);
    setDraft("");
  };

  const toggle = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setShots((s) =>
      s.map((sh) => (sh.id === id ? { ...sh, done: !sh.done } : sh)),
    );
  };

  const remove = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setShots((s) => s.filter((sh) => sh.id !== id));
  };

  const clearDone = () => {
    const doneCount = shots.filter((s) => s.done).length;
    if (doneCount === 0) return;
    Alert.alert(
      "Clear completed?",
      `Remove ${doneCount} checked item${doneCount > 1 ? "s" : ""}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => setShots((s) => s.filter((x) => !x.done)),
        },
      ],
    );
  };

  const remaining = shots.filter((s) => !s.done).length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.root}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>Shoot Day</Text>
          <Text style={styles.h1}>Shot List</Text>
          <Text style={styles.sub}>
            {remaining} remaining · {shots.length} total
          </Text>
        </View>
        {shots.some((s) => s.done) && (
          <Pressable onPress={clearDone} style={styles.clearBtn} hitSlop={10}>
            <Text style={styles.clearTxt}>Clear Done</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        {shots.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="film-outline" size={48} color="#333" />
            <Text style={styles.emptyTxt}>
              Nothing on the list. Add your first shot below.
            </Text>
          </View>
        ) : (
          shots.map((s) => (
            <View key={s.id} style={styles.row}>
              <Pressable
                onPress={() => toggle(s.id)}
                style={[styles.check, s.done && styles.checkDone]}
                hitSlop={8}
              >
                {s.done && (
                  <Ionicons name="checkmark" size={16} color="#000" />
                )}
              </Pressable>
              <Text
                style={[styles.shotTxt, s.done && styles.shotTxtDone]}
                onPress={() => toggle(s.id)}
              >
                {s.text}
              </Text>
              <Pressable onPress={() => remove(s.id)} hitSlop={10}>
                <Ionicons name="close" size={20} color="#555" />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Add a shot, prop, or reminder…"
          placeholderTextColor="#555"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={add}
          blurOnSubmit={false}
        />
        <Pressable
          onPress={add}
          style={({ pressed }) => [
            styles.addBtn,
            pressed && { opacity: 0.7 },
            !draft.trim() && { opacity: 0.4 },
          ]}
          disabled={!draft.trim()}
        >
          <Ionicons name="add" size={26} color="#000" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a" },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  eyebrow: {
    color: "#00d4ff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  h1: { color: "#fff", fontSize: 32, fontWeight: "800", letterSpacing: -0.5 },
  sub: { color: "#888", fontSize: 13, marginTop: 4 },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  clearTxt: {
    color: "#ccc",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  list: { flex: 1 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 16 },
  emptyTxt: {
    color: "#555",
    fontSize: 14,
    textAlign: "center",
    maxWidth: 240,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  checkDone: { backgroundColor: "#00d4ff", borderColor: "#00d4ff" },
  shotTxt: { flex: 1, color: "#eee", fontSize: 16, lineHeight: 22 },
  shotTxtDone: {
    color: "#555",
    textDecorationLine: "line-through",
  },
  inputBar: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#0a0a0a",
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#00d4ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
