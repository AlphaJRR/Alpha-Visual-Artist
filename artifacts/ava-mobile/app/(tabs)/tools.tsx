/**
 * Alpha Creators Toolkit — hub router (additive: preserves shoot calculator)
 */
import React, { useState } from "react";
import { ToolkitNavigator, ToolkitMenuId } from "../../components/toolkit/ToolkitNavigator";
import { PresetsManager } from "../../components/toolkit/PresetsManager";
import { SonyShootingModes } from "../../components/toolkit/SonyShootingModes";
import { ShootCalculator } from "../../components/toolkit/ShootCalculator";
import {
  TrainingModule,
  ChecklistsModule,
  ShortcutsModule,
  InvoiceModule,
} from "../../components/toolkit/ToolkitModules";

export type ViewState =
  | { screen: "menu" }
  | { screen: "calculator" }
  | { screen: "training" }
  | { screen: "checklists" }
  | { screen: "shortcuts" }
  | { screen: "invoice" }
  | { screen: "presets" }
  | { screen: "shooting-modes" };

export default function ToolsScreen() {
  const [viewState, setViewState] = useState<ViewState>({ screen: "menu" });

  const goMenu = () => setViewState({ screen: "menu" });

  const handleSelect = (id: ToolkitMenuId) => {
    setViewState({ screen: id });
  };

  switch (viewState.screen) {
    case "menu":
      return <ToolkitNavigator onSelect={handleSelect} />;
    case "calculator":
      return <ShootCalculator onBack={goMenu} />;
    case "training":
      return <TrainingModule onBack={goMenu} />;
    case "checklists":
      return <ChecklistsModule onBack={goMenu} />;
    case "shortcuts":
      return <ShortcutsModule onBack={goMenu} />;
    case "invoice":
      return <InvoiceModule onBack={goMenu} />;
    case "presets":
      return <PresetsManager onBack={goMenu} />;
    case "shooting-modes":
      return <SonyShootingModes onBack={goMenu} />;
    default:
      return <ToolkitNavigator onSelect={handleSelect} />;
  }
}
