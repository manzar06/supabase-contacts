import { useEffect, useState } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/getContacts");
        const data = await response.json();
        console.log("Fetched contacts:", data); // Debugging output
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
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
