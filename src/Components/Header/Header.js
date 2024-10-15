// Use Header.css in same folder
import { Image } from "react-bootstrap";
import "./Header.css";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#100033",
        margin: 0,
        minHeight: "10vh",
      }}
    >
      <Image
        className="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShtbOdpffz_X9kFdtNynlcyItAwvaCR3sB5g&s"
      />
    </div>
  );
}
