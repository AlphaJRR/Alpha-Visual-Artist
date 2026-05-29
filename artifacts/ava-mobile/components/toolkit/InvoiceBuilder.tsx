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
        placeholderTextColor="#888888"
        value={item.description}
        onChangeText={(text) => updateLineItem(item.id, "description", text)}
      />
      <TextInput
        style={styles.numericInput}
        placeholder="Qty"
        placeholderTextColor="#888888"
        keyboardType="number-pad"
        value={String(item.quantity)}
        onChangeText={(text) =>
          updateLineItem(item.id, "quantity", parseInt(text, 10) || 0)
        }
      />
      <TextInput
        style={styles.numericInput}
        placeholder="Rate"
        placeholderTextColor="#888888"
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
          placeholderTextColor="#888888"
          value={clientName}
          onChangeText={setClientName}
        />
        <TextInput
          style={styles.clientInput}
          placeholder="Client Email"
          placeholderTextColor="#888888"
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
            <Ionicons name="add-circle" size={20} color="#9B7FD4" />
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
          <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>DOWNLOAD PDF</Text>
        </Pressable>
        <Pressable style={styles.emailButton} onPress={handleEmailInvoice}>
          <Ionicons name="mail" size={18} color="#FFFFFF" />
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
    backgroundColor: "#0D0D0D",
  },
  backRow: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  backTxt: {
    color: "#00d4ff",
    fontSize: 15,
    fontWeight: "600",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: "#2D1B4E",
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
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#CCCCCC",
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
    color: "#888888",
    fontWeight: "600",
    marginBottom: 4,
  },
  metaInput: {
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  metaValue: {
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  clientSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#CCCCCC",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  clientInput: {
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
    fontSize: 13,
    marginBottom: 8,
  },
  itemsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
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
    color: "#9B7FD4",
    fontWeight: "600",
  },
  itemsColumnHeader: {
    flexDirection: "row",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2D1B4E",
  },
  columnLabel: {
    fontSize: 10,
    color: "#888888",
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
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  numericInput: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  lineItemTotal: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    padding: 6,
  },
  totalsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: "#CCCCCC",
  },
  totalValue: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  finalTotal: {
    backgroundColor: "#2D1B4E",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  finalTotalLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  finalTotalValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  downloadButton: {
    backgroundColor: "#2D1B4E",
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emailButton: {
    backgroundColor: "#2D1B4E",
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  footerText: {
    fontSize: 11,
    color: "#888888",
    textAlign: "center",
  },
});
