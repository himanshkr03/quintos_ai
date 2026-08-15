// File: E:\quintos_ai\data\dashboard.ts

export interface MockAPIKey {
  id: string;
  name: string;
  keyPrefix: string;
  fullKeyPreview: string;
  environment: "Production" | "Research Staging" | "Evaluation";
  created: string;
  lastUsed: string;
  status: "Active" | "Revoked";
}

export interface MockInvoice {
  id: string;
  description: string;
  amount: string;
  date: string;
  status: "Paid" | "Processing";
  downloadFileName: string;
}

export interface MockModelStatus {
  id: string;
  name: string;
  domain: string;
  version: string;
  latency: string;
  status: "Operational" | "Benchmarking" | "Simulated";
  throughput: string;
}

export interface MockActivityItem {
  id: string;
  action: string;
  target: string;
  user: string;
  timestamp: string;
  type: "key" | "model" | "billing" | "compute";
}

export interface MockNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

export const INITIAL_MOCK_API_KEYS: MockAPIKey[] = [
  {
    id: "key-1",
    name: "Production Lab VPC",
    keyPrefix: "qnt_live_8f9a",
    fullKeyPreview: "qnt_live_8f9a2b7c4d1e9f0a3b5c7d9e",
    environment: "Production",
    created: "Aug 01, 2026",
    lastUsed: "12 mins ago",
    status: "Active",
  },
  {
    id: "key-2",
    name: "Biomedical Vision Pipeline",
    keyPrefix: "qnt_live_3c4d",
    fullKeyPreview: "qnt_live_3c4d5e6f7a8b9c0d1e2f3a4b",
    environment: "Production",
    created: "Jul 24, 2026",
    lastUsed: "2 hours ago",
    status: "Active",
  },
  {
    id: "key-3",
    name: "Research Staging Sandbox",
    keyPrefix: "qnt_test_7e1a",
    fullKeyPreview: "qnt_test_7e1a9b2c4d5f8a0b3c6d9e1f",
    environment: "Research Staging",
    created: "Jul 15, 2026",
    lastUsed: "3 days ago",
    status: "Active",
  },
];

export const INITIAL_MOCK_INVOICES: MockInvoice[] = [
  {
    id: "INV-2026-0801",
    description: "Enterprise Sovereign Compute Tier - Monthly",
    amount: "$299.00",
    date: "Aug 01, 2026",
    status: "Paid",
    downloadFileName: "invoice_quintos_aug2026.pdf",
  },
  {
    id: "INV-2026-0701",
    description: "Enterprise Sovereign Compute Tier - Monthly",
    amount: "$299.00",
    date: "Jul 01, 2026",
    status: "Paid",
    downloadFileName: "invoice_quintos_jul2026.pdf",
  },
  {
    id: "INV-2026-0601",
    description: "Pro Lab Research Cluster - Monthly",
    amount: "$99.00",
    date: "Jun 01, 2026",
    status: "Paid",
    downloadFileName: "invoice_quintos_jun2026.pdf",
  },
];

export const MOCK_MODELS: MockModelStatus[] = [
  {
    id: "m-1",
    name: "Quintos Reasoning v1",
    domain: "Mathematical & Algorithmic Deduction",
    version: "v1.2.0-rc",
    latency: "42ms / token",
    status: "Operational",
    throughput: "98.4 req/s",
  },
  {
    id: "m-2",
    name: "Quintos Bio-Vision 3D",
    domain: "Volumetric MRI & CT Segmentation",
    version: "v0.9.4-proto",
    latency: "118ms / slice",
    status: "Operational",
    throughput: "34.1 slices/s",
  },
  {
    id: "m-3",
    name: "Quintos Quantum VQE",
    domain: "Noisy Intermediate-Scale Simulation",
    version: "v0.5.1-exp",
    latency: "260ms / circuit",
    status: "Benchmarking",
    throughput: "12.8 circuits/s",
  },
  {
    id: "m-4",
    name: "Quintos Secure LLM Node",
    domain: "Air-Gapped Sovereign Inference",
    version: "v1.0.0",
    latency: "35ms / token",
    status: "Operational",
    throughput: "142 req/s",
  },
];

export const MOCK_ACTIVITIES: MockActivityItem[] = [
  {
    id: "act-1",
    action: "Generated API Key",
    target: "Production Lab VPC",
    user: "Himanshu Rajak",
    timestamp: "18 mins ago",
    type: "key",
  },
  {
    id: "act-2",
    action: "Model Invocation Burst",
    target: "Quintos Reasoning v1",
    user: "Automated Pipeline",
    timestamp: "1 hour ago",
    type: "model",
  },
  {
    id: "act-3",
    action: "Compute Quota Auto-Renewed",
    target: "500 GPU Hours",
    user: "System Scheduler",
    timestamp: "3 hours ago",
    type: "compute",
  },
  {
    id: "act-4",
    action: "Invoice Settled",
    target: "INV-2026-0801 ($299.00)",
    user: "Billing Service",
    timestamp: "1 day ago",
    type: "billing",
  },
];

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: "notif-1",
    title: "Sovereign Node Healthy",
    description: "All simulated model endpoints are operating within nominal latency thresholds.",
    time: "10 mins ago",
    read: false,
    type: "success",
  },
  {
    id: "notif-2",
    title: "Compute Allocation Notice",
    description: "Current billing cycle has consumed 48% of monthly allocated GPU compute credits.",
    time: "2 hours ago",
    read: false,
    type: "info",
  },
  {
    id: "notif-3",
    title: "Demo Environment Active",
    description: "Dashboard is running in demonstration mode. No live telemetry is sent to external servers.",
    time: "1 day ago",
    read: true,
    type: "info",
  },
];
