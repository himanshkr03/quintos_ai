import Container from "@/components/shared/layout/Container";
import Logo from "@/components/shared/navigation/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <Logo />

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Quintos AI. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}