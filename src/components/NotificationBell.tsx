import React, { useState } from "react";

const NotificationBell = ({ notifications }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", cursor: "pointer" }}>
      <div onClick={toggleDropdown}>
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: 12,
            }}
          >
            {notifications.length}
          </span>
        )}
      </div>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: 250,
            zIndex: 1000,
            padding: 10,
          }}
        >
          {notifications.length === 0 ? (
            <div style={{ padding: 10, color: "#555" }}>No notifications</div>
          ) : (
            notifications.map((n, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "6px 0",
                  fontSize: 14,
                  color: "#333",
                }}
              >
                <strong>{n.user?.email}</strong> commented on{" "}
                <em>{n.post?.name}</em>:<br />
                <span style={{ color: "#666" }}>{n.content}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
