function App() {
  return (
    <>
      <div className="flex h-screen w-full flex-col bg-black">
        {/* TOP CONTENT */}
        <div className="flex-1">
          <aside>{/* SIDEBAR */}</aside>

          <div>{/* PIANO ROLL */}</div>
        </div>

        {/* FOOTER */}
        <footer className="w-full bg-white/5 px-10">
          <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="slider"
            id="myRange"
          />
        </footer>
      </div>
    </>
  );
}

export default App;
