import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InvoiceBuilder } from "./InvoiceBuilder";
import {
  ToolkitSectionImage,
  toolkitSectionImageStyle,
} from "./ToolkitSectionImage";
import { toolkitStyles as s } from "./toolkitStyles";

interface ModuleProps {
  onBack: () => void;
}

function ToolkitModuleShell({
  title,
  subtitle,
  onBack,
  children,
}: ModuleProps & { title: string; subtitle?: string; children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={[
        s.content,
        { paddingTop: 8, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Pressable onPress={onBack}>
        <Text style={s.backTxt}>← Toolkit</Text>
      </Pressable>
      <View style={s.header}>
        <Text style={s.title}>{title}</Text>
        {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
    </ScrollView>
  );
}

export function TrainingModule({ onBack }: ModuleProps) {
  return (
    <ToolkitModuleShell title="Creator Training" subtitle="Workflow fundamentals" onBack={onBack}>
      <ToolkitSectionImage
        filename="creator-training.png"
        style={toolkitSectionImageStyle}
      />
      <Text style={s.placeholder}>
        <Text style={{ fontWeight: "700" }}>Module 1:</Text> Client intake — scope,
        deliverables, timeline, usage rights.
      </Text>
      <Text style={s.placeholder}>
        <Text style={{ fontWeight: "700" }}>Module 2:</Text> Pre-production — shot list,
        gear prep, location scout.
      </Text>
      <Text style={s.placeholder}>
        <Text style={{ fontWeight: "700" }}>Module 3:</Text> On-set — slate, audio checks,
        exposure consistency.
      </Text>
      <Text style={s.placeholder}>
        <Text style={{ fontWeight: "700" }}>Module 4:</Text> Post — proxy workflow, color,
        delivery specs for social vs broadcast.
      </Text>
    </ToolkitModuleShell>
  );
}

const CHECKLIST = [
  "Batteries charged (camera, grip, audio)",
  "Cards formatted & labeled",
  "Lens cloth, ND filters, rain cover",
  "Lav + boom + headphones test",
  "White balance + picture profile confirmed",
  "Client brief reviewed on set",
  "Backup audio recorder rolling",
  "Room tone captured (30s)",
];

export function ChecklistsModule({ onBack }: ModuleProps) {
  return (
    <ToolkitModuleShell title="Production Checklists" onBack={onBack}>
      <ToolkitSectionImage
        filename="production-checklists.png"
        style={toolkitSectionImageStyle}
      />
      {CHECKLIST.map((item) => (
        <Text key={item} style={s.listItem}>
          ☐ {item}
        </Text>
      ))}
    </ToolkitModuleShell>
  );
}

export function ShortcutsModule({ onBack }: ModuleProps) {
  const rows = [
    ["C1", "AF/MF toggle"],
    ["C2", "Focus peaking on/off"],
    ["C3", "Zebra display toggle"],
    ["C4", "S&Q / slow motion quick"],
    ["Fn", "White balance picker"],
  ];
  return (
    <ToolkitModuleShell title="Camera Shortcuts" onBack={onBack}>
      <View style={s.card}>
        <Text style={s.cardTitle}>Suggested custom buttons (Sony)</Text>
        {rows.map(([label, value]) => (
          <View key={label} style={s.row}>
            <Text style={s.rowLabel}>{label}</Text>
            <Text style={s.rowValue}>{value}</Text>
          </View>
        ))}
      </View>
    </ToolkitModuleShell>
  );
}

export function InvoiceModule({ onBack }: ModuleProps) {
  return <InvoiceBuilder onBack={onBack} />;
}
