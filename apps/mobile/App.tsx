import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
// Współdzielone z web: te same treści i logika, jeden monorepo-pakiet.
import { courses, totalLessonCount } from "@cryptouni/content";

const allLessons = courses.flatMap((course) =>
  course.lessons.map((lesson) => ({
    key: lesson.slug,
    title: lesson.title,
    summary: lesson.summary,
    course: course.title,
    icon: course.icon,
  })),
);

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.brand}>CryptoUni</Text>
        <Text style={styles.subtitle}>
          {totalLessonCount} lekcji · nauka krypto od podstaw
        </Text>
      </View>
      <FlatList
        data={allLessons}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardCourse}>{item.course}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSummary}>{item.summary}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0b1020" },
  header: { padding: 20, paddingBottom: 8 },
  brand: { color: "#a78bfa", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#94a3b8", marginTop: 4 },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 16,
  },
  icon: { fontSize: 28 },
  cardBody: { flex: 1 },
  cardCourse: { color: "#7c3aed", fontSize: 11, textTransform: "uppercase" },
  cardTitle: { color: "#f8fafc", fontSize: 16, fontWeight: "700", marginTop: 2 },
  cardSummary: { color: "#94a3b8", fontSize: 13, marginTop: 4 },
});
