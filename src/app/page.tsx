import { Metadata } from "next";
import Login from "./login/page";

export const metadata: Metadata = {
    title: "Clinician Patient Portal",
    description: "Healthcare management platform for clinicians and patients",
};

const HomePage = () => {
    return (
        <Login />
    );
};

export default HomePage;