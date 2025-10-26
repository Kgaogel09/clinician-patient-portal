import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clinician Patient Portal",
    description: "Healthcare management platform for clinicians and patients",
};

export default async function RootRedirect() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("sessionToken")?.value;

        const redirectPath = token ? "/dashboard" : "/login";
        redirect(redirectPath);
    } catch (error) {
        console.error("Error during authentication check:", error);
        redirect("/login");
    }
}