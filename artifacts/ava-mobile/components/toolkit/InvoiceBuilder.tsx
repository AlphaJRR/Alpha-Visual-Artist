import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ToolkitSectionImage,
  toolkitSectionImageStyle,
} from "./ToolkitSectionImage";
import { brandColors, fontFamilies } from "@/constants/brand";

const C = brandColors;
const F = fontFamilies;

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

type LineItemField = keyof Pick<LineItem, "description" | "quantity" | "rate">;

type InvoiceBuilderProps = {
  onBack?: () => void;
};

export function InvoiceBuilder({ onBack }: InvoiceBuilderProps) {
  const insets = useSafeAreaInsets();
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "Video Production", quantity: 1, rate: 2500 },
  ]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      rate: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: LineItemField, value: string | number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleDownloadPDF = () => {
    Alert.alert("Export", "PDF export feature coming soon");
  };

  const handleEmailInvoice = () => {
    if (!clientEmail.trim()) {
      Alert.alert("Error", "Please enter client email");
      return;
    }
    Alert.alert("Success", `Invoice sent to ${clientEmail}`);
  };

  const renderLineItem = ({ item }: { item: LineItem }) => (
    <View style={styles.lineItemContainer}>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        placeholderTextColor={C.subtleText}
        value={item.description}
        onChangeText={(text) => updateLineItem(item.id, "description", text)}
      />
      <TextInput
        style={styles.numericInput}
        placeholder="Qty"
        placeholderTextColor={C.subtleText}
        keyboardType="number-pad"
        value={String(item.quantity)}
        onChangeText={(text) =>
          updateLineItem(item.id, "quantity", parseInt(text, 10) || 0)
        }
      />
      <TextInput
        style={styles.numericInput}
        placeholder="Rate"
        placeholderTextColor={C.subtleText}
        keyboardType="decimal-pad"
        value={String(item.rate)}
        onChangeText={(text) =>
          updateLineItem(item.id, "rate", parseFloat(text) || 0)
        }
      />
      <Text style={styles.lineItemTotal}>
        ${(item.quantity * item.rate).toFixed(2)}
      </Text>
      <Pressable
        onPress={() => removeLineItem(item.id)}
        style={styles.deleteButton}
        accessibilityRole="button"
        accessibilityLabel="Remove line item"
      >
        <Ionicons name="trash" size={18} color="#FF6B6B" />
      </Pressable>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {onBack ? (
        <Pressable onPress={onBack} style={[styles.backRow, { paddingTop: insets.top + 8 }]}>
          <Text style={styles.backTxt}>← Toolkit</Text>
        </Pressable>
      ) : null}

      <ToolkitSectionImage
        filename="invoice-builder.png"
        style={[toolkitSectionImageStyle, { marginHorizontal: 16 }]}
      />

      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/images/ava-app-logo-2026.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>
        <Text style={styles.headerTitle}>ALPHA VISUAL ARTISTS</Text>
        <Text style={styles.headerSubtitle}>Professional Invoice</Text>
      </View>

      <View style={styles.metaSection}>
        <View style={styles.metaField}>
          <Text style={styles.metaLabel}>Invoice #</Text>
          <TextInput
            style={styles.metaInput}
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
          />
        </View>
        <View style={styles.metaField}>
          <Text style={styles.metaLabel}>Date</Text>
          <Text style={styles.metaValue}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.clientSection}>
        <Text style={styles.sectionTitle}>BILL TO</Text>
        <TextInput
          style={styles.clientInput}
          placeholder="Client Name"
          placeholderTextColor={C.subtleText}
          value={clientName}
          onChangeText={setClientName}
        />
        <TextInput
          style={styles.clientInput}
          placeholder="Client Email"
          placeholderTextColor={C.subtleText}
          keyboardType="email-address"
          autoCapitalize="none"
          value={clientEmail}
          onChangeText={setClientEmail}
        />
      </View>

      <View style={styles.itemsSection}>
        <View style={styles.itemsHeader}>
          <Text style={styles.sectionTitle}>ITEMS</Text>
          <Pressable onPress={addLineItem} style={styles.addButton}>
            <Ionicons name="add-circle" size={20} color={C.alphaRed} />
            <Text style={styles.addButtonText}>Add Item</Text>
          </Pressable>
        </View>

        <View style={styles.itemsColumnHeader}>
          <Text style={[styles.columnLabel, styles.colDescription]}>Description</Text>
          <Text style={styles.columnLabel}>Qty</Text>
          <Text style={styles.columnLabel}>Rate</Text>
          <Text style={styles.columnLabel}>Total</Text>
        </View>

        <FlatList
          data={lineItems}
          renderItem={renderLineItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax (10%)</Text>
          <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, styles.finalTotal]}>
          <Text style={styles.finalTotalLabel}>TOTAL</Text>
          <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Pressable style={styles.downloadButton} onPress={handleDownloadPDF}>
          <Ionicons name="download-outline" size={18} color={C.pureWhite} />
          <Text style={styles.buttonText}>DOWNLOAD PDF</Text>
        </Pressable>
        <Pressable style={styles.emailButton} onPress={handleEmailInvoice}>
          <Ionicons name="mail" size={18} color={C.pureWhite} />
          <Text style={styles.buttonText}>EMAIL INVOICE</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Thank you for your business. Payment due upon receipt.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.deepBlack,
  },
  backRow: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  backTxt: {
    color: C.alphaRed,
    fontSize: 15,
    fontFamily: F.bodySemiBold,
    fontWeight: "600",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.graphite,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: C.borderGray,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  logoImage: {
    width: 48,
    height: 48,
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: F.display,
    fontWeight: "900",
    color: C.pureWhite,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: F.body,
    color: C.secondaryText,
  },
  metaSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  metaField: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontFamily: F.mono,
    color: C.subtleText,
    fontWeight: "600",
    marginBottom: 4,
  },
  metaInput: {
    backgroundColor: C.graphite,
    color: C.pureWhite,
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: F.body,
  },
  metaValue: {
    backgroundColor: C.graphite,
    color: C.pureWhite,
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: F.body,
  },
  clientSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.graphite,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: F.mono,
    fontWeight: "900",
    color: C.secondaryText,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  clientInput: {
    backgroundColor: C.graphite,
    color: C.pureWhite,
    padding: 10,
    borderRadius: 4,
    fontSize: 13,
    fontFamily: F.body,
    marginBottom: 8,
  },
  itemsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.graphite,
  },
  itemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    fontSize: 11,
    fontFamily: F.bodySemiBold,
    color: C.alphaRed,
    fontWeight: "600",
  },
  itemsColumnHeader: {
    flexDirection: "row",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.borderGray,
  },
  columnLabel: {
    fontSize: 10,
    fontFamily: F.mono,
    color: C.subtleText,
    fontWeight: "600",
    flex: 1,
  },
  colDescription: {
    flex: 2,
  },
  lineItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  descriptionInput: {
    flex: 2,
    backgroundColor: C.graphite,
    color: C.pureWhite,
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: F.body,
  },
  numericInput: {
    flex: 1,
    backgroundColor: C.graphite,
    color: C.pureWhite,
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: F.body,
  },
  lineItemTotal: {
    flex: 1,
    color: C.pureWhite,
    fontSize: 12,
    fontFamily: F.bodySemiBold,
    fontWeight: "600",
  },
  deleteButton: {
    padding: 6,
  },
  totalsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.graphite,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: F.body,
    color: C.secondaryText,
  },
  totalValue: {
    fontSize: 12,
    fontFamily: F.bodySemiBold,
    color: C.pureWhite,
    fontWeight: "600",
  },
  finalTotal: {
    backgroundColor: C.alphaRed,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  finalTotalLabel: {
    fontSize: 13,
    fontFamily: F.display,
    fontWeight: "900",
    color: C.pureWhite,
  },
  finalTotalValue: {
    fontSize: 16,
    fontFamily: F.display,
    fontWeight: "900",
    color: C.pureWhite,
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  downloadButton: {
    backgroundColor: C.alphaRed,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emailButton: {
    backgroundColor: C.alphaRed,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: F.bodySemiBold,
    fontWeight: "900",
    color: C.pureWhite,
    letterSpacing: 0.5,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: C.graphite,
  },
  footerText: {
    fontSize: 11,
    fontFamily: F.body,
    color: C.subtleText,
    textAlign: "center",
  },
});
