import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Label, Button, Field, Description } from "@headlessui/react";
import clsx from "clsx";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(""); // State for name validation error
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const [messageError, setMessageError] = useState(""); // State for message validation error

  // Mengambil foto random dari Lorem Picsum
  useEffect(() => {
    const fetchPhoto = () => {
      const randomNumber = Math.floor(Math.random() * 1000);
      setPhoto(`https://picsum.photos/id/${randomNumber}/200/200`);
    };
    fetchPhoto();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate name
    if (name.trim() === "") {
      setNameError("Name cannot be empty.");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate message length
    if (message.length < 10) {
      setMessageError("Message must be at least 10 characters long.");
      isValid = false;
    } else {
      setMessageError("");
    }

    if (!isValid) return;

    setLoading(true);

    const feedbackData = {
      name,
      email,
      message,
      photo,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/feedback",
        feedbackData
      );
      console.log("Feedback berhasil dikirim:", response.data);
      alert("Feedback berhasil dikirim");
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      alert("Gagal mengirim feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Feedback Form
        </h2>

        <div className="mb-6">
          <Field>
            <Label className="block text-sm font-medium text-gray-700">
              Name:
            </Label>
            <Description className="text-sm text-gray-500">
              Use your real name so people will recognize you.
            </Description>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={clsx(
                "mt-2 block w-full rounded-md border-gray-300 py-2 px-4 text-sm text-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "border"
              )}
            />
            {nameError && (
              <p className="mt-2 text-sm text-red-600">{nameError}</p>
            )}
          </Field>
        </div>

        <div className="mb-6">
          <Field>
            <Label className="block text-sm font-medium text-gray-700">
              Email:
            </Label>
            <Description className="text-sm text-gray-500">
              We'll never share your email with anyone.
            </Description>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={clsx(
                "mt-2 block w-full rounded-md border-gray-300 py-2 px-4 text-sm text-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "border"
              )}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </Field>
        </div>

        <div className="mb-6">
          <Field>
            <Label className="block text-sm font-medium text-gray-700">
              Message:
            </Label>
            <Description className="text-sm text-gray-500">
              Please provide your feedback or message.
            </Description>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className={clsx(
                "mt-2 block w-full rounded-md border-gray-300 py-2 px-4 text-sm text-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "border"
              )}
              required
            ></textarea>
            {messageError && (
              <p className="mt-2 text-sm text-red-600">{messageError}</p>
            )}
          </Field>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 px-4 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {loading ? "Mengirim..." : "Kirim Feedback"}
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
