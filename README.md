# Meta Lead Tracker

A real-time lead tracking Proof of Concept built with **Meta Lead Ads**, **Node.js**, **Socket.IO**, and **React Native (Expo)**.

The application demonstrates how a lead submitted through a Meta Lead Form can instantly appear inside an already-open React Native application without requiring any manual refresh or user interaction.

---

# 📱 Demo Overview

Workflow:

Meta Lead Form
↓
Meta Webhook
↓
Node.js Backend (Render)
↓
Socket.IO Event
↓
React Native App
↓
Lead Appears Instantly

The system uses Meta's Lead Testing Tool to simulate lead submissions without requiring a live advertising campaign.

---

# 🎯 Assignment Objective

Build a working Proof of Concept where:

- A lead is submitted through Meta Lead Ads.
- The backend receives the webhook event.
- The lead is pushed to connected clients in real time.
- The lead appears immediately inside an already-open React Native application.
- No manual refresh or interaction is required.

---

# 🏗️ System Architecture

```text
┌─────────────────────┐
│  Meta Lead Form     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Meta Webhook Event  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Express Backend     │
│ (Render Deployment) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Socket.IO        │
│ Realtime Gateway    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ React Native App    │
│    (Expo Go)        │
└─────────────────────┘
```

---

# 🔄 Application Workflow

### Step 1 — Meta Lead Submission

A user submits a Meta Lead Form.

For development and testing purposes, Meta's Lead Testing Tool is used to simulate submissions.

---

### Step 2 — Meta Sends Webhook

Meta sends a POST request to the webhook endpoint.

Example:

```http
POST /webhook
```

Payload:

```json
{
  "entry": [
    {
      "changes": [
        {
          "field": "leadgen",
          "value": {
            "leadgen_id": "123456"
          }
        }
      ]
    }
  ]
}
```

---

### Step 3 — Backend Receives Event

The Express backend receives the webhook event and validates the request.

File:

```text
backend/src/routes/webhookRoutes.js
```

---

### Step 4 — Socket.IO Broadcast

After processing the webhook, the backend emits a realtime event.

Example:

```javascript
io.emit("newLead", lead);
```

---

### Step 5 — React Native Receives Update

The mobile application listens for Socket.IO events.

Example:

```javascript
socket.on("newLead", (lead) => {
  setLeads((prev) => [lead, ...prev]);
});
```

---

### Step 6 — UI Updates Instantly

The lead appears at the top of the list without:

- Refreshing
- Reopening the application
- Any manual action

---

# 🛠️ Technologies Used

## Backend

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | API Server |
| Socket.IO | Realtime Communication |
| CORS | Cross-Origin Requests |
| dotenv | Environment Variables |

---

## Mobile

| Technology | Purpose |
|------------|----------|
| React Native | Mobile Application |
| Expo | Development Environment |
| Context API | State Management |
| Socket.IO Client | Realtime Updates |

---

## External Services

| Service | Purpose |
|----------|----------|
| Meta Developers | Lead Webhooks |
| Meta Lead Testing Tool | Test Lead Generation |
| Render | Backend Hosting |
| GitHub | Version Control |

---

# 📂 Project Structure

```text
meta-lead-tracker
│
├── backend
│   │
│   ├── src
│   │   ├── config
│   │   │   └── socket.js
│   │   │
│   │   ├── routes
│   │   │   └── webhookRoutes.js
│   │   │
│   │   ├── services
│   │   │   └── leadService.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
├── mobile
│   │
│   ├── app
│   │   ├── _layout.jsx
│   │   └── index.jsx
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── Header.jsx
│   │   │   ├── LeadCard.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── context
│   │   │   └── LeadsContext.jsx
│   │   │
│   │   ├── screens
│   │   │   └── LeadsScreen.jsx
│   │   │
│   │   └── services
│   │       └── socketService.js
│   │
│   └── package.json
│
└── README.md
```

---

# ⚡ Features

### Realtime Lead Tracking

New leads automatically appear without refreshing.

---

### Socket.IO Integration

Instant communication between backend and mobile application.

---

### Meta Lead Webhooks

Receives lead events from Meta Lead Ads.

---

### Modern Mobile UI

Includes:

- Live connection indicator
- Lead statistics
- Lead cards
- Toast notifications
- Empty state screen
- Dark theme interface

---

### Responsive Lead List

Newest leads always appear first.

---

# 🌐 Backend Deployment

Hosted on:

```text
Render
```

Example URL:

```text
https://react-native-lead-tracker.onrender.com
```

Webhook endpoint:

```text
https://react-native-lead-tracker.onrender.com/webhook
```

---

# 📡 Socket.IO Connection

Client connects to:

```javascript
https://react-native-lead-tracker.onrender.com
```

Realtime events:

```javascript
newLead
```

---

#  Local Development Setup

## Clone Repository

```bash
git clone <repository-url>
cd meta-lead-tracker
```

---

## Backend Setup

```bash
cd backend
npm install
node src/server.js
```

Server:

```text
http://localhost:3000
```

---

## Mobile Setup

```bash
cd mobile
npm install
npx expo start
```

Scan QR code using Expo Go.

---

# 🧪 Testing

## Meta Lead Testing Tool

1. Open Meta Developer Dashboard.
2. Navigate to Webhooks.
3. Subscribe to:

```text
leadgen
```

4. Click:

```text
Test
```

5. Click:

```text
Send To My Server
```

Expected Result:

```text
Lead appears instantly in mobile application.
```

---

## Empty State

![Empty State](docs/screenshots/empty-state.png)

---

## Live Leads

![Live Leads](docs/screenshots/live-state.png)

---

## New Lead Toast

![Toast](docs/screenshots/toast-notification.png)

---

# 🎥 Loom Demonstration

Demo Video:

```text
Add Loom URL Here
```

---

# 🧠 Key Engineering Decisions

### Why Socket.IO?

Socket.IO provides realtime bidirectional communication and ensures that new leads are delivered instantly to connected devices.

---

### Why Render?

Render provides a simple deployment platform with HTTPS support required for Meta Webhooks.

---

### Why React Native + Expo?

Expo enables rapid development and testing across mobile devices without requiring native Android/iOS builds during development.

---

# 🔮 Future Improvements

- Real Meta Graph API lead retrieval
- Persistent database storage
- Push notifications
- Authentication
- Lead details screen
- Web dashboard
- Analytics and reporting

---

# 👨‍💻 Author

Pritam Priyam

GitHub:
https://github.com/Pritampriyam

---

# ✅ Assignment Requirements Covered

- React Native application
- Meta Lead Ads integration
- Meta Lead Testing Tool support
- Realtime lead updates
- No manual refresh required
- GitHub repository
- Architecture explanation
- Loom demonstration support
