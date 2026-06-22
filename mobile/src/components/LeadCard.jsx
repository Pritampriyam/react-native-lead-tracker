import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getRelativeTime = (createdAt) => {
  if (!createdAt) {
    return "Just now";
  }

  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return "Just now";
  }

  const diffInSeconds = Math.max(0, Math.floor((Date.now() - createdTime) / 1000));

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  return `${Math.floor(diffInHours / 24)} day ago`;
};

const LeadCard = ({ name, email, phone, createdAt, isLatest = false }) => {
  return (
    <View style={[styles.card, isLatest && styles.latestCard]}>
      <View style={[styles.avatar, isLatest && styles.latestAvatar]}>
        <Text style={styles.avatarText}>{getInitials(name)}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>

          {isLatest ? (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.email} numberOfLines={1}>
          {email}
        </Text>

        {phone ? (
          <Text style={styles.phone} numberOfLines={1}>
            {phone}
          </Text>
        ) : null}

        <Text style={styles.timestamp}>{getRelativeTime(createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171A21",
    borderColor: "#2A2F3A",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  latestCard: {
    borderColor: "#22C55E",
    backgroundColor: "#092F1B",
    shadowColor: "#22C55E",
    shadowOpacity: 0.18,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    justifyContent: "center",
  },
  latestAvatar: {
    backgroundColor: "rgba(34, 197, 94, 0.16)",
  },
  avatarText: {
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  email: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },
  phone: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 4,
  },
  timestamp: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 6,
  },
  newBadge: {
    backgroundColor: "#22C55E",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
});

export default LeadCard;
