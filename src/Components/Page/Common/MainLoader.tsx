function MainLoader({ type = "warning", size = 100 }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ width: "40px", height: "40px" }}
        className={`spinner-border text-center  text-${type}`}
      ></div>
    </div>
  );
}

export default MainLoader;
