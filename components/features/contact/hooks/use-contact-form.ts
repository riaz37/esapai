"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useToast } from "@/components/ui/toast";
import type { ContactFormData, SubmissionState } from "../sections/contact-form-card";

export function useContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        fullName: "",
        email: "",
        message: "",
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
    const { showToast } = useToast();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: ContactFormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!agreedToTerms) {
            showToast("Please accept the terms to continue.", "error");
            return;
        }

        setIsSubmitting(true);
        setSubmissionState("sending");

        try {
            // Step 1: Validate on server (Arcjet protection, rate limiting, etc.)
            const validationResponse = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (!validationResponse.ok) {
                const errorData = (await validationResponse.json()) as {
                    success: boolean;
                    message: string;
                };
                throw new Error(errorData.message || "Validation failed");
            }

            const validationData = (await validationResponse.json()) as {
                success: boolean;
                data?: {
                    name: string;
                    email: string;
                    message: string;
                    access_key: string;
                };
            };

            if (!validationData.success || !validationData.data) {
                throw new Error("Validation failed");
            }

            // Step 2: Submit to Web3Forms from client (required for free plan)
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("access_key", validationData.data.access_key);
            formDataToSubmit.append("name", validationData.data.name);
            formDataToSubmit.append("email", validationData.data.email);
            formDataToSubmit.append("message", validationData.data.message);

            const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSubmit,
            });

            const web3formsData = (await web3formsResponse.json()) as {
                success: boolean;
                message: string;
            };

            if (web3formsData.success) {
                setSubmissionState("success");
                showToast("Your message has been sent successfully!", "success");
                setFormData({ fullName: "", email: "", message: "" });
                setAgreedToTerms(false);
            } else {
                throw new Error(web3formsData.message || "Submission failed");
            }
        } catch (error) {
            setSubmissionState("error");
            showToast(
                error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        agreedToTerms,
        isSubmitting,
        submissionState,
        handleInputChange,
        handleSubmit,
        setAgreedToTerms,
    };
}
