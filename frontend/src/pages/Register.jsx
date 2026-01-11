import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    alert("Register successful (backend later)");
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold">Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mt-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mt-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mt-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2 w-full mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
}
