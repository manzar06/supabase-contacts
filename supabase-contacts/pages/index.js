import { useEffect, useState } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

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

  async function handleAddContact(e) {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/addContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number }),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Debugging output
  
      if (response.ok && data) {
        setContacts([...contacts, data]); // Add new contact to state
        setName("");
        setNumber("");
      } else {
        console.error("Error adding contact:", data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
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
              {contact.Name}: {contact.Number}
            </li>
          ))
        ) : (
          <p>Loading contacts...</p>
        )}
      </ul>
    </div>
  );
}
