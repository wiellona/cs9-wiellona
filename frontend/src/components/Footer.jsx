export default function Footer() {
  return (
    <footer className="bg-valorant-dark text-white py-6 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Valorant</p>
      </div>
    </footer>
  );
}
