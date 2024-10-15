import "./Footer.scss";

export default function Footer() {
  return (
    <div
      className="footer"
      style={{
        marginBottom: -25,
        display: "flex",
        flexDirection: "row",
        justifySelf: "end",
        justifyContent: "center",
        textAlign: "center",
        height: "10vh",
      }}
    >
      <p
        style={{
          color: "white",
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        © 2023. All rights reserved.
      </p>
    </div>
  );
}
