import { useEffect, useState } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");

  // Fetch contacts on page load
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/getContacts");
        const data = await response.json();
        console.log("Fetched contacts:", data);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, []);

  // Add a new contact
  async function handleAddContact(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/addContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data) {
        setContacts((prevContacts) => [...prevContacts, data]);
        setName("");
        setNumber("");
      } else {
        console.error("Error adding contact:", data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }

  // Delete a contact
  async function handleDeleteContact(id) {
    try {
      const response = await fetch("/api/deleteContact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      console.log("Delete Response:", data);

      if (response.ok) {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      } else {
        console.error("Error deleting contact:", data.error);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  // Enable edit mode
  function handleEditClick(contact) {
    setEditingId(contact.id);
    setEditName(contact.Name);
    setEditNumber(contact.Number);
  }

  // Update a contact
  async function handleUpdateContact(e) {
    e.preventDefault();
  
    console.log("🚀 Sending Update Request:", { id: editingId, name: editName, number: editNumber });
  
    try {
      const response = await fetch("/api/updateContact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, name: editName, number: editNumber }),
      });
  
      const text = await response.text();
      console.log("📩 Raw API Response:", text);
  
      if (!text) {
        console.error("❌ Empty response from server");
        return;
      }
  
      const data = JSON.parse(text);
      console.log("✅ Update Response:", data);
  
      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact.id === editingId ? { ...contact, Name: editName, Number: editNumber } : contact
          )
        );
        setEditingId(null);
        setEditName("");
        setEditNumber("");
      } else {
        console.error("❌ Error updating contact:", data.error);
      }
    } catch (error) {
      console.error("❌ Error updating contact:", error);
    }
  }
  
  
  
  return (
    <div>
      <h1>Contacts</h1>
      <form onSubmit={handleAddContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>

      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              {editingId === contact.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editNumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                  />
                  <button onClick={handleUpdateContact}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {contact.Name}: {contact.Number}
                  <button
                    onClick={() => handleEditClick(contact)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                  >
                    ❌
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>Loading contacts...</p>
        )}
      </ul>
    </div>
  );
}
